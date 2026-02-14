import Link from 'next/link';
import PactCounter from '@/components/PactCounter';

export default function Home() {
  return (
    <main className="container">
      {/* Title section */}
      <section className="relative w-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/leaves_background_loop.mp4" type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-3/4 lg:w-1/2 h-full mx-auto text-center text-white px-4">
          <p className="text-5xl/16 lg:text-8xl/32 font-title mt-75 mb-4">Jednoczymy się dla naszych dzieci</p>
          <p className="text-xl lg:text-3xl font-bold mt-8 mb-20">Dołącz do rosnącego ruchu rodzin wierzących, że dzieciństwo jest zbyt krótkie, by spędzić je ze smartfonem w&nbsp;ręku</p>
        </div>
      </section>

      {/* Large tiles section */}
      <section className="relative w-screen bg-(--background) py-24">
        <div className="flex flex-col lg:flex-row items-top justify-center w-3/4 mx-auto">
          <div className="flex flex-col items-center justify-between bg-[url(/images/card-bg-02.webp)] bg-auto bg-top text-(--main-accent) w-full h-auto mx-auto my-8 lg:mx-8 p-8 rounded-3xl">
            <p className="text-3xl lg:text-5xl/16 font-title pb-8 text-center">Podpisz PAKT RODZICÓW</p>
            <p className="text-sm lg:text-xl font-sans text-white">Pakt Rodziców to sposób, aby wspólnie z&nbsp;innymi rodzicami w&nbsp;swojej społeczności zobowiązać się wzajemnie do nie dawania swoim dzieciom smartfonów przed ukończeniem 14 lat, oraz dostępu do mediów społecznościowych przed ukończeniem 16 lat.</p>
            <div className="my-4">
              <PactCounter font="font-title" fontSize="text-4xl lg:text-5xl" background="bg-white" foreground="text-(--foreground)" subtext="podpisanych Paktów" subtextFont="font-menu"/>
            </div>
            <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl w-full mx-8 mt-4 p-4 hover:bg-(--background)" href="pakt-rodzicow">
              <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Podpisz PAKT</span>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-between bg-[url(/images/card-bg-01.webp)] bg-auto bg-top text-(--secondary-accent) w-full h-auto mx-auto my-8 lg:mx-8 p-8 rounded-3xl">
            <p className="text-3xl lg:text-5xl/16 font-title pb-8 text-center">Dołącz na Whatsapp</p>
            <p className="text-sm lg:text-xl font-sans text-white">Nasza grupa na WhatsApp to najlepszy sposób na połączenie się z&nbsp;innymi rodzicami myślącymi podobnie. Jest ona miejscem do dzielenia się pomysłami, zadawania pytań i&nbsp;dowiadywania się jakie kroki podejmują inni, aby utrzymać dzieciństwo wolne od smartfonów.</p>
            <Link className="flex justify-center items-center bg-(--main-accent) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--background)" href="https://chat.whatsapp.com/KKSz0wyUNaGJQD50908mGz?mode=r_c&source_surface=23">
              <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Ogólnopolska społeczność DBS na Whatsapp</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto mt-16 items-center justify-center text-center">
          <p className="text-lg lg:text-xl mb-8"><b>Dzieciństwo Bez Smartfona to ruch rodzin zjednoczonych wokół celu przedłużenia dzieciństwa bez dostępu do smartfonów i&nbsp;mediów społecznościowych – zamieniamy izolację na zbiorową siłę.</b>.</p>
          <p className="text-lg lg:text-xl mb-8">Razem zwracamy naszym dzieciom to co naprawdę ważne: czas na zabawę, przestrzeń do rozwoju, wolność do bycia dziećmi.</p>
          <p className="text-lg lg:text-xl mb-8">Dzieciństwo powinno być kształtowane przez rodziców i&nbsp;bezpośrednie otoczenie, a&nbsp;nie algorytmy.</p>
          <Link className="flex justify-center bg-(--foreground) rounded-3xl mx-8 mt-8 p-4 hover:bg-(--secondary-background)" href="pakt-rodzicow">
            <span className="text-lg lg:text-2xl font-title text-(--secondary-accent) text-center">Podpisz PAKT RODZICÓW</span>
          </Link>
        </div>
      </section>
    </main>
  );
}