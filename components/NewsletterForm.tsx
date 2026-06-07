'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  fullName: z.string().min(1, 'Proszę podaj Imię i Nazwisko'),
  email: z.email({ error: 'Proszę wprowadź prawidłowy Email' }),
});

type FormData = z.infer<typeof schema>;

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div
      className="w-12 h-12 rounded-full animate-spin-custom spinner-debug"
      style={{
        borderWidth: '4px',
        borderStyle: 'solid',
        borderColor: 'var(--foreground) transparent var(--secondary-background) transparent',
        animation: 'spin-custom 1s linear infinite',
        transformOrigin: 'center',
      }}
    />
  </div>
);

export default function NewsletterForm() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const pathname = usePathname();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setSubmitStatus('idle');
    setErrorMessage('');
    reset();
  }, [pathname]);

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('submitting');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setErrorMessage(result.message || 'Błąd podczas zapisywania na newsletter');
        setSubmitStatus('error');
      }
    } catch {
      setErrorMessage('Błąd połączenia');
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-(--main-accent) text-foreground p-8 md:p-12 mx-4 md:mx-8 mt-16 mb-8 rounded-3xl">
        <p className="text-2xl font-semibold">Dziękujemy za zapisanie się na newsletter! Wkrótce otrzymasz od nas wiadomość.</p>
      </div>
    );
  }

  if (submitStatus === 'error') {
    return (
      <div className="bg-(--main-accent) text-foreground p-8 md:p-12 mx-4 md:mx-8 mt-16 mb-8 rounded-3xl flex flex-col gap-6">
        <p className="text-2xl font-semibold">Przepraszamy, wystąpił błąd: {errorMessage}</p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="self-start bg-foreground text-background px-8 py-3 rounded-3xl font-medium"
        >
          Spróbuj ponownie
        </button>
      </div>
    );
  }

  return (
    <div className="bg-(--main-accent) text-foreground p-8 md:p-12 mx-4 md:mx-8 mt-16 mb-8 rounded-3xl flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-begin gap-8">
        <div className="md:w-1/2">
          <h2 className="text-5xl md:text-6xl font-title leading-none mb-4">Razem mamy moc</h2>
          <p className="text-md">Zapisz się do newslettera Dzieciństwa Bez Smartfona, aby otrzymywać inspirujące historie, pomocne materiały i najnowsze informacje o naszym ruchu.</p>
        </div>
        <div className="md:w-1/2">
          {submitStatus === 'submitting' ? (
            <LoadingSpinner />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="Imię i Nazwisko"
                  className="w-full bg-background placeholder-foreground/60 text-foreground px-6 py-3 rounded-2xl"
                />
                {errors.fullName && <p className="text-red-700 text-sm mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Email"
                  className="w-full bg-background placeholder-foreground/60 text-foreground px-6 py-3 rounded-2xl"
                />
                {errors.email && <p className="text-red-700 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <button type="submit" className="bg-foreground text-background py-3 rounded-3xl font-medium mt-2 hover:bg-(--secondary-accent) hover:text-foreground transition-colors">
                Zapisz się*
              </button>
            </form>
          )}
        </div>
      </div>
      <div>
        <p className="text-sm w-full">* Zapisując się na newsletter zgadzasz się na otrzymywanie od nas wiadomości. Zgoda ta może zostać wycofana w każdym czasie, poprzez wysłanie informacji o wycofaniu zgody na adres kontakt@dziecinstwobezsmartfona.pl z adresu email, który został użyty do zapisania się na newsletter. Szczegółowe informacje na temat zasad i celów przetwarzania Twoich danych dostępne są w naszej polityce prywatności oraz w regulaminie newslettera.</p>
      </div>
    </div>
  );
}
