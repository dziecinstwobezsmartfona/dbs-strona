'use client'; // Mark as client-side for interactivity

import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define validation schema with Zod
const schema = z.object({
  firstName: z.string().min(1, 'Imię jest wymagane'),
  lastName: z.string().min(1, 'Nazwisko jest wymagane'),
  email: z.string().email('Nieprawidłowy email').min(1, 'Email jest wymagany'),
  schools: z.array(z.object({
    voivodship: z.string(),
    district: z.string(),
    county: z.string(),
    school: z.string(),
  })).min(1, 'Dodaj co najmniej jedną szkołę'),
  consent: z.boolean().refine((val) => val === true, 'Zgoda jest wymagana'),
});

type FormData = z.infer<typeof schema>;

export default function PactForm() {
  const [schoolsData, setSchoolsData] = useState<any[]>([]); // Raw data from JSON
  const [currentVoivodship, setCurrentVoivodship] = useState('');
  const [currentDistrict, setCurrentDistrict] = useState('');
  const [currentCounty, setCurrentCounty] = useState('');
  const [currentSchool, setCurrentSchool] = useState('');
  const [selectedSchools, setSelectedSchools] = useState<FormData['schools']>([]);
  const [showAddAndSubmit, setShowAddAndSubmit] = useState(false);

  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      schools: [],
      consent: false,
    },
  });

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
    if (!currentVoivodship) return [];
    return [...new Set(schoolsData.filter((item) => item['Województwo'] === currentVoivodship).map((item) => item['Powiat']))].sort();
  }, [currentVoivodship, schoolsData]);

  const counties = useMemo(() => {
    if (!currentDistrict) return [];
    return [...new Set(schoolsData.filter((item) => item['Województwo'] === currentVoivodship && item['Powiat'] === currentDistrict).map((item) => item['Gmina']))].sort();
  }, [currentVoivodship, currentDistrict, schoolsData]);

  const schools = useMemo(() => {
    if (!currentCounty) return [];
    return schoolsData.filter((item) => item['Województwo'] === currentVoivodship && item['Powiat'] === currentDistrict && item['Gmina'] === currentCounty).map((item) => item['Nazwa']).sort();
  }, [currentVoivodship, currentDistrict, currentCounty, schoolsData]);

  // Reset lower levels on change
  useEffect(() => {
    setCurrentDistrict('');
    setCurrentCounty('');
    setCurrentSchool('');
    setShowAddAndSubmit(false);
  }, [currentVoivodship]);

  useEffect(() => {
    setCurrentCounty('');
    setCurrentSchool('');
    setShowAddAndSubmit(false);
  }, [currentDistrict]);

  useEffect(() => {
    setCurrentSchool('');
    setShowAddAndSubmit(false);
  }, [currentCounty]);

  useEffect(() => {
    if (currentSchool) {
      setShowAddAndSubmit(true);
    }
  }, [currentSchool]);

  // Handle adding a school
  const addSchool = () => {
    if (currentVoivodship && currentDistrict && currentCounty && currentSchool) {
      const newSchools = [...selectedSchools, { voivodship: currentVoivodship, district: currentDistrict, county: currentCounty, school: currentSchool }];
      setSelectedSchools(newSchools);
      setValue('schools', newSchools); // Update form value for validation

      // Prefill for next school with previous selections (except school)
      setCurrentSchool('');
      setShowAddAndSubmit(false);
    }
  };

  // Watch consent for submit button
  const consent = watch('consent');

  // Handle form submission (replace with your API call)
  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // e.g., fetch('/api/submit-pact', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      {/* Name and Email */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Imię</label>
        <input id="firstName" {...register('firstName')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nazwisko</label>
        <input id="lastName" {...register('lastName')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" type="email" {...register('email')} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Schools Selection */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Dodaj szkoły</h3>

        {/* Voivodship */}
        <select
          value={currentVoivodship}
          onChange={(e) => setCurrentVoivodship(e.target.value)}
          className="block w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Wybierz Województwo</option>
          {voivodships.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>

        {/* District (show if voivodship selected) */}
        {currentVoivodship && (
          <select
            value={currentDistrict}
            onChange={(e) => setCurrentDistrict(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Wybierz Powiat</option>
            {districts.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        )}

        {/* County (show if district selected) */}
        {currentDistrict && (
          <select
            value={currentCounty}
            onChange={(e) => setCurrentCounty(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Wybierz Gminę</option>
            {counties.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        )}

        {/* School (show if county selected) */}
        {currentCounty && (
          <select
            value={currentSchool}
            onChange={(e) => setCurrentSchool(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Wybierz Szkołę</option>
            {schools.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}

        {/* Buttons (show if school selected) */}
        {showAddAndSubmit && (
          <div className="flex space-x-2">
            <button type="button" onClick={addSchool} className="bg-blue-500 text-white px-4 py-2 rounded-md">Dodaj kolejną szkołę</button>
          </div>
        )}

        {/* Display selected schools */}
        {selectedSchools.length > 0 && (
          <ul className="list-disc pl-5 space-y-1">
            {selectedSchools.map((school, idx) => (
              <li key={idx}>{school.school} ({school.county}, {school.district}, {school.voivodship})</li>
            ))}
          </ul>
        )}
        {errors.schools && <p className="text-red-500 text-sm">{errors.schools.message}</p>}
      </div>

      {/* Consent */}
      <div className="flex items-center">
        <Controller
          name="consent"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          )}
        />
        <label className="ml-2 text-sm text-gray-700">Wyrażam zgodę na przetwarzanie danych</label>
      </div>
      {errors.consent && <p className="text-red-500 text-sm">{errors.consent.message}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={!consent}
        className={`w-full bg-green-500 text-white px-4 py-2 rounded-md ${!consent ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Podpisuję Pakt
      </button>
    </form>
  );
}
