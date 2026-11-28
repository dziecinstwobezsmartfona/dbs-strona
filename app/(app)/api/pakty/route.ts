import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { z } from 'zod';
import dbConnect from '../../../../lib/mongodb';
import Pact from '../../../../lib/models/Pact';
import { isRateLimited } from '../../../../lib/rateLimit';
import { pactSubmissionSchema } from '../../../../lib/schemas/pact';
import { clientIp, readJsonObject, tooManyRequests } from '../../../../lib/http';
import { addSubscriber } from '../../../../lib/subscribers';
import { getSchoolsRegistry, resolveSchool } from '../../../../lib/schoolsRegistry';

// Required for Netlify deployment - ensures this route runs as a Node.js function
export const runtime = 'nodejs';

const SUCCESS_MESSAGE = 'Pakt podpisany pomyślnie';

const IP_LIMIT = { max: 5, windowSeconds: 10 * 60 };
const EMAIL_LIMIT = { max: 3, windowSeconds: 60 * 60 };
// one confirmation email per address per 24 h, so the endpoint cannot be used to mail a third party repeatedly
const EMAIL_COOLDOWN_MS = 24 * 60 * 60 * 1000;

// Send transactional email via Brevo API
async function sendBrevoEmail(firstName: string, lastName: string, email: string) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error('BREVO_API_KEY is not set in environment variables');
    return false;
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Dzieciństwo Bez Smartfona',
          email: 'pakt@dziecinstwobezsmartfona.pl',
        },
        to: [
          {
            email: email,
            name: `${firstName} ${lastName}`,
          },
        ],
        templateId: 1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending email via Brevo:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const body = await readJsonObject(request);
  if (!body) {
    return NextResponse.json({ success: false, message: 'Nieprawidłowe dane' }, { status: 400 });
  }

  // Honeypot: bots fill in every field. Answer as if it worked, store and send nothing.
  if (typeof body.website === 'string' && body.website !== '') {
    console.warn('Pakt honeypot triggered');
    return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
  }

  const parsed = pactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Nieprawidłowe dane', errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }
  const { voivodship, district, county, website, ...person } = parsed.data;
  void website;

  // The server decides the school name and region; whatever the client sent is only used to look them up
  const school = resolveSchool(await getSchoolsRegistry(), { schoolId: person.schoolId, voivodship, district, county });
  if (!school) {
    return NextResponse.json({ success: false, message: 'Nieprawidłowa szkoła' }, { status: 400 });
  }
  const data = { ...person, ...school };

  try {
    await dbConnect();

    // Without a client IP all visitors would share one bucket, so only the per-email limit applies
    const ip = clientIp(request);
    if (ip && await isRateLimited(`pakty:ip:${ip}`, IP_LIMIT.max, IP_LIMIT.windowSeconds)) {
      return tooManyRequests(IP_LIMIT.windowSeconds);
    }
    if (await isRateLimited(`pakty:email:${data.email}`, EMAIL_LIMIT.max, EMAIL_LIMIT.windowSeconds)) {
      return tooManyRequests(EMAIL_LIMIT.windowSeconds);
    }

    const existingPact = await Pact.exists({ email: data.email, schoolId: data.schoolId });
    if (existingPact) {
      // Silently ignore and proceed as if the record was added
      return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
    }

    const recentPactForEmail = await Pact.exists({
      email: data.email,
      createdAt: mongoose.trusted({ $gt: new Date(Date.now() - EMAIL_COOLDOWN_MS) }),
    });

    await new Pact(data).save();

    if (data.newsletter_consent) {
      await addSubscriber({ fullName: `${data.firstName} ${data.lastName}`, email: data.email });
    }

    if (!recentPactForEmail) {
      const emailSent = await sendBrevoEmail(data.firstName, data.lastName, data.email);
      if (!emailSent) {
        console.warn('Warning: Email confirmation could not be sent, but pact was saved to database');
      }
    }

    return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error('Error processing pakt:', error);
    return NextResponse.json({ success: false, message: 'Błąd podczas podpisywania paktu' }, { status: 500 });
  }
}
