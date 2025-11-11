import Link from 'next/link';

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
        <div className="relative z-10 flex flex-col items-center justify-center w-3/4 md:w-1/2 h-full mx-auto text-center text-white px-4">
          <p className="text-5xl/16 md:text-8xl/32 font-title mt-75 mb-4">Jednoczymy się dla naszych dzieci</p>
          <p className="text-xl md:text-3xl font-bold mt-8 mb-20">Dołącz do rosnącego ruchu rodzin wierzących, że dzieciństwo jest zbyt krótkie, by spędzić je ze smartfonem</p>
        </div>
      </section>

      {/* Large tiles section */}
      <section className="relative w-screen bg-(--background) py-20">
        <div className="flex flex-col md:flex-row items-center justify-center w-3/4 mx-auto">
          <div className="flex flex-col items-center justify-top bg-[url(/images/card-bg-02.webp)] bg-auto bg-top text-(--main-accent) w-full m-8 p-8 rounded-3xl">
            <p className="text-3xl md:text-5xl font-title pb-8">Czym jest PAKT?</p>
            <p className="text-sm md:text-xl font-sans text-white">Pakt Rodziców na rzecz Dzieciństwa bez Smartfonów to sposób na zjednoczenie się z innymi rodzicami w Twojej okolicy w sprawie opóźnienia zakupu smartfona dla dziecka co najmniej do 14 roku życia, a dostępu do mediów społecznościowych do 16 roku życia.</p>
            <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl w-full mx-8 mt-8 py-4 hover:bg-(--background)" href="czym-jest-pakt">
              <span className="text-lg md:text-2xl font-title text-(--foreground)">Dowiedz się więcej</span>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-top bg-[url(/images/card-bg-01.webp)] bg-auto bg-top text-(--secondary-accent) w-full m-8 p-8 rounded-3xl">
            <p className="text-3xl md:text-5xl font-title pb-8">Dołącz na Whatsapp</p>
            <p className="text-sm md:text-xl font-sans text-white">Nasze lokalne grupy WhatsApp DBS to najlepszy sposób na połączenie się z innymi rodzicami w Twojej okolicy. Są one miejscem do dzielenia się pomysłami, zadawania pytań i dowiadywania się jakie kroki podejmują inni, aby utrzymać dzieciństwo wolne od smartfonów.</p>
            <Link className="flex justify-center bg-(--main-accent) rounded-3xl w-full mx-8 mt-8 py-4 hover:bg-(--background)" href="czym-jest-pakt">
              <span className="text-lg md:text-2xl font-title text-(--foreground)">Nasza społeczność Whatsapp</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}