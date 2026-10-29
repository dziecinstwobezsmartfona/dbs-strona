import { describe, expect, it } from 'vitest';
import { MAX_CHILDREN, pactSubmissionSchema } from './pact';

const valid = {
  firstName: 'Test',
  lastName: 'Rodzic',
  email: 'test+crit2@example.com',
  schoolId: '123456',
  schoolVoivodship: 'MAZOWIECKIE',
  schoolDistrict: 'warszawski',
  schoolCounty: 'Warszawa',
  schoolName: 'Szkoła Testowa',
  numberOfChildren: 1,
  gdpr_consent: true,
  newsletter_consent: false,
};

const fails = (patch: Record<string, unknown>) => !pactSubmissionSchema.safeParse({ ...valid, ...patch }).success;

describe('pactSubmissionSchema', () => {
  it('accepts a valid submission', () => {
    expect(pactSubmissionSchema.safeParse(valid).success).toBe(true);
  });

  it.each([1_000_000_000, -50, 0, 1.5, '3', null, MAX_CHILDREN + 1, NaN, Infinity])(
    'rejects numberOfChildren %s',
    (numberOfChildren) => expect(fails({ numberOfChildren })).toBe(true),
  );

  it.each([1, MAX_CHILDREN])('accepts numberOfChildren %s', (numberOfChildren) => {
    expect(fails({ numberOfChildren })).toBe(false);
  });

  it('requires gdpr_consent to be true', () => {
    expect(fails({ gdpr_consent: false })).toBe(true);
    expect(fails({ gdpr_consent: 'true' })).toBe(true);
    const withoutConsent: Record<string, unknown> = { ...valid };
    delete withoutConsent.gdpr_consent;
    expect(pactSubmissionSchema.safeParse(withoutConsent).success).toBe(false);
  });

  it.each(['not-an-email', '', 'a@b', `${'a'.repeat(250)}@example.com`, { $gt: '' }, ['a@b.pl'], 5, null])(
    'rejects email %j',
    (email) => expect(fails({ email })).toBe(true),
  );

  it('trims and lower-cases the email', () => {
    const result = pactSubmissionSchema.parse({ ...valid, email: '  Test+Crit2@Example.COM ' });
    expect(result.email).toBe('test+crit2@example.com');
  });

  it.each(['firstName', 'lastName', 'schoolVoivodship', 'schoolDistrict', 'schoolCounty', 'schoolName'])(
    'rejects non-string, empty and overlong %s',
    (field) => {
      expect(fails({ [field]: { a: 1 } })).toBe(true);
      expect(fails({ [field]: 5 })).toBe(true);
      expect(fails({ [field]: '   ' })).toBe(true);
      expect(fails({ [field]: 'x'.repeat(5000) })).toBe(true);
    },
  );

  it('allows the longest real school name (253 characters)', () => {
    expect(fails({ schoolName: 'x'.repeat(253) })).toBe(false);
  });

  it.each(['abc', '1 OR 1', '', '12 34', '-1', '1'.repeat(13), 123456])('rejects schoolId %j', (schoolId) => {
    expect(fails({ schoolId })).toBe(true);
  });

  it.each(['0', '123456'])('accepts schoolId %j', (schoolId) => {
    expect(fails({ schoolId })).toBe(false);
  });

  it('strips unknown keys', () => {
    const result = pactSubmissionSchema.parse({ ...valid, isAdmin: true, createdAt: '2000-01-01', _id: 'x' });
    expect(Object.keys(result)).not.toEqual(expect.arrayContaining(['isAdmin', 'createdAt', '_id']));
  });

  it('defaults newsletter_consent to false', () => {
    const withoutNewsletter: Record<string, unknown> = { ...valid };
    delete withoutNewsletter.newsletter_consent;
    expect(pactSubmissionSchema.parse(withoutNewsletter).newsletter_consent).toBe(false);
  });

  it('treats the honeypot as optional but empty', () => {
    expect(fails({ website: undefined })).toBe(false);
    expect(fails({ website: '' })).toBe(false);
    expect(fails({ website: 'http://spam' })).toBe(true);
  });
});
