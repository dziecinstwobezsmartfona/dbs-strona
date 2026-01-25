'use client'; // Mark as client-side for interactivity

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';



// Define validation schema with Zod
const schema = z.object({
  firstName: z.string().min(1, 'Proszę podaj Imię'),
  lastName: z.string().min(1, 'Proszę podaj Nazwisko'),
  email: z.string().email('Proszę wprowadź prawidłowy Email').min(1, 'Proszę podaj Email'),
  voivodship: z.string().min(1, 'Proszę podaj Województwo'),
  district: z.string().min(1, 'Proszę podaj Powiat'),
  county: z.string().min(1, 'Proszę podaj Gminę'),
  schoolName: z.string().min(1, 'Proszę podaj Szkołę'),
  numberOfChildren: z.number().min(1, 'Minimum 1 dziecko').max(5, 'Maksymalnie 5 dzieci'),
  schoolId: z.string(),
  schoolVoivodship: z.string(),
  schoolDistrict: z.string(),
  schoolCounty: z.string(),
  school: z.string(),
  gdpr_consent: z.boolean().refine((val) => val === true, 'Proszę wyraź zgodę na przetwarzanie danych osobowych'),
  newsletter_consent: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function PactForm() {
  const router = useRouter();
  const [schoolsData, setSchoolsData] = useState<any[]>([]); // Raw data from JSON
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const { register, handleSubmit, control, formState: { errors }, setValue, watch, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      voivodship: '',
      district: '',
      county: '',
      schoolName: '',
      numberOfChildren: 1,
      schoolId: '',
      schoolVoivodship: '',
      schoolDistrict: '',
      schoolCounty: '',
      school: '',
      gdpr_consent: false,
      newsletter_consent: false,
    },
  });

  // Watch fields for submit button and cascading
  const gdpr_consent = watch('gdpr_consent');
  const selectedSchool = watch('school');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const watchedVoivodship = watch('voivodship');
  const watchedDistrict = watch('district');
  const watchedCounty = watch('county');
  const watchedSchoolName = watch('schoolName');

  // Fetch schools data
  useEffect(() => {
    fetch('/data/lista_szkol.json') // Adjust path if needed
      .then((res) => res.json())
      .then(setSchoolsData)
      .catch((err) => console.error('Error fetching schools:', err));
  }, []);

  // Memoized options for dropdowns
  const voivodships = useMemo(() => [...new Set(schoolsData.map((item) => item['Województwo']))].sort(), [schoolsData]);

  const districts = useMemo(() => {
    if (!watchedVoivodship) return [];
    return [...new Set(schoolsData.filter((item) => item['Województwo'] === watchedVoivodship).map((item) => item['Powiat']))].sort();
  }, [watchedVoivodship, schoolsData]);

  const counties = useMemo(() => {
    if (!watchedDistrict) return [];
    return [...new Set(schoolsData.filter((item) => item['Województwo'] === watchedVoivodship && item['Powiat'] === watchedDistrict).map((item) => item['Gmina']))].sort();
  }, [watchedVoivodship, watchedDistrict, schoolsData]);

  const schools = useMemo(() => {
    if (!watchedCounty) return [];
    return schoolsData.filter((item) => item['Województwo'] === watchedVoivodship && item['Powiat'] === watchedDistrict && item['Gmina'] === watchedCounty).map((item) => item['Nazwa']).sort();
  }, [watchedVoivodship, watchedDistrict, watchedCounty, schoolsData]);

  // Reset lower levels on change
  useEffect(() => {
    setValue('district', '');
    setValue('county', '');
    setValue('schoolName', '');
    setValue('school', '');
  }, [watchedVoivodship]);

  useEffect(() => {
    setValue('county', '');
    setValue('schoolName', '');
    setValue('school', '');
  }, [watchedDistrict]);

  useEffect(() => {
    setValue('schoolName', '');
    setValue('school', '');
  }, [watchedCounty]);

  // Set school fields in form when fully selected
  useEffect(() => {
    if (watchedVoivodship && watchedDistrict && watchedCounty) {
      // Always set 'school' to match 'schoolName' (empty string when placeholder selected)
      setValue('school', watchedSchoolName);

      // Handle special case for "Moje dzieci nie chodzą jeszcze do szkoły"
      if (watchedSchoolName === "Moje dzieci nie chodzą jeszcze do szkoły") {
        setValue('schoolId', '0');
        setValue('schoolVoivodship', watchedVoivodship);
        setValue('schoolDistrict', watchedDistrict);
        setValue('schoolCounty', watchedCounty);
      } else if (watchedSchoolName) {
        // Find the selected school object from schoolsData only if a school is actually selected
        const selectedSchoolData = schoolsData.find((item) =>
          item['Województwo'] === watchedVoivodship &&
          item['Powiat'] === watchedDistrict &&
          item['Gmina'] === watchedCounty &&
          item['Nazwa'] === watchedSchoolName
        );

        setValue('schoolId', selectedSchoolData ? selectedSchoolData['Numer RSPO'] : '');
        setValue('schoolVoivodship', watchedVoivodship);
        setValue('schoolDistrict', watchedDistrict);
        setValue('schoolCounty', watchedCounty);
      } else {
        // Reset school fields when placeholder is selected
        setValue('schoolId', '');
        setValue('schoolVoivodship', '');
        setValue('schoolDistrict', '');
        setValue('schoolCounty', '');
      }
    }
  }, [watchedVoivodship, watchedDistrict, watchedCounty, watchedSchoolName, setValue, schoolsData]);

  const isDisabled = !gdpr_consent || !selectedSchool || !firstName || !lastName || !email;

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      // Ensure schoolId is set to '0' if "Moje dzieci nie chodzą jeszcze do szkoły" is selected
      let finalSchoolId = data.schoolId;
      if (data.schoolName === "Moje dzieci nie chodzą jeszcze do szkoły") {
        finalSchoolId = '0';
      }
      
      const { firstName, lastName, email, schoolVoivodship, schoolDistrict, schoolCounty, school, numberOfChildren, gdpr_consent, newsletter_consent } = data;
      const response = await fetch('/api/pakty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          email, 
          schoolId: finalSchoolId, 
          schoolVoivodship, 
          schoolDistrict, 
          schoolCounty, 
          schoolName: school, 
          numberOfChildren, 
          gdpr_consent, 
          newsletter_consent 
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6 space-y-4">
      {/* Schools Selection */}
      <div className="space-y-2">

        <h3 className="text-sm md:text-lg font-semibold">1. Wybierz szkołę (lub gminę, jeśli żadne z Twoich dzieci jeszcze nie uczęszcza do szkoły)</h3>

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
                  <option value="">Wybierz Województwo</option>
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
                    <option value="">Wybierz Powiat</option>
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
                    <option value="">Wybierz Gminę</option>
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
              name="schoolName"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full bg-white border border-gray-300 rounded-3xl p-4"
                >
                  <option value="">Wybierz Szkołę</option>
                  <option value="Moje dzieci nie chodzą jeszcze do szkoły">Moje dzieci nie chodzą jeszcze do szkoły</option>
                  {schools.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              )}
            />
            {errors.schoolName && <p className="text-red-500 text-xs md:text-sm">{errors.schoolName.message}</p>}
          </div>
        )}

        {/* Number of Children (show if school selected) */}
        {watchedSchoolName && (
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
                  {[1, 2, 3, 4, 5].map((num) => (
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
