import { z } from 'zod';

export const MAX_CHILDREN = 5;
export const NO_SCHOOL_ID = '0';
export const NO_SCHOOL_LABEL = 'Moje dzieci nie chodzą jeszcze do szkoły';

export const textField = (label: string, max = 200) =>
  z.string().trim().min(1, `Proszę podaj ${label}`).max(max, `${label}: maksymalnie ${max} znaków`);

export const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, 'Email: maksymalnie 254 znaki')
  .pipe(z.email('Proszę wprowadź prawidłowy Email'));

export const numberOfChildrenField = z
  .number()
  .int()
  .min(1, 'Minimum 1 dziecko')
  .max(MAX_CHILDREN, `Maksymalnie ${MAX_CHILDREN} dzieci`);

export const GDPR_CONSENT_MESSAGE = 'Proszę wyraź zgodę na przetwarzanie danych osobowych';

export const pactSubmissionSchema = z.object({
  firstName: textField('Imię', 100),
  lastName: textField('Nazwisko', 100),
  email: emailField,
  schoolId: z.string().regex(/^\d{1,12}$/, 'Nieprawidłowy numer szkoły'),
  // only needed for the "no school yet" option; otherwise the server takes the region from the registry
  voivodship: textField('Województwo').optional(),
  district: textField('Powiat').optional(),
  county: textField('Gminę').optional(),
  numberOfChildren: numberOfChildrenField,
  gdpr_consent: z.literal(true, { error: GDPR_CONSENT_MESSAGE }),
  newsletter_consent: z.boolean().default(false),
  website: z.string().max(0).optional(), // honeypot, optional so that a stale browser tab still works
});

export type PactSubmission = z.infer<typeof pactSubmissionSchema>;
