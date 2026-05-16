import PactCounter from '@/components/PactCounter';
import Link from 'next/link';

export default function PaktRodzicow() {
    return (
        <main className="container bg-(--background)">
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
                    <p className="text-5xl lg:text-8xl font-title mt-60 mb-4">PAKT RODZICÓW</p>
                    <p className="text-3xl lg:text-5xl font-title mb-4">dla Dzieciństwa Bez Smartfona</p>
                    <p className="text-lg lg:text-xl text-white mb-8">Pakt Rodziców to sposób, aby wspólnie z innymi rodzicami w swojej społeczności zobowiązać się do nie dawania swoim dzieciom <b>smartfona przed 14-tym rokiem życia</b>, a dostępu do <b>mediów społecznościowych przed 16-tym rokiem życia</b>.</p>
                    <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl w-full mx-auto mb-24 py-4 hover:bg-white" href="podpisz-pakt">
                        <span className="text-lg lg:text-2xl font-title text-(--foreground)">Podpisz teraz</span>
                    </Link>
                </div>
            </section>

            <section className="relative w-screen bg-(--background) py-16">
                <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                    <p className="text-lg lg:text-xl mb-12"><b>Najważniejsza jest siła grupy – jeśli Twoje dziecko wie, że inne dzieci w klasie również nie dostaną smartfona przez kilka następnych lat, presja rówieśnicza znacząco MALEJE.</b></p>
                    <p className="text-lg lg:text-xl mb-12">Podpisanie Paktu Rodziców zajmuje 30 sekund, a im więcej z nas to zrobi, tym szybciej zmienimy normy społeczne.</p>
                    <p className="text-lg lg:text-xl mb-16">Ideą Paktu Rodziców jest ułatwienie lokalnego, wspólnego działania. W tym miejscu przedstawiamy aktualne dane dotyczące liczby podpisanych Paktów, dzięki czemu można zobaczyć, ile rodzin w całej Polsce podpisało Pakt.</p>
                </div>
                {/* Large tile with totals */}
                <div className="mb-16">
                    <div className="flex flex-col items-center justify-between bg-[url(/images/card-bg-02.webp)] bg-auto bg-top text-(--main-accent) w-[90%] lg:w-3/4 mx-auto my-8 rounded-[50px]">
                        <div className="flex flex-col items-center justify-between w-[90%] lg:w-3/4 my-8 lg:my-16">
                            <p className="text-5xl lg:text-5xl font-title text-center pb-8">Dołącz do rosnącego ruchu rodziców</p>
                            <div className="flex flex-col lg:flex-row items-center justify-between w-full pb-8">
                                <div className="my-4">
                                    <PactCounter font="font-title" fontSize="text-5xl lg:text-8xl" background="bg-white" foreground="text-(--foreground)" subtext="dzieci objętych Paktem" subtextFont="font-menu" />
                                </div>
                                <div className="my-4">
                                    <PactCounter type="schools" font="font-title" fontSize="text-5xl lg:text-8xl" background="bg-white" foreground="text-(--foreground)" subtext="zarejestrowanych szkół" subtextFont="font-menu" />
                                </div>
                            </div>
                            <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl mt-4 p-4 hover:bg-(--background) w-full" href="pakt-rodzicow-wyniki">
                                <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Zobacz statystyki</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[90%] lg:w-3/4 mx-auto">
                    <Link className="flex justify-center bg-(--foreground) text-(--secondary-accent) rounded-3xl w-full mx-auto mb-12 py-4 hover:bg-white hover:text-(--foreground)" href="dzialam">
                        <span className="text-lg lg:text-2xl font-title">Co jeszcze mogę zrobić?</span>
                    </Link>
                </div>
            </section>
        </main>
    );
}
