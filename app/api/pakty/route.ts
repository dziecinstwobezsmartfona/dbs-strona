import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Pact from '../../../lib/models/Pact';

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
    });

    // Save to database
    await pact.save();

    console.log('Pakt saved to database:', pact);

    return NextResponse.json({ success: true, message: 'Pakt podpisany pomyślnie' });
  } catch (error) {
    console.error('Error processing pakt:', error);
    return NextResponse.json({ success: false, message: 'Błąd podczas podpisywania paktu' }, { status: 500 });
  }
}
