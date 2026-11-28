'use client'; // Mark as client-side for interactivity

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MAX_CHILDREN, NO_SCHOOL_ID, NO_SCHOOL_LABEL, emailField, numberOfChildrenField, GDPR_CONSENT_MESSAGE } from '../lib/schemas/pact';

// Define validation schema with Zod
const schema = z.object({
  firstName: z.string().min(1, 'Proszę podaj Imię'),
  lastName: z.string().min(1, 'Proszę podaj Nazwisko'),
  email: emailField,
  voivodship: z.string().min(1, 'Proszę podaj Województwo'),
  district: z.string().min(1, 'Proszę podaj Powiat'),
  county: z.string().min(1, 'Proszę podaj Gminę'),
  schoolId: z.string().min(1, 'Proszę podaj Szkołę'),
  numberOfChildren: numberOfChildrenField,
  gdpr_consent: z.boolean().refine((val) => val === true, GDPR_CONSENT_MESSAGE),
  newsletter_consent: z.boolean().optional(),
  website: z.string().optional(), // honeypot
});

type FormData = z.infer<typeof schema>;

interface SchoolOption {
  id: string;
  name: string;
  detail?: string;
}

interface RegistryResponse {
  voivodships?: string[];
  districts?: string[];
  counties?: string[];
  schools?: SchoolOption[];
}

