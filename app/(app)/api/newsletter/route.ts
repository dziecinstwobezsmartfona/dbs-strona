import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Subscriber from '../../../../lib/models/Subscriber';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    const existingSubscriber = await Subscriber.findOne({ email: body.email });
    if (existingSubscriber) {
      return NextResponse.json({ success: true, message: 'Zapisano na newsletter pomyślnie' });
    }

    const subscriber = new Subscriber({
      fullName: body.fullName,
      email: body.email,
    });

    await subscriber.save();

    return NextResponse.json({ success: true, message: 'Zapisano na newsletter pomyślnie' });
  } catch (error) {
    console.error('Error saving subscriber:', error);
    return NextResponse.json(
      { success: false, message: 'Błąd podczas zapisywania na newsletter' },
      { status: 500 }
    );
  }
}
