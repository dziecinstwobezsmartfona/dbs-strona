import { z } from 'zod';

export const MAX_CHILDREN = 5;
export const NO_SCHOOL_ID = '0';
export const NO_SCHOOL_LABEL = 'Moje dzieci nie chodzą jeszcze do szkoły';

const text = (label: string, max = 200) =>
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
  firstName: text('Imię', 100),
  lastName: text('Nazwisko', 100),
  email: emailField,
  schoolId: z.string().regex(/^\d{1,12}$/, 'Nieprawidłowy numer szkoły'),
  schoolVoivodship: text('Województwo'),
  schoolDistrict: text('Powiat'),
  schoolCounty: text('Gminę'),
  schoolName: text('Szkołę', 300), // the longest name in lista_szkol.json has 253 characters
  numberOfChildren: numberOfChildrenField,
  gdpr_consent: z.literal(true, { error: GDPR_CONSENT_MESSAGE }),
  newsletter_consent: z.boolean().default(false),
  website: z.string().max(0).optional(), // honeypot, optional so that a stale browser tab still works
});

export type PactSubmission = z.infer<typeof pactSubmissionSchema>;
