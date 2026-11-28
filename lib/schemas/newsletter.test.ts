import { describe, expect, it } from 'vitest';
import { newsletterSubscriptionSchema } from './newsletter';

const valid = { fullName: 'Jan Kowalski', email: 'jan@example.com' };
const fails = (patch: Record<string, unknown>) => !newsletterSubscriptionSchema.safeParse({ ...valid, ...patch }).success;

describe('newsletterSubscriptionSchema', () => {
  it('accepts a valid payload', () => {
    expect(newsletterSubscriptionSchema.safeParse(valid).success).toBe(true);
  });

  it('trims and lower-cases the email', () => {
    expect(newsletterSubscriptionSchema.parse({ ...valid, email: '  Jan@Example.COM ' }).email).toBe('jan@example.com');
  });

  it.each(['not-an-email', '', 'a@b', `${'a'.repeat(250)}@example.com`, { $gt: '' }, ['a@b.pl'], 5, null])(
    'rejects email %j',
    (email) => expect(fails({ email })).toBe(true),
  );

  it('rejects a missing email', () => {
    expect(newsletterSubscriptionSchema.safeParse({ fullName: 'Jan' }).success).toBe(false);
  });

  it.each(['   ', '', { a: 1 }, 5, null, 'x'.repeat(201)])('rejects fullName %j', (fullName) => {
    expect(fails({ fullName })).toBe(true);
  });

  it('rejects a missing fullName and accepts 200 characters', () => {
    expect(newsletterSubscriptionSchema.safeParse({ email: valid.email }).success).toBe(false);
    expect(fails({ fullName: 'x'.repeat(200) })).toBe(false);
  });

  it('strips unknown keys', () => {
    const result = newsletterSubscriptionSchema.parse({ ...valid, _id: 'x', createdAt: '2000-01-01', isAdmin: true });
    expect(Object.keys(result).sort()).toEqual(['email', 'fullName']);
  });

  it('treats the honeypot as optional but empty', () => {
    expect(fails({ website: undefined })).toBe(false);
    expect(fails({ website: '' })).toBe(false);
    expect(fails({ website: 'http://spam' })).toBe(true);
  });
});
