import Tag from '@/components/Tag';
import Link from 'next/link';

export default function NaszaMisja() {
    return (
        <main className="bg-(--secondary-background) min-h-screen flex flex-col items-center justify-top py-45">
            <header className="flex flex-col text-(--secondary-accent) w-3/4 md:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 mb-12">Czym jest Pakt</Tag>
                <p className="text-5xl/16 md:text-8xl/32 font-title mb-12">Pakt Rodziców</p>
                <p className="text-lg md:text-xl mb-8">Rodzicielski Pakt to sposób, aby wspólnie z innymi rodzicami w swojej społeczności zobowiązać się, że nie dacie swoim dzieciom <b>smartfona przed 14-tym rokiem życia</b>, a dostępu do <b>mediów społecznościowych przed 16-tym rokiem życia</b>.</p>
                <p className="text-xl md:text-3xl mb-6"><b>Po co?</b></p>
                <p className="text-lg md:text-xl mb-12">Najważniejsza jest siła grupy – jeśli twoje dziecko wie, że inne dzieci w klasie również nie dostaną smartfona przez kilka następnych lat, presja rówieśnicza znacząco <b>MALEJE</b>.</p>
                <Link className="flex justify-center bg-(--background) rounded-3xl w-full mx-auto mb-12 py-4 hover:bg-white" href="czym-jest-pakt">
                    <span className="text-lg md:text-2xl font-title text-(--foreground)">PODPISZ PAKT! (JUŻ WKRÓTCE)</span>
                </Link>
                <p className="text-lg md:text-xl mb-12">Podpisanie Rodzicielskiego Paktu zajmuje 30 sekund, a im więcej z nas to zrobi, tym szybciej zmienimy normy społeczne. Możliwość podpisania Rodzicielskiego Paktu już wkrótce zostanie udostępniona.</p>
                <p className="text-lg md:text-xl mb-24">Ideą Paktu Rodzicielskiego jest ułatwienie lokalnego, wspólnego działania. <i>W tym miejscu będziemy wprowadzać aktualne dane dotyczące liczby podpisanych Paktów, dzięki czemu będzie można zobaczyć, ile rodzin w Waszej szkole i powiecie podpisało Pakt.</i></p>
                <Link className="flex justify-center bg-(--foreground) text-(--secondary-accent) rounded-3xl w-full mx-auto mb-12 py-4 hover:bg-white hover:text-(--foreground)" href="co-moge-zrobic">
                    <span className="text-lg md:text-2xl font-title">Co jeszcze mogę zrobić?</span>
                </Link>

            </header>
        </main>
    );
}
