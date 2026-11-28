import { describe, expect, it } from 'vitest';
import { createRegistry, getSchoolsRegistry, resolveSchool, type RegistryRow } from './schoolsRegistry';
import { NO_SCHOOL_ID, NO_SCHOOL_LABEL } from './schemas/pact';

const rows: RegistryRow[] = [
  ['1', 'Szkoła A', 'ŚLĄSKIE', 'p1', 'g1', 'Katowice, ul. A 1'],
  ['2', 'Szkoła B', 'ŚLĄSKIE', 'p1', 'g1', 'Katowice, ul. B 2'],
  ['3', 'Szkoła B', 'ŚLĄSKIE', 'p1', 'g1', 'Katowice, ul. C 3'],
  ['4', 'Szkoła D', 'ŁÓDZKIE', 'p2', 'g2', 'Łódź, ul. D 4'],
  ['5', 'Szkoła E', 'MAZOWIECKIE', 'p3', 'g3', 'Warszawa, ul. E 5'],
  ['6', 'Szkoła F', 'ZACHODNIOPOMORSKIE', 'p4', 'g4', 'Szczecin, ul. F 6'],
  ['7', 'Szkoła G', 'ŚLĄSKIE', 'p1', 'g9', 'Bytom, ul. G 7'],
];
const registry = createRegistry(rows);

describe('createRegistry', () => {
  it('sorts with Polish collation (Ł after L-range letters, Ś before Z)', () => {
    expect(registry.voivodships()).toEqual(['ŁÓDZKIE', 'MAZOWIECKIE', 'ŚLĄSKIE', 'ZACHODNIOPOMORSKIE']);
  });

  it('filters each level and returns undefined for unknown parents', () => {
    expect(registry.districts('ŚLĄSKIE')).toEqual(['p1']);
    expect(registry.counties('ŚLĄSKIE', 'p1')).toEqual(['g1', 'g9']);
    expect(registry.schools('ŚLĄSKIE', 'p1', 'g9')?.map((s) => s.id)).toEqual(['7']);
    expect(registry.districts('NOPE')).toBeUndefined();
    expect(registry.counties('ŚLĄSKIE', 'p2')).toBeUndefined();
    expect(registry.schools('ŚLĄSKIE', 'p1', 'g2')).toBeUndefined();
  });

  it('adds the address only for names that repeat within a gmina', () => {
    expect(registry.schools('ŚLĄSKIE', 'p1', 'g1')).toEqual([
      { id: '1', name: 'Szkoła A' },
      { id: '2', name: 'Szkoła B', detail: 'Katowice, ul. B 2' },
      { id: '3', name: 'Szkoła B', detail: 'Katowice, ul. C 3' },
    ]);
  });

  it('looks up schools and counties', () => {
    expect(registry.getSchool('4')?.name).toBe('Szkoła D');
    expect(registry.getSchool('99')).toBeUndefined();
    expect(registry.hasCounty('ŁÓDZKIE', 'p2', 'g2')).toBe(true);
    expect(registry.hasCounty('ŁÓDZKIE', 'p2', 'zzz')).toBe(false);
  });
});

describe('resolveSchool', () => {
  it('uses registry values and ignores client-sent region', () => {
    expect(resolveSchool(registry, { schoolId: '4', voivodship: 'FAKE', district: 'FAKE', county: 'FAKE' })).toEqual({
      schoolId: '4', schoolName: 'Szkoła D', schoolVoivodship: 'ŁÓDZKIE', schoolDistrict: 'p2', schoolCounty: 'g2',
    });
  });

  it('rejects unknown ids', () => {
    expect(resolveSchool(registry, { schoolId: '999' })).toBeNull();
  });

  it('accepts "no school" only with an existing region', () => {
    expect(resolveSchool(registry, { schoolId: NO_SCHOOL_ID, voivodship: 'ŁÓDZKIE', district: 'p2', county: 'g2' })).toEqual({
      schoolId: NO_SCHOOL_ID, schoolName: NO_SCHOOL_LABEL, schoolVoivodship: 'ŁÓDZKIE', schoolDistrict: 'p2', schoolCounty: 'g2',
    });
    expect(resolveSchool(registry, { schoolId: NO_SCHOOL_ID })).toBeNull();
    expect(resolveSchool(registry, { schoolId: NO_SCHOOL_ID, voivodship: 'ŁÓDZKIE', district: 'p2', county: 'nope' })).toBeNull();
  });
});

describe('committed registry file', () => {
  it('has the expected shape and sane values', async () => {
    const real = await getSchoolsRegistry();
    expect(real.size).toBe(22473);
    expect(real.voivodships()).toHaveLength(16);
    expect(real.getSchool('22477')).toMatchObject({ voivodship: 'DOLNOŚLĄSKIE', district: 'Wrocław', county: 'Wrocław-Krzyki' });
    for (const v of real.voivodships()) {
      for (const d of real.districts(v)!) {
        expect(d.length).toBeLessThanOrEqual(200);
        for (const c of real.counties(v, d)!) {
          expect(c.length).toBeLessThanOrEqual(200);
          for (const s of real.schools(v, d, c)!) {
            expect(s.id).toMatch(/^\d{1,12}$/);
            expect(s.name.length).toBeLessThanOrEqual(300);
          }
        }
      }
    }
  });
});
