import { describe, expect, it } from 'vitest';
import { toRegistryRows } from './build-schools-registry';

const rec = (over: Record<string, unknown> = {}) => ({
  'Numer RSPO': '10', Nazwa: 'Szkoła', Województwo: 'ŁÓDZKIE', Powiat: 'p', Gmina: 'g',
  Miejscowość: 'Łódź', Ulica: 'ul. Długa', 'Numer budynku': '=""2""', 'Imię i nazwisko dyrektora': 'SECRET', Telefon: '123',
  ...over,
});

describe('toRegistryRows', () => {
  it('keeps only the six needed fields and cleans Excel artefacts in the address', () => {
    const [row] = toRegistryRows([rec()]);
    expect(row).toEqual(['10', 'Szkoła', 'ŁÓDZKIE', 'p', 'g', 'Łódź, ul. Długa 2']);
    expect(JSON.stringify(row)).not.toContain('SECRET');
  });

  it('sorts by numeric id', () => {
    expect(toRegistryRows([rec({ 'Numer RSPO': '100' }), rec({ 'Numer RSPO': '9' })]).map((r) => r[0])).toEqual(['9', '100']);
  });

  it('throws on a missing column, a repeated id or an invalid id', () => {
    const { Gmina, ...noGmina } = rec();
    void Gmina;
    expect(() => toRegistryRows([noGmina])).toThrow(/Gmina/);
    expect(() => toRegistryRows([rec(), rec()])).toThrow(/Duplicate/);
    expect(() => toRegistryRows([rec({ 'Numer RSPO': 'abc' })])).toThrow(/invalid/);
  });
});
