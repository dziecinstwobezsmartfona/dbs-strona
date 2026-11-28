import Subscriber from './models/Subscriber';

const DUPLICATE_KEY = 11000;

/** Atomic "subscribe if not already subscribed". Safe under concurrent requests (unique index on email). */
export async function addSubscriber({ fullName, email }: { fullName: string; email: string }) {
  try {
    await Subscriber.updateOne(
      { email },
      { $setOnInsert: { fullName, email } },
      { upsert: true, runValidators: true },
    );
  } catch (error) {
    // two simultaneous upserts of the same new email: the loser is a duplicate, which is fine
    if ((error as { code?: number }).code !== DUPLICATE_KEY) throw error;
  }
}
