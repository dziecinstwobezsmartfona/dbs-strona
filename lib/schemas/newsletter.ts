import { z } from 'zod';
import { emailField, textField } from './pact';

export const newsletterSubscriptionSchema = z.object({
  fullName: textField('Imię i Nazwisko', 200),
  email: emailField,
  website: z.string().max(0).optional(), // honeypot, optional so that a stale browser tab still works
});

export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>;
