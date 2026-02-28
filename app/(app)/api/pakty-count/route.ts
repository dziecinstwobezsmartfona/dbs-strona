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

    const pipeline = [];

    // Add match stage for drill-down filtering if parameters are provided
    const matchStage: any = {};
    if (voivodship) {
      matchStage.schoolVoivodship = voivodship;
    }
    if (district) {
      matchStage.schoolDistrict = district;
    }
    if (county) {
      matchStage.schoolCounty = county;
    }
    
    if (Object.keys(matchStage).length > 0) {
      pipeline.push({
        $match: matchStage
      });
    }

    // Group by email to get unique parents and sum their children
    pipeline.push({
      $group: {
        _id: "$email",
        numberOfChildren: {
          $sum: "$numberOfChildren"
        }
      }
    });

    // Group again to get total number of parents and total number of children
    pipeline.push({
      $group: {
        _id: null,
        numberOfParents: {
          $sum: 1
        },
        numberOfChildren: {
          $sum: "$numberOfChildren"
        }
      }
    });

    // Remove the _id field from the result
    pipeline.push({
      $unset: ["_id"]
    });

    const result = await Pact.aggregate(pipeline);

    // If no pacts exist, return zeros
    if (result.length === 0) {
      return NextResponse.json({
        numberOfParents: 0,
        numberOfChildren: 0
      });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error getting pact count:', error);
    return NextResponse.json(
      { message: 'Błąd podczas pobierania liczby podpisanych paktów' },
      { status: 500 }
    );
  }
}
