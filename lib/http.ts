import { NextRequest, NextResponse } from 'next/server';

// Only meaningful when the host overwrites these headers (Vercel does)
export function clientIp(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || request.headers.get('x-real-ip')
    || null;
}

export function tooManyRequests(windowSeconds: number) {
  return NextResponse.json(
    { success: false, message: 'Zbyt wiele prób. Spróbuj ponownie za kilka minut.' },
    { status: 429, headers: { 'Retry-After': String(windowSeconds) } },
  );
}

/** Parses the request body as a JSON object; returns null for malformed JSON, arrays, null and primitives. */
export async function readJsonObject(request: NextRequest): Promise<Record<string, unknown> | null> {
  try {
    const parsed = await request.json();
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}
