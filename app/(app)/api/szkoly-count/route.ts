import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Pact from '../../../../lib/models/Pact';

// Required for Netlify deployment - ensures this route runs as a Node.js function
export const runtime = 'nodejs';

export async function GET() {
  try {
    await dbConnect();

    // Get distinct school IDs and count them
    const distinctSchools = await Pact.distinct('schoolId');
    const numberOfSchools = distinctSchools.length;

    return NextResponse.json({
      numberOfSchools
    });
  } catch (error) {
    console.error('Error getting school count:', error);
    return NextResponse.json(
      { message: 'Błąd podczas pobierania liczby szkół' },
      { status: 500 }
    );
  }
}
