"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import PactCounter from '@/components/PactCounter';
import PactStatsTable from '@/components/PactStatsTable';

const PaktStatsContent = () => {
  const searchParams = useSearchParams();
  const voivodship = searchParams.get('voivodship');
  const district = searchParams.get('district');
  const county = searchParams.get('county');

  const getBackTo = () => {
    if (!voivodship) {
      return null;
    } else if (!district) {
      return (
        <Link href="/pakt-rodzicow-wyniki">
          ← Cofnij do: Cała Polska
        </Link>
      );
    } else if (!county) {
      return (
        <Link href={`/pakt-rodzicow-wyniki?voivodship=${voivodship}`}>
          ← Cofnij do: Województwo {voivodship.charAt(0).toUpperCase() + voivodship.slice(1).toLowerCase()}
        </Link>
      );
    } else {
      return (
        <Link href={`/pakt-rodzicow-wyniki?voivodship=${voivodship}&district=${district}`}>
          ← Cofnij do: Powiat {district.charAt(0).toUpperCase() + district.slice(1).toLowerCase()}
        </Link>
      );
    }
  };

  const getDrillDownTitle = () => {
    if (!voivodship) {
      return "Cała Polska";
    } else if (!district) {
      return `Województwo ${voivodship.charAt(0).toUpperCase() + voivodship.slice(1).toLowerCase()}`;
    } else if (!county) {
      return `Powiat ${district.charAt(0).toUpperCase() + district.slice(1).toLowerCase()}`;
    } else {
      return `Gmina ${county.charAt(0).toUpperCase() + county.slice(1).toLowerCase()}`;
    }
  };

  return (
    <>
      {/* Large tile with totals */}
      <section className="mt-32 mb-16">
        <div className="flex flex-col items-center justify-between bg-[url(/images/card-bg-02.webp)] bg-auto bg-top text-(--main-accent) w-[90%] lg:w-3/4 mx-auto my-8 rounded-[50px]">
          <div className="flex flex-col items-center justify-between w-[90%] lg:w-3/4 my-8 lg:my-24">
            <p className="text-5xl lg:text-8xl font-title text-center">PAKT RODZICÓW</p>
            <p className="text-sm lg:text-xl font-sans pb-12">Statystyki</p>
            <p className="text-sm lg:text-xl font-sans pb-8"><b>{getBackTo()}</b></p>
            <p className="text-3xl lg:text-6xl font-title text-white pb-8">{getDrillDownTitle()}</p>
            <div className="flex flex-col lg:flex-row items-center justify-between w-full pb-8">
              <div className="my-4">
                <PactCounter
                  font="font-title"
                  fontSize="text-5xl lg:text-8xl"
                  background="bg-white"
                  foreground="text-(--foreground)"
                  subtext="dzieci objętych Paktem"
                  subtextFont="font-menu"
                  type="children"
                  voivodship={voivodship || undefined}
                  district={district || undefined}
                  county={county || undefined}
                />
              </div>
              <div className="my-4">
                <PactCounter
                  type="schools"
                  font="font-title"
                  fontSize="text-5xl lg:text-8xl"
                  background="bg-white"
                  foreground="text-(--foreground)"
                  subtext="zarejestrowanych szkół"
                  subtextFont="font-menu"
                  voivodship={voivodship || undefined}
                  district={district || undefined}
                  county={county || undefined}
                />
              </div>
            </div>
            <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl mt-4 p-4 hover:bg-(--background) w-full" href="pakt-rodzicow">
              <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Podpisz PAKT</span>
            </Link>
          </div>
        </div>
      </section>
      {/* Ranking województw */}
      <section className="flex flex-col items-center bg-(--main-accent) rounded-3xl w-[90%] lg:w-3/4 mx-auto mb-16">
        <div className="text-(--foreground) w-[90%] lg:w-3/4 my-8 lg:my-24">
          <PactStatsTable voivodship={voivodship} district={district} county={county} />
        </div>
      </section>
    </>
  );
};

export default function PaktRodzicowWyniki() {
  return (
    <main className="bg-white">
        <Suspense fallback={<div>Ładowanie statystyk...</div>}>
          <PaktStatsContent />
        </Suspense>
    </main>
  );
}