// Loads the options for one level of the cascade from the server. `params === null` means "don't load".
function useRegistry(params: Record<string, string> | null) {
  const [state, setState] = useState<{ key: string; data?: RegistryResponse; error?: boolean }>({ key: '' });
  const key = params ? new URLSearchParams(params).toString() : '';

  useEffect(() => {
    if (!params) return;
    const controller = new AbortController();
    fetch(`/api/schools-registry?${key}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<RegistryResponse>;
      })
      .then((data) => setState({ key, data }))
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ key, error: true });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (!params) return { data: undefined, loading: false, error: false };
  const current = state.key === key;
  return { data: current ? state.data : undefined, loading: !current, error: current && Boolean(state.error) };
}

export default function PactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      voivodship: '',
      district: '',
      county: '',
      schoolId: '',
      numberOfChildren: 1,
      gdpr_consent: false,
      newsletter_consent: false,
      website: '',
    },
  });

  // Watch fields for submit button and cascading
  const gdpr_consent = watch('gdpr_consent');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const watchedVoivodship = watch('voivodship');
  const watchedDistrict = watch('district');
  const watchedCounty = watch('county');
  const watchedSchoolId = watch('schoolId');

  // Each level is fetched from the server only when its parent is chosen
  const voivodshipsQ = useRegistry({});
  const districtsQ = useRegistry(watchedVoivodship ? { voivodship: watchedVoivodship } : null);
  const countiesQ = useRegistry(watchedDistrict ? { voivodship: watchedVoivodship, district: watchedDistrict } : null);
  const schoolsQ = useRegistry(watchedCounty ? { voivodship: watchedVoivodship, district: watchedDistrict, county: watchedCounty } : null);

  const voivodships = voivodshipsQ.data?.voivodships ?? [];
  const districts = districtsQ.data?.districts ?? [];
  const counties = countiesQ.data?.counties ?? [];
  const schools = schoolsQ.data?.schools ?? [];
  const loadFailed = voivodshipsQ.error || districtsQ.error || countiesQ.error || schoolsQ.error;

  // Reset lower levels on change
  useEffect(() => {
    setValue('district', '');
    setValue('county', '');
    setValue('schoolId', '');
  }, [watchedVoivodship, setValue]);

  useEffect(() => {
    setValue('county', '');
    setValue('schoolId', '');
  }, [watchedDistrict, setValue]);

  useEffect(() => {
    setValue('schoolId', '');
  }, [watchedCounty, setValue]);

  const isDisabled = !gdpr_consent || !watchedSchoolId || !firstName || !lastName || !email;

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const { firstName, lastName, email, schoolId, voivodship, district, county, numberOfChildren, gdpr_consent, newsletter_consent, website } = data;
      const response = await fetch('/api/pakty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // the server looks up the school name and region from schoolId
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          schoolId,
          voivodship,
          district,
          county,
          numberOfChildren,
          gdpr_consent,
          newsletter_consent,
          website,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        router.push('/podpisz-pakt-dziekujemy');
      } else {
        setSubmitMessage(result.message || 'Błąd podczas podpisywania paktu');
      }
    } catch (error) {
      setSubmitMessage('Błąd połączenia');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative w-full p-6 space-y-4">
      {/* Honeypot: invisible to people and assistive tech, bots fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Strona WWW</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {/* Schools Selection */}
      <div className="space-y-2">

        <h3 className="text-sm md:text-lg font-semibold">1. Wybierz szkołę (lub gminę, jeśli żadne z Twoich dzieci jeszcze nie uczęszcza do szkoły)</h3>
        {loadFailed && <p className="text-red-500 text-xs md:text-sm">Nie udało się wczytać listy, odśwież stronę</p>}

        <div className="flex flex-col lg:flex-row gap-2">
          {/* Voivodship */}
          <div>
            <Controller
              name="voivodship"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="flex-1 bg-white border border-gray-300 rounded-3xl p-4"
                >
                  <option value="">{voivodshipsQ.loading ? 'Ładowanie…' : 'Wybierz Województwo'}</option>
                  {voivodships.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              )}
            />
            {errors.voivodship && <p className="text-red-500 text-xs md:text-sm">{errors.voivodship.message}</p>}
          </div>

          {/* District (show if voivodship selected) */}
          {watchedVoivodship && (
            <div>
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="flex-1 bg-white border border-gray-300 rounded-3xl p-4"
                  >
                    <option value="">{districtsQ.loading ? 'Ładowanie…' : 'Wybierz Powiat'}</option>
                    {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                )}
              />
              {errors.district && <p className="text-red-500 text-xs md:text-sm">{errors.district.message}</p>}
            </div>
          )}

          {/* County (show if district selected) */}
          {watchedDistrict && (
            <div>
              <Controller
                name="county"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="flex-1 bg-white border border-gray-300 rounded-3xl p-4"
                  >
                    <option value="">{countiesQ.loading ? 'Ładowanie…' : 'Wybierz Gminę'}</option>
                    {counties.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                )}
              />
              {errors.county && <p className="text-red-500 text-xs md:text-sm">{errors.county.message}</p>}
            </div>
          )}
        </div>

        {/* School (show if county selected) */}
        {watchedCounty && (
          <div>
            <Controller
              name="schoolId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full bg-white border border-gray-300 rounded-3xl p-4"
                >
                  <option value="">{schoolsQ.loading ? 'Ładowanie…' : 'Wybierz Szkołę'}</option>
                  <option value={NO_SCHOOL_ID}>{NO_SCHOOL_LABEL}</option>
                  {schools.map((s) => <option key={s.id} value={s.id}>{s.detail ? `${s.name} — ${s.detail}` : s.name}</option>)}
                </select>
              )}
            />
            {errors.schoolId && <p className="text-red-500 text-xs md:text-sm">{errors.schoolId.message}</p>}
          </div>
        )}

        {/* Number of Children (show if school selected) */}
        {watchedSchoolId && (
          <div>
            <label className="block text-xs md:text-sm font-medium mb-1">Liczba Twoich dzieci, dla których podpisujesz Pakt:</label>
            <Controller
              name="numberOfChildren"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="block bg-white border border-gray-300 rounded-3xl p-4"
                >
                  {Array.from({ length: MAX_CHILDREN }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.numberOfChildren && <p className="text-red-500 text-xs md:text-sm">{errors.numberOfChildren.message}</p>}
          </div>
        )}

      </div>

      <h3 className="text-sm md:text-lg font-semibold mt-16">2. Podaj swoje imię, nazwisko oraz email</h3>

      {/* Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <input id="firstName" {...register('firstName')} placeholder="Imię" className="block bg-white w-full border border-gray-300 rounded-3xl p-2" />
          {errors.firstName && <p className="text-red-500 text-xs md:text-sm">{errors.firstName.message}</p>}
        </div>
        <div>
          <input id="lastName" {...register('lastName')} placeholder="Nazwisko" className="block bg-white w-full border border-gray-300 rounded-3xl p-2" />
          {errors.lastName && <p className="text-red-500 text-xs md:text-sm">{errors.lastName.message}</p>}
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <input id="email" type="email" {...register('email')} placeholder="Email" className="block bg-white w-full border border-gray-300 rounded-3xl p-2" />
          {errors.email && <p className="text-red-500 text-xs md:text-sm">{errors.email.message}</p>}
        </div>
      </div>

      <h3 className="text-sm md:text-lg font-semibold mt-16">3. Wyraź zgodę na przetwarzanie danych</h3>

      {/* GDPR Consent */}
      <div className="flex items-center">
        <Controller
          name="gdpr_consent"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="h-4 w-4 bg-white text-blue-600 border-gray-300 rounded"
            />
          )}
        />
        <label className="ml-2 text-xs md:text-sm text-gray-700">Wyrażam zgodę na przetwarzanie danych osobowych (zapoznaj się z <a href="#" onClick={(e) => { e.preventDefault(); window.open('/polityka-prywatnosci?popup=true', 'privacy', 'width=800,height=600,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no'); }} className="underline">Polityką Prywatności</a>)</label>
      </div>
      {errors.gdpr_consent && <p className="text-red-500 text-xs md:text-sm">{errors.gdpr_consent.message}</p>}

      {/* Newsletter Consent */}
      <div className="flex items-center mt-2">
        <Controller
          name="newsletter_consent"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="h-4 w-4 bg-white text-blue-600 border-gray-300 rounded"
            />
          )}
        />
        <label className="ml-2 text-xs md:text-sm text-gray-700">Zapisuję się na newsletter (zapoznaj się z <a href="#" onClick={(e) => { e.preventDefault(); window.open('/regulamin-newslettera?popup=true', 'terms', 'width=800,height=600,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no'); }} className="underline">Regulaminem Newslettera</a>)</label>
      </div>

      <h3 className="text-sm md:text-lg font-semibold mt-16">4. Podpisz Pakt</h3>

      {/* Submit */}
      <button
        type="submit"
        disabled={isDisabled || isSubmitting}
        className={`w-full font-title text-lg md:text-xl bg-(--foreground) text-(--secondary-accent) px-4 py-2 rounded-3xl hover:opacity-80 transition-opacity ${isDisabled || isSubmitting ? 'bg-(--foreground) opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Podpisywanie...' : 'Podpisuję Pakt'}
      </button>
      {submitMessage && <p className={`text-sm md:text-lg mt-2 ${submitMessage.includes('pomyślnie') ? 'text-green-600' : 'text-red-600'}`}>{submitMessage}</p>}
    </form>
  );
}
