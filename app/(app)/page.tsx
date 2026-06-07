import Link from 'next/link';
import PactCounter from '@/components/PactCounter';
//import WebinarPopup from '@/components/WebinarPopup';

export default function Home() {
  return (
    <main className="container">
      {/* <WebinarPopup /> */}
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

        {/* Webinar info (temporary)
        <div className="relative max-w-lg w-[90%] bg-white text-(--foreground) rounded-3xl shadow-2xl border border-(--secondary-background) p-8 overflow-y-auto mx-auto mb-16">

          <h2 className="text-2xl lg:text-3xl font-title mb-4 text-center">
            📢 Webinar: Jak działać jako Koordynator DBS w szkole?
          </h2>

          <div className="space-y-2 text-base leading-relaxed">
            <p>📅 <strong>Kiedy?</strong> 14.04.2026 (wtorek) o 20:30</p>
            <p>💻 <strong>Gdzie?</strong> Online</p>
            <div className="pt-2 text-center">
              <p className="font-semibold">🔗 Zapisy:</p>
              <a
                href="https://forms.gle/EYtSv78NkPJ95Tc16"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex mt-2 items-center justify-center rounded-2xl bg-(--main-accent) px-4 py-2 font-title text-(--foreground) hover:bg-(--secondary-accent) transition-colors"
              >
                https://forms.gle/EYtSv78NkPJ95Tc16
              </a>
            </div>
            <p className="text-sm text-(--foreground) text-center">
              📩 Link do spotkania prześlemy dzień przed webinarem na podany w formularzu adres e-mail.
            </p>
          </div>

          <div className="mt-6">
            <p className="font-semibold mb-3">Tematy webinaru:</p>
            <ul className="space-y-2 text-base leading-relaxed">
              <li>1️⃣ Czym jest Dzieciństwo Bez Smartfona i Pakt Rodziców</li>
              <li>2️⃣ Rola Koordynatora – kim jest Koordynator i jak może działać w swojej szkole</li>
              <li>3️⃣ Materiały i pomoce dla Koordynatorów</li>
              <li>4️⃣ Inne formy zaangażowania</li>
            </ul>
          </div>

          <p className="mt-6 text-center text-lg">Zapraszamy! 🙂</p>

        </div>
        {/* End of Webinar info */}

        {/* Nasza misja / "dylemat" */}
        <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
          <div className="flex flex-col w-[90%] lg:w-[80%] mx-auto items-left justify-center mb-8 font-sans">
            <p className="text-3xl/10 md:text-5xl/20 xl:text-6xl/24 mt-8 mb-6 text-center font-title">Ruch społeczny "Dzieciństwo Bez Smartfona"</p>
            <p className="text-md md:text-lg xl:text-xl pb-6 text-center"><b>Smartfony fundamentalnie zmieniły dzieciństwo. Na gorsze.</b></p>
            <p className="text-md md:text-lg xl:text-xl pb-6">Dzieci najpierw dostawały smartfony, bo <b>prawie nikt nie był świadomy</b> płynącego z nich zagrożenia, a teraz je dostają, ponieważ sprawy zaszły tak daleko, że <b>rodzice nie widzą innego wyjścia</b>.</p>
            <p className="text-md md:text-lg xl:text-xl pb-6">Kiedy większość dzieci ma smartfona z najaktualniejszymi aplikacjami, rezygnacja z niego wydaje się odsunięciem dziecka od rówieśników.</p>
            <p className="text-md md:text-lg xl:text-xl pb-2">Rodzice mają wrażenie, że stoją przed <b>niemożliwym wyborem</b>:</p>
            <p className="text-md md:text-lg xl:text-xl pb-2">☹️ Powiedzieć „<b>tak</b>" smartfonowi i <b>ryzykować zdrowie swojego dziecka</b></p>
            <p className="text-md md:text-lg xl:text-xl pb-6">☹️ Albo powiedzieć „<b>nie</b>" i <b>zaryzykować odcięcie dziecka od rówieśników</b></p>
            <p className="text-md md:text-lg xl:text-xl pb-6">Ale czy na pewno powiedzenie "nie" smartfonom dla dzieci jest niemożliwe?</p>
            <p className="text-md md:text-lg xl:text-xl pb-6 text-center"><b>Rozwiązaniem jest współpraca.</b></p>
            <p className="text-md md:text-lg xl:text-xl mb-8">Zgadzając się <b>zbiorowo</b> na opóźnienie momentu wręczenia dzieciom smartfonów, możemy odwrócić bieg wydarzeń i odzyskać dzieciństwo z „rąk” gigantów technologicznych. Jeśli będziemy działać w grupie, zmiana jest nie tylko możliwa – jest <b>nieunikniona</b>.</p>
          </div>
        </section>

        {/* Pierwszy rząd kafelków */}
        <div className="flex flex-col xl:flex-row items-stretch justify-center w-3/4 mx-auto space-y-16 xl:space-x-16 xl:space-y-0 mb-16">
          {/* Podpisz Pakt Rodziców */}
          <div className="flex flex-col items-center justify-between bg-[url(/images/card-bg-02.webp)] bg-auto bg-top text-(--main-accent) w-full xl:w-1/2 p-8 rounded-3xl">
            <p className="text-3xl lg:text-5xl/16 font-title pb-8 text-center">Podpisz PAKT RODZICÓW</p>
            <p className="text-sm lg:text-xl font-sans text-white">Pakt Rodziców to sposób, aby wspólnie z&nbsp;innymi rodzicami w&nbsp;swojej społeczności zadeklarować nie dawanie swoim dzieciom smartfonów przed ukończeniem 14 lat, oraz dostępu do mediów społecznościowych przed ukończeniem 16 lat.</p>
            <div className="my-4">
              <PactCounter font="font-title" fontSize="text-4xl lg:text-5xl" background="bg-white" foreground="text-(--foreground)" subtext="podpisanych Paktów" subtextFont="font-menu" />
            </div>
            <div className="flex flex-col lg:flex-row justify-between w-full">
              <Link className="flex justify-center items-center bg-(--secondary-accent) w-full lg:w-1/2 rounded-3xl mx-auto lg:mx-8 mt-4 p-4 hover:bg-(--background)" href="pakt-rodzicow">
                <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Podpisz PAKT</span>
              </Link>
              <Link className="flex justify-center bg-(--purple) w-full lg:w-1/2 rounded-3xl mx-auto lg:mx-8 mt-4 p-4 hover:bg-(--purple-light)" href="pakt-rodzicow-wyniki">
                <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Zobacz statystyki</span>
              </Link>
            </div>
          </div>
          {/* Dołącz do Społeczności DBS */}
          <div className="flex flex-col items-center justify-between bg-[url(/images/card-bg-01.webp)] bg-auto bg-top text-(--secondary-accent) w-full xl:w-1/2 p-8 rounded-3xl">
            <p className="text-3xl lg:text-5xl/16 font-title pb-8 text-center">Dołącz do Społeczności DBS</p>
            <p className="text-sm lg:text-xl font-sans text-white">Nasza Społeczność na WhatsApp to najlepszy sposób na połączenie się z&nbsp;innymi rodzicami myślącymi podobnie. Jest ona miejscem do dzielenia się pomysłami, zadawania pytań i&nbsp;dowiadywania się jakie kroki podejmują inni, aby utrzymać dzieciństwo wolne od smartfonów.</p>
            <Link className="flex justify-center items-center bg-(--main-accent) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--background)" href="https://chat.whatsapp.com/KKSz0wyUNaGJQD50908mGz?mode=r_c&source_surface=23">
              <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Ogólnopolska Społeczność DBS na Whatsapp</span>
            </Link>
          </div>
        </div>
        {/* Drugi rząd kafelków */}
        <div className="hidden flex flex-col xl:flex-row items-stretch justify-center w-3/4 mx-auto space-y-16 xl:space-x-16 xl:space-y-0">
          {/* Zostań Koordynatorem Szkolnym */}
          <div className="flex flex-col items-center justify-between bg-[url(/images/texture02.jpg)] bg-auto bg-top text-(--secondary-accent) w-full xl:w-1/2 p-8 rounded-3xl">
            <p className="text-3xl lg:text-5xl/16 font-title pb-8 text-center">Zostań Koordynatorem Szkolnym</p>
            <p className="text-sm lg:text-xl font-sans text-white">Koordynator Szkolny to osoba, która w społeczności szkolnej robi pierwszy krok, łącząc rodziców wokół jednego celu - przedłużenia dzieciństwa bez dostępu do smartfonów i mediów społecznościowych. Dzięki rozmowie i współpracy z innymi rodzicami koordynator wpływa na kulturę podejścia do smartfonów w szkole - bez zakazów, nakazów i odgórnych regulacji.</p>
            <Link className="flex justify-center items-center bg-(--secondary-accent) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--background)" href="https://chat.whatsapp.com/KKSz0wyUNaGJQD50908mGz?mode=r_c&source_surface=23">
              <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Jak zostać Koordynatorem Szkolnym?</span>
            </Link>
          </div>
          {/* Wesprzyj Dzieciństwo Bez Smartfona */}
          <div className="flex flex-col items-center justify-between bg-[url(/images/texture01.jpg)] bg-auto bg-top text-(--purple) w-full xl:w-1/2 p-8 rounded-3xl">
            <p className="text-3xl lg:text-5xl/16 font-title pb-8 text-center">Wesprzyj Dzieciństwo Bez Smartfona</p>
            <p className="text-sm lg:text-xl font-sans text-white">Pomóż nam budować świat, w którym dzieci częściej patrzą na ludzi i otaczającą je rzeczywistość niż na ekran telefonu. Twoje wsparcie pomaga chronić zdrowie, rozwój i relacje dzieci oraz młodzieży.</p>
            <Link className="flex justify-center items-center bg-(--purple) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--purple-light)" href="https://chat.whatsapp.com/KKSz0wyUNaGJQD50908mGz?mode=r_c&source_surface=23">
              <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Wesprzyj finansowo</span>
            </Link>
          </div>
        </div>
        {/* DBS to ruch rodzin - DZIAŁAJ Z NAMI (final call to action) */}
        <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto mt-16 items-center justify-center text-center">
          <p className="text-lg lg:text-xl mb-8"><b>Dzieciństwo Bez Smartfona to ruch rodzin zjednoczonych wokół celu przedłużenia dzieciństwa bez dostępu do smartfonów i&nbsp;mediów społecznościowych – zamieniamy izolację na zbiorową siłę.</b></p>
          <p className="text-lg lg:text-xl mb-8"><b>Razem zwracamy naszym dzieciom to co naprawdę ważne: czas na zabawę, przestrzeń do rozwoju, wolność do bycia dziećmi.</b></p>
          <p className="text-lg lg:text-xl mb-8"><b>Dzieciństwo powinno być kształtowane przez rodziców i&nbsp;bezpośrednie otoczenie, a&nbsp;nie algorytmy.</b></p>
          <Link className="flex justify-center bg-(--foreground) rounded-3xl mx-8 mt-8 p-4 hover:bg-(--secondary-background)" href="dzialam">
            <span className="text-2xl lg:text-6xl font-title text-(--secondary-accent) text-center">DZIAŁAJ Z NAMI!</span>
          </Link>
        </div>
      </section>
    </main>
  );
}