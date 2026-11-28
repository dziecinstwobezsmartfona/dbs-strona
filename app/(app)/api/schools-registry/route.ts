import { NextRequest, NextResponse } from 'next/server';
import { getSchoolsRegistry } from '../../../../lib/schoolsRegistry';

export const runtime = 'nodejs';

const MAX_PARAM_LENGTH = 200;
// the registry only changes with a deploy
const CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800';

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: status === 200 ? { 'Cache-Control': CACHE_CONTROL } : undefined });

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const voivodship = params.get('voivodship');
  const district = params.get('district');
  const county = params.get('county');

  if ((district && !voivodship) || (county && !district)) {
    return json({ message: 'Brakujący parametr nadrzędny' }, 400);
  }
  if ([voivodship, district, county].some((p) => p !== null && (p === '' || p.length > MAX_PARAM_LENGTH))) {
    return json({ message: 'Nieprawidłowe parametry' }, 400);
  }

  const registry = await getSchoolsRegistry();

  if (!voivodship) return json({ voivodships: registry.voivodships() });

  if (!district) {
    const districts = registry.districts(voivodship);
    return districts ? json({ districts }) : json({ message: 'Nie znaleziono' }, 404);
  }

  if (!county) {
    const counties = registry.counties(voivodship, district);
    return counties ? json({ counties }) : json({ message: 'Nie znaleziono' }, 404);
  }

  const schools = registry.schools(voivodship, district, county);
  return schools ? json({ schools }) : json({ message: 'Nie znaleziono' }, 404);
}
