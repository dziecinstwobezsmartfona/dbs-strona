import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export type RegistryRow = [id: string, name: string, voivodship: string, district: string, county: string, address: string];

const REQUIRED = ['Numer RSPO', 'Nazwa', 'Województwo', 'Powiat', 'Gmina', 'Miejscowość', 'Ulica', 'Numer budynku'] as const;

// The RSPO export contains Excel artefacts such as ="" 2 "" in some columns
const cleanExcel = (value: unknown) =>
  String(value ?? '').replace(/^=?"*/, '').replace(/"*$/, '').trim();

export function toRegistryRows(raw: Record<string, unknown>[]): RegistryRow[] {
  const seen = new Set<string>();
  const rows = raw.map((record, index) => {
    for (const column of REQUIRED) {
      if (!(column in record)) throw new Error(`Record ${index}: missing column "${column}"`);
    }
    const id = String(record['Numer RSPO']).trim();
    if (!/^\d{1,12}$/.test(id)) throw new Error(`Record ${index}: invalid RSPO id "${id}"`);
    if (seen.has(id)) throw new Error(`Duplicate RSPO id ${id}`);
    seen.add(id);

    const street = [cleanExcel(record['Ulica']), cleanExcel(record['Numer budynku'])].filter(Boolean).join(' ');
    const address = [cleanExcel(record['Miejscowość']), street].filter(Boolean).join(', ');
    return [
      id,
      String(record['Nazwa']),
      String(record['Województwo']),
      String(record['Powiat']),
      String(record['Gmina']),
      address,
    ] as RegistryRow;
  });
  return rows.sort((a, b) => Number(a[0]) - Number(b[0]));
}

async function main() {
  const input = process.argv[2] ?? 'data/raw/lista_szkol.json';
  const output = 'data/schools-registry.json';
  const raw = JSON.parse(await readFile(input, 'utf8'));
  const rows = toRegistryRows(raw);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify({ source: path.basename(input), rows }));
  console.log(`Wrote ${rows.length} schools to ${output}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => { console.error(err); process.exit(1); });
}
