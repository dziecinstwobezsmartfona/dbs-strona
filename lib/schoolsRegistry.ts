// Server-side only: never import this module from a client component (it loads a ~3 MB file).
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NO_SCHOOL_ID, NO_SCHOOL_LABEL } from './schemas/pact';

export type RegistryRow = [id: string, name: string, voivodship: string, district: string, county: string, address: string];

export interface School {
  id: string;
  name: string;
  voivodship: string;
  district: string;
  county: string;
  address: string;
}

export interface SchoolOption {
  id: string;
  name: string;
  /** address, set only when the name is not unique within the county */
  detail?: string;
}

export interface ResolvedSchool {
  schoolId: string;
  schoolName: string;
  schoolVoivodship: string;
  schoolDistrict: string;
  schoolCounty: string;
}

const collator = new Intl.Collator('pl');
const byPolish = (a: string, b: string) => collator.compare(a, b);

export function createRegistry(rows: RegistryRow[]) {
  const tree = new Map<string, Map<string, Map<string, School[]>>>();
  const byId = new Map<string, School>();

  for (const [id, name, voivodship, district, county, address] of rows) {
    const school: School = { id, name, voivodship, district, county, address };
    byId.set(id, school);
    const districts = tree.get(voivodship) ?? new Map();
    const counties = districts.get(district) ?? new Map();
    const schools = counties.get(county) ?? [];
    schools.push(school);
    counties.set(county, schools);
    districts.set(district, counties);
    tree.set(voivodship, districts);
  }
  for (const districts of tree.values()) {
    for (const counties of districts.values()) {
      for (const schools of counties.values()) {
        schools.sort((a, b) => byPolish(a.name, b.name) || Number(a.id) - Number(b.id));
      }
    }
  }

  const sortedKeys = (map: Map<string, unknown> | undefined) => (map ? [...map.keys()].sort(byPolish) : undefined);

  return {
    size: byId.size,
    voivodships: () => sortedKeys(tree) as string[],
    districts: (v: string) => sortedKeys(tree.get(v)),
    counties: (v: string, d: string) => sortedKeys(tree.get(v)?.get(d)),
    schools(v: string, d: string, c: string): SchoolOption[] | undefined {
      const list = tree.get(v)?.get(d)?.get(c);
      if (!list) return undefined;
      const nameCount = new Map<string, number>();
      for (const s of list) nameCount.set(s.name, (nameCount.get(s.name) ?? 0) + 1);
      return list.map((s) =>
        (nameCount.get(s.name) ?? 0) > 1 ? { id: s.id, name: s.name, detail: s.address } : { id: s.id, name: s.name },
      );
    },
    getSchool: (id: string) => byId.get(id),
    hasCounty: (v: string, d: string, c: string) => Boolean(tree.get(v)?.get(d)?.has(c)),
  };
}

export type SchoolsRegistry = ReturnType<typeof createRegistry>;

/**
 * Works out the stored school fields from the registry. Anything the client sent about the
 * school's name or region is ignored, except for the "no school yet" case, where the client
 * picks a gmina that must exist in the registry.
 */
export function resolveSchool(
  registry: SchoolsRegistry,
  input: { schoolId: string; voivodship?: string; district?: string; county?: string },
): ResolvedSchool | null {
  if (input.schoolId === NO_SCHOOL_ID) {
    const { voivodship, district, county } = input;
    if (!voivodship || !district || !county || !registry.hasCounty(voivodship, district, county)) return null;
    return {
      schoolId: NO_SCHOOL_ID,
      schoolName: NO_SCHOOL_LABEL,
      schoolVoivodship: voivodship,
      schoolDistrict: district,
      schoolCounty: county,
    };
  }
  const school = registry.getSchool(input.schoolId);
  if (!school) return null;
  return {
    schoolId: school.id,
    schoolName: school.name,
    schoolVoivodship: school.voivodship,
    schoolDistrict: school.district,
    schoolCounty: school.county,
  };
}

let cached: Promise<SchoolsRegistry> | undefined;

export function getSchoolsRegistry(): Promise<SchoolsRegistry> {
  cached ??= readFile(path.join(process.cwd(), 'data', 'schools-registry.json'), 'utf8')
    .then((text) => createRegistry(JSON.parse(text).rows as RegistryRow[]))
    .catch((err) => {
      cached = undefined; // allow a retry after a failed load
      throw err;
    });
  return cached;
}
