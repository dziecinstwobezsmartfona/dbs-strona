import type { Metadata } from 'next';
import Search from '@/components/Search';

export const metadata: Metadata = {
  title: 'Szukaj',
  robots: { index: false },
};

export default async function Szukaj({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
    const { q } = await searchParams;
    const initialQuery = (Array.isArray(q) ? q[0] : q) ?? '';

    return (
        <main className="min-h-screen flex flex-col items-center justify-top">
            <section className="flex flex-col w-full bg-(--main-accent)">
                <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center pt-45 pb-16">
                    <p className="text-5xl md:text-6xl xl:text-7xl font-title">Szukaj</p>
                </div>
            </section>
            <section className="w-full">
                <div className="w-3/4 lg:w-1/2 mx-auto py-12">
                    <Search initialQuery={initialQuery.slice(0, 100)} />
                </div>
            </section>
        </main>
    );
}
