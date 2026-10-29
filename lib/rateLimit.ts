import RateLimit from './models/RateLimit';

const DUPLICATE_KEY = 11000;

/**
 * Fixed-window counter stored in MongoDB (expired windows are removed by a TTL index).
 * Returns true when the caller has exceeded `limit` requests in the current window.
 * Fails open: if the counter cannot be updated the request is let through.
 */
export async function isRateLimited(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const windowMs = windowSeconds * 1000;
  const windowStart = Math.floor(Date.now() / windowMs);
  const filter = { key: `${key}:${windowStart}` };
  const update = {
    $inc: { count: 1 },
    $setOnInsert: { expiresAt: new Date((windowStart + 1) * windowMs) },
  };

  try {
    for (let attempt = 0; ; attempt++) {
      try {
        const doc = await RateLimit.findOneAndUpdate(filter, update, { upsert: true, new: true });
        return doc.count > limit;
      } catch (error) {
        // two simultaneous upserts of a new window: the loser retries once and increments
        if ((error as { code?: number }).code !== DUPLICATE_KEY || attempt > 0) throw error;
      }
    }
  } catch (error) {
    console.error('Rate limit check failed, letting the request through:', error);
    return false;
  }
}
