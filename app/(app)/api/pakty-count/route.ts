import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Pact from '../../../../lib/models/Pact';

// Required for Netlify deployment - ensures this route runs as a Node.js function
export const runtime = 'nodejs';

export async function GET() {
  try {
    await dbConnect();

    const pipeline = [];

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
