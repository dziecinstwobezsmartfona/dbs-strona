'use client'; // Mark as client-side for interactivity

import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// School component
function School({ school, onRemove }: { school: any, onRemove: () => void }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
      <span>{school.school} ({school.county}, {school.district}, {school.voivodship})</span>
      <button
        type="button"
        onClick={onRemove}
        className="bg-red-500 text-white px-2 py-1 rounded text-sm"
      >
        Usuń
      </button>
    </div>
  );
}

// Define validation schema with Zod
const schema = z.object({
  firstName: z.string().min(1, 'Imię jest wymagane'),
  lastName: z.string().min(1, 'Nazwisko jest wymagane'),
  email: z.string().email('Nieprawidłowy email').min(1, 'Email jest wymagany'),
  schools: z.array(z.object({
    id: z.string(),
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
      const newSchool = { id: `${Date.now()}-${Math.random()}`, voivodship: currentVoivodship, district: currentDistrict, county: currentCounty, school: currentSchool };
      const newSchools = [...selectedSchools, newSchool];
      setSelectedSchools(newSchools);
      setValue('schools', newSchools); // Update form value for validation

      // Prefill for next school with previous selections (except school)
      setCurrentSchool('');
      setShowAddAndSubmit(false);
    }
  };

  // Handle removing a school
  const removeSchool = (id: string) => {
    const newSchools = selectedSchools.filter(school => school.id !== id);
    setSelectedSchools(newSchools);
    setValue('schools', newSchools); // Update form value for validation
  };

  // Watch consent for submit button
  const consent = watch('consent');

  // Handle form submission (replace with your API call)
  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // e.g., fetch('/api/submit-pact', { method: 'POST', body: JSON.stringify(data) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6 space-y-4">
      {/* Schools Selection */}
      <div className="space-y-2">

        {/* Display selected schools */}
        {selectedSchools.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold">Dodane szkoły:</h3>
            <div className="space-y-2">
              {selectedSchools.map((school) => (
                <School key={school.id} school={school} onRemove={() => removeSchool(school.id)} />
              ))}
            </div>
          </div>
        )}
        {errors.schools && <p className="text-red-500 text-sm">{errors.schools.message}</p>}

        <h3 className="text-lg font-semibold">Dodaj szkołę</h3>

        <div className="flex flex-col lg:flex-row gap-2">
          {/* Voivodship */}
          <select
            value={currentVoivodship}
            onChange={(e) => setCurrentVoivodship(e.target.value)}
            className="flex-1 bg-white border border-gray-300 rounded-3xl p-4"
          >
            <option value="">Wybierz Województwo</option>
            {voivodships.map((v) => <option key={v} value={v}>{v}</option>)}
          </select>

          {/* District (show if voivodship selected) */}
          {currentVoivodship && (
            <select
              value={currentDistrict}
              onChange={(e) => setCurrentDistrict(e.target.value)}
              className="flex-1 bg-white border border-gray-300 rounded-3xl p-4"
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
              className="flex-1 bg-white border border-gray-300 rounded-3xl p-4"
            >
              <option value="">Wybierz Gminę</option>
              {counties.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
        </div>

        {/* School (show if county selected) */}
        {currentCounty && (
          <select
            value={currentSchool}
            onChange={(e) => setCurrentSchool(e.target.value)}
            className="block w-full bg-white border border-gray-300 rounded-3xl p-4"
          >
            <option value="">Wybierz Szkołę</option>
            {schools.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        )}

        {/* Buttons (show if school selected) */}
        {showAddAndSubmit && (
          <div className="flex space-x-2">
            <button type="button" onClick={addSchool} className="bg-(--secondary-accent) text-white px-4 py-4 rounded-3xl">Dodaj</button>
          </div>
        )}

      </div>

      {/* Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <input id="firstName" {...register('firstName')} placeholder="Imię" className="block bg-white w-full border border-gray-300 rounded-3xl p-2" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
        </div>
        <div>
          <input id="lastName" {...register('lastName')} placeholder="Nazwisko" className="block bg-white w-full border border-gray-300 rounded-3xl p-2" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <input id="email" type="email" {...register('email')} placeholder="Email" className="block bg-white w-full border border-gray-300 rounded-3xl p-2" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
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
              className="h-4 w-4 bg-white text-blue-600 border-gray-300 rounded"
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
        className={`w-full bg-(--secondary-accent) text-white px-4 py-2 rounded-md ${!consent ? 'bg-(--secondary-accent) opacity-50 cursor-not-allowed' : ''}`}
      >
        Podpisuję Pakt
      </button>
    </form>
  );
}
