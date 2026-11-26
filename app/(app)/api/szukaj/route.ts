import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { z } from 'zod';
import { isRateLimited } from '../../../../lib/rateLimit';
import { buildSearchPipeline, pageLimit, toSearchResult, type RawSearchRow } from '../../../../lib/search/query';

export const runtime = 'nodejs';

const IP_LIMIT = { max: 60, windowSeconds: 60 };
const DEFAULT_SETTINGS = { pageSize: 10, maxResults: 100 };

const querySchema = z.object({
  q: z.string().trim().min(2).max(100),
  offset: z.coerce.number().int().min(0).default(0),
});

// Only meaningful when the host overwrites these headers (Vercel does)
function clientIp(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || request.headers.get('x-real-ip')
    || null;
}

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse({
    q: request.nextUrl.searchParams.get('q') ?? '',
    offset: request.nextUrl.searchParams.get('offset') ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ message: 'Nieprawidłowe zapytanie' }, { status: 400 });
  }

  const ip = clientIp(request);
  if (ip && await isRateLimited(`szukaj:ip:${ip}`, IP_LIMIT.max, IP_LIMIT.windowSeconds)) {
    return NextResponse.json(
      { message: 'Zbyt wiele zapytań. Spróbuj ponownie za chwilę.' },
      { status: 429, headers: { 'Retry-After': String(IP_LIMIT.windowSeconds) } },
    );
  }

  try {
    const payload = await getPayload({ config: configPromise });
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 });
    const pageSize = settings.search?.pageSize ?? DEFAULT_SETTINGS.pageSize;
    const maxResults = settings.search?.maxResults ?? DEFAULT_SETTINGS.maxResults;
    const { q, offset } = parsed.data;

    const limit = pageLimit({ offset, limit: pageSize, maxResults });
    let rows: RawSearchRow[] = [];
    if (limit > 0) {
      const model = payload.db.collections['search-index'];
      rows = await model.aggregate(buildSearchPipeline({ q, offset, limit: pageSize, maxResults }));
    }

    const nextOffset = rows.length === limit && offset + rows.length < maxResults ? offset + rows.length : null;
    return NextResponse.json({ results: rows.map(toSearchResult), nextOffset });
  } catch (error) {
    console.error('Search failed:', error);
    return NextResponse.json({ message: 'Błąd podczas wyszukiwania' }, { status: 500 });
  }
}
