import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Pact from '../../../../lib/models/Pact';

// Required for Netlify deployment - ensures this route runs as a Node.js function
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Parse query parameters for drill-down filtering
    const url = new URL(request.url);
    const voivodship = url.searchParams.get('voivodship');
    const district = url.searchParams.get('district');
    const county = url.searchParams.get('county');

    // Build filter for drill-down
    const filter: any = {};
    if (voivodship) {
      filter.schoolVoivodship = voivodship;
    }
    if (district) {
      filter.schoolDistrict = district;
    }
    if (county) {
      filter.schoolCounty = county;
    }
    
    // Exclude "Moje dzieci nie chodzą jeszcze do szkoły" option (schoolId = "0")
    filter.schoolId = { $ne: "0" };

    // Get distinct school IDs and count them with optional filtering
    const distinctSchools = await Pact.distinct('schoolId', filter);
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
