import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Pact from '../../../../lib/models/Pact';
import Subscriber from '../../../../lib/models/Subscriber';

// Required for Netlify deployment - ensures this route runs as a Node.js function
export const runtime = 'nodejs';

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

    const data = await response.json();
    console.log('Email sent successfully via Brevo. Message ID:', data.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email via Brevo:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Check if a pact with the same email and schoolId already exists
    const existingPact = await Pact.findOne({
      email: body.email,
      schoolId: body.schoolId,
    });

    if (existingPact) {
      // Silently ignore and proceed as if the record was added
      console.log('Pakt already exists for email and school.id, skipping insert');
      return NextResponse.json({ success: true, message: 'Pakt podpisany pomyślnie' });
    }

    // Create new pact document
    const pact = new Pact({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      schoolId: body.schoolId,
      schoolVoivodship: body.schoolVoivodship,
      schoolDistrict: body.schoolDistrict,
      schoolCounty: body.schoolCounty,
      schoolName: body.schoolName,
      numberOfChildren: body.numberOfChildren,
      gdpr_consent: body.gdpr_consent,
      newsletter_consent: body.newsletter_consent || false,
    });

    // Save to database
    await pact.save();

    console.log('Pakt saved to database:', pact);

    // Add to subscribers collection if newsletter consent given
    if (body.newsletter_consent) {
      const existingSubscriber = await Subscriber.findOne({ email: body.email });
      if (!existingSubscriber) {
        await new Subscriber({
          fullName: `${body.firstName} ${body.lastName}`,
          email: body.email,
        }).save();
      }
    }

    // Send confirmation email
    const emailSent = await sendBrevoEmail(body.firstName, body.lastName, body.email);
    if (!emailSent) {
      console.warn('Warning: Email confirmation could not be sent, but pact was saved to database');
    }

    return NextResponse.json({ success: true, message: 'Pakt podpisany pomyślnie' });
  } catch (error) {
    console.error('Error processing pakt:', error);
    return NextResponse.json({ success: false, message: 'Błąd podczas podpisywania paktu' }, { status: 500 });
  }
}
