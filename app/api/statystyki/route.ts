import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Pact from '../../../lib/models/Pact';

// Required for Netlify deployment - ensures this route runs as a Node.js function
export const runtime = 'nodejs';

export async function GET() {
  try {
    await dbConnect();

    // Aggregate pacts by schoolVoivodship and sum the numberOfChildren
    const stats = await Pact.aggregate([
      {
        $group: {
          _id: '$schoolVoivodship',
          numberOfChildren: { $sum: '$numberOfChildren' }
        }
      },
      {
        $sort: { numberOfChildren: -1 }
      },
      {
        $project: {
          schoolVoivodship: '$_id',
          numberOfChildren: 1,
          _id: 0
        }
      }
    ]);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error getting statistics:', error);
    return NextResponse.json(
      { message: 'Błąd podczas pobierania statystyk' },
      { status: 500 }
    );
  }
}
