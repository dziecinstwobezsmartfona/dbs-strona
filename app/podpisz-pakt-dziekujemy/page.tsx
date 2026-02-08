import Link from 'next/link';

export default function PodpiszPaktDziekujemy() {
  return (
    <main className="container">
      {/* Title section */}
      <section className="relative w-screen overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/rodzice-razem.jpg')" }}
        ></div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-(--foreground) opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-3/4 lg:w-1/2 h-full mx-auto text-center text-(--secondary-accent) px-4">
          <p className="text-3xl lg:text-5xl font-title mt-60 mb-4">Dziękujemy za podpisanie</p>
          <p className="text-5xl lg:text-7xl font-title mb-40">PAKTU RODZICÓW</p>
        </div>
      </section>

      <section className="relative w-screen bg-(--background) py-16">
        <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
          <p className="text-lg lg:text-xl mb-8"><b>Jesteś teraz częścią ruchu rodzin w Polsce, które walczą o zdrowsze i szczęśliwsze dzieciństwo.</b></p>

          {/* Co dalej? */}
          <p className="text-3xl lg:text-5xl font-title my-8">Co dalej?</p>
          <p className="text-lg lg:text-xl mb-8">Początki mogą być trudne, dlatego przede wszystkim zachęcamy Cię do dołączenia do grupy Twojej szkoły w społeczności DBS na WhatsAppie. Bycie częścią grupy, która ma podobne podejście, może przynieść ogromne wsparcie.</p>
          <Link className="flex justify-center bg-(--foreground) rounded-3xl mx-8 mb-8 p-4 hover:bg-(--secondary-background)" href="https://linktr.ee/dziecinstwobezsmartfona">
            <span className="text-lg lg:text-2xl font-title text-(--secondary-accent) text-center">Znajdź grupę swojej szkoły na WhatsAppie</span>
          </Link>
          <p className="text-lg lg:text-xl mb-8">Grupa szkolna to miejsce, w którym wspólnie z innymi rodzicami, którzy mają dzieci w Twojej szkole, możecie rozmawiać, dzielić się pomysłami, planować wspólne działania oraz wspierać się nawzajem.</p>
          <p className="text-lg lg:text-xl mb-8">Jeżeli Twojej szkoły nie ma na liście, oznacza to, że grupa jeszcze nie została założona. Każdy może stworzyć taką grupę na WhatsAppie.</p>
          <Link href="https://drive.google.com/file/d/14ioG5qVpUhjyiD3dfn_2aMURq6wr9dfz/view?usp=sharing">
            <p className="text-lg lg:text-xl mb-16"><b>▶ Oto instrukcja, jak to zrobić ◀</b></p>
          </Link>
          <p className="text-lg lg:text-xl mb-8">Zapraszamy Cię również do dołączenia do naszej ogólnopolskiej społeczności na WhatsAppie. To miejsce, gdzie możemy wspierać się i dzielić wszystkim, co pomoże zadbać o lepsze dzieciństwo dla naszych dzieci.</p>
          <Link className="flex justify-center bg-(--foreground) rounded-3xl mx-8 mb-8 p-4 hover:bg-(--secondary-background)" href="https://chat.whatsapp.com/KKSz0wyUNaGJQD50908mGz?mode=r_c&source_surface=23">
            <span className="text-lg lg:text-2xl font-title text-(--secondary-accent) text-center">Dołącz do ogólnopolskiej społeczności na WhatsApp</span>
          </Link>
          
          {/* Materiały pomocnicze */}
          <div className="flex flex-col items-center justify-between bg-[url(/images/card-bg-02.webp)] bg-auto bg-top text-(--main-accent) w-full h-auto mx-auto my-8 lg:mx-8 p-8 rounded-3xl">
            <p className="text-3xl lg:text-5xl/16 font-title pb-8 text-center">Materiały pomocnicze</p>
            <p className="text-sm lg:text-xl font-sans text-white">Jeśli jeszcze nie zapoznałeś się z naszymi materiałami pomagającymi wprowadzić Pakt Rodziców w szkole, zachęcamy do zapoznania się z nimi. Znajdziesz je poniżej:</p>
            <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--background)" href="https://drive.google.com/file/d/1RJKOqdM0zf_lqiRsK9dW6w7MBr34vZWk/view?usp=sharing">
              <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Jak rozpocząć budowanie społeczności DBS w swojej szkole?</span>
            </Link>
            <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--background)" href="https://drive.google.com/file/d/1mK7T_Lo5UkrPA81k3YLOF7NhpV-eBTUm/view?usp=sharing">
              <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Jak zacząć rozmowę o "Dzieciństwie Bez Smartfona" na grupie klasowej?</span>
            </Link>
            <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--background)" href="https://drive.google.com/file/d/1wiNZ8dltvs6Fii3gW8dgo6N3XwzQ8-TM/view?usp=sharing">
              <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Jak poruszyć temat odkładania smartfonów z innymi rodzicami, żeby nie brzmieć oceniająco?</span>
            </Link>
            <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--background)" href="https://drive.google.com/file/d/1mG1eOrIsBHixjMHGWmnBcBJcUnhS2Ypn/view?usp=sharing">
              <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Prezentacja dla rodziców.pdf</span>
            </Link>
            <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--background)" href="https://dziecinstwobezsmartfona.pl/kodeks-postepowania">
              <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Kodeks postępowania społeczności DBS</span>
            </Link>
          </div>

          {/* Co jeszcze mogę zrobić */}
          <Link className="flex justify-center bg-(--foreground) rounded-3xl mx-8 mt-8 p-4 hover:bg-(--secondary-background)" href="co-moge-zrobic">
            <span className="text-lg lg:text-2xl font-title text-(--secondary-accent) text-center">Co jeszcze mogę zrobić?</span>
          </Link>
        </div>
      </section>
    </main>
  );
}