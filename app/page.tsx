import Image from 'next/image';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="flex justify-center items-center">
        <Image
          src="/under-construction.png"
          alt="Strona w trakcie przygotowania"
          width={200}
          height={200}
        />
      </section>
    </main>
  );
}