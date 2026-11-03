import { readdirSync, statSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { EXCLUDED_ROUTES, STATIC_PAGES } from './staticPages';

const APP_DIR = path.join(process.cwd(), 'app', '(app)');

const routesWithPages = readdirSync(APP_DIR).filter((name) => {
  const dir = path.join(APP_DIR, name);
  return statSync(dir).isDirectory() && (name === 'api' || statSync(dir).isDirectory() && readdirSync(dir).includes('page.tsx'));
});

describe('static page search index', () => {
  const listed = STATIC_PAGES.map((p) => p.route);

  it.each(routesWithPages)('route "%s" is either indexed or explicitly excluded', (route) => {
    expect(
      [...listed, ...EXCLUDED_ROUTES].includes(route),
      `Add "${route}" to STATIC_PAGES (lib/search/staticPages.ts) or to EXCLUDED_ROUTES`,
    ).toBe(true);
  });

  it.each([...listed, ...EXCLUDED_ROUTES])('"%s" still exists as a route', (route) => {
    expect(readdirSync(APP_DIR), `Remove "${route}" from lib/search/staticPages.ts`).toContain(route);
  });

  it('has unique routes and urls matching the route', () => {
    expect(new Set(listed).size).toBe(listed.length);
    for (const page of STATIC_PAGES) expect(page.url).toBe(`/${page.route}`);
  });
});
