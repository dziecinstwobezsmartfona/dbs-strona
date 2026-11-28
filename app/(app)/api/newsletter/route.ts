import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '../../../../lib/mongodb';
import { isRateLimited } from '../../../../lib/rateLimit';
import { clientIp, readJsonObject, tooManyRequests } from '../../../../lib/http';
import { newsletterSubscriptionSchema } from '../../../../lib/schemas/newsletter';
import { addSubscriber } from '../../../../lib/subscribers';

export const runtime = 'nodejs';

const SUCCESS_MESSAGE = 'Zapisano na newsletter pomyślnie';

const IP_LIMIT = { max: 5, windowSeconds: 10 * 60 };
const EMAIL_LIMIT = { max: 3, windowSeconds: 60 * 60 };

export async function POST(request: NextRequest) {
  const body = await readJsonObject(request);
  if (!body) {
    return NextResponse.json({ success: false, message: 'Nieprawidłowe dane' }, { status: 400 });
  }

  // Honeypot: bots fill in every field. Answer as if it worked, store nothing.
  if (typeof body.website === 'string' && body.website !== '') {
    console.warn('Newsletter honeypot triggered');
    return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
  }

  const parsed = newsletterSubscriptionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Nieprawidłowe dane', errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }
  const { fullName, email } = parsed.data;

  try {
    await dbConnect();

    // Without a client IP all visitors would share one bucket, so only the per-email limit applies
    const ip = clientIp(request);
    if (ip && await isRateLimited(`newsletter:ip:${ip}`, IP_LIMIT.max, IP_LIMIT.windowSeconds)) {
      return tooManyRequests(IP_LIMIT.windowSeconds);
    }
    if (await isRateLimited(`newsletter:email:${email}`, EMAIL_LIMIT.max, EMAIL_LIMIT.windowSeconds)) {
      return tooManyRequests(EMAIL_LIMIT.windowSeconds);
    }

    // Same response whether or not the address was already subscribed
    await addSubscriber({ fullName, email });

    return NextResponse.json({ success: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    // Do not log the error object: Mongo duplicate-key messages contain the email address
    const { name, code } = error as { name?: string; code?: number };
    console.error('Error saving subscriber:', name, code);
    return NextResponse.json(
      { success: false, message: 'Błąd podczas zapisywania na newsletter' },
      { status: 500 },
    );
  }
}
