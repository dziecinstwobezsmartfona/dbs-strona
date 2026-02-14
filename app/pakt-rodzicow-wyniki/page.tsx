import Link from 'next/link';
import PactCounter from '@/components/PactCounter';
import PactStatsTable from '@/components/PactStatsTable';

export default function PaktRodzicowWyniki() {
  return (
    <main className="bg-white">
      {/* Large tile with totals */}
      <section className="mt-32 mb-16">
        <div className="flex flex-col items-center justify-between bg-[url(/images/card-bg-02.webp)] bg-auto bg-top text-(--main-accent) w-[90%] lg:w-3/4 mx-auto my-8 rounded-[50px]">
          <div className="flex flex-col items-center justify-between w-[90%] lg:w-3/4 my-8 lg:my-24">
            <p className="text-5xl lg:text-8xl font-title text-center">PAKT RODZICÓW</p>
            <p className="text-sm lg:text-xl font-sans pb-8">Statystyki</p>
            <div className="flex flex-col lg:flex-row items-center justify-between w-full pb-8">
              <div className="my-4">
                <PactCounter font="font-title" fontSize="text-5xl lg:text-8xl" background="bg-white" foreground="text-(--foreground)" subtext="dzieci objętych Paktem" subtextFont="font-menu" />
              </div>
              <div className="my-4">
                <PactCounter type="schools" font="font-title" fontSize="text-5xl lg:text-8xl" background="bg-white" foreground="text-(--foreground)" subtext="zarejestrowanych szkół" subtextFont="font-menu" />
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
          <PactStatsTable />
        </div>
      </section>
    </main >
  );
}
