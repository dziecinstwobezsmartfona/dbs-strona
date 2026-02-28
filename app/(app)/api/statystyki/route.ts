import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Pact from '../../../../lib/models/Pact';

// Required for Netlify deployment - ensures this route runs as a Node.js function
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Parse query parameters
    const url = new URL(request.url);
    const voivodship = url.searchParams.get('voivodship');
    const district = url.searchParams.get('district');
    const county = url.searchParams.get('county');

    // Build aggregation pipeline
    const pipeline: any[] = [];

    // Add match stage if filtering by parameters
    if (voivodship || district || county) {
      const matchStage: any = {};
      if (voivodship) matchStage.schoolVoivodship = voivodship;
      if (district) matchStage.schoolDistrict = district;
      if (county) matchStage.schoolCounty = county;
      pipeline.push({ $match: matchStage });
    }

    // Group by appropriate field based on parameters
    let groupField = '$schoolVoivodship';
    let projectFields: any = {
      schoolVoivodship: voivodship ? voivodship : '$_id',
      schoolDistrict: null,
      schoolCounty: null,
      schoolName: null,
      numberOfChildren: 1,
      _id: 0
    };

    if (voivodship && !district) {
      groupField = '$schoolDistrict';
      projectFields.schoolDistrict = '$_id';
      projectFields.schoolVoivodship = voivodship;
    } else if (voivodship && district && !county) {
      groupField = '$schoolCounty';
      projectFields.schoolCounty = '$_id';
      projectFields.schoolVoivodship = voivodship;
      projectFields.schoolDistrict = district;
    } else if (voivodship && district && county) {
      groupField = '$schoolName';
      projectFields.schoolName = '$_id';
      projectFields.schoolVoivodship = voivodship;
      projectFields.schoolDistrict = district;
      projectFields.schoolCounty = county;
    }

    pipeline.push({
      $group: {
        _id: groupField,
        numberOfChildren: { $sum: '$numberOfChildren' }
      }
    });

    // Sort by number of children in descending order
    pipeline.push({
      $sort: { numberOfChildren: -1 }
    });

    // Project final fields
    pipeline.push({
      $project: projectFields
    });

    const stats = await Pact.aggregate(pipeline);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error getting statistics:', error);
    return NextResponse.json(
      { message: 'Błąd podczas pobierania statystyk' },
      { status: 500 }
    );
  }
}
