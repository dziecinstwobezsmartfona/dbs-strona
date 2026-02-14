import Tag from '@/components/Tag';
import PactCounter from '@/components/PactCounter';
import Link from 'next/link';

export default function NaszaMisja() {
    return (
        <main className="bg-(--secondary-background) min-h-screen flex flex-col items-center justify-top py-45">
            <header className="flex flex-col text-(--secondary-accent) w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 mb-12">Czym jest Pakt</Tag>
                <p className="text-5xl/16 lg:text-8xl/32 font-title mb-12">Pakt Rodziców</p>
                <p className="text-lg lg:text-xl mb-8">Pakt Rodziców to sposób, aby wspólnie z innymi rodzicami w swojej społeczności zobowiązać się do nie dawania swoim dzieciom <b>smartfona przed 14-tym rokiem życia</b>, a dostępu do <b>mediów społecznościowych przed 16-tym rokiem życia</b>.</p>
                <div className="mb-12">
                    <PactCounter 
                        font="font-title" 
                        fontSize="text-5xl lg:text-7xl"
                        subtextFont="font-sans"
                        subtext="dzieci jest już objętych Paktem!"
                    />
                </div>
                <Link className="flex justify-center bg-(--background) rounded-3xl w-full mx-auto mb-12 py-4 hover:bg-white" href="podpisz-pakt">
                    <span className="text-lg lg:text-2xl font-title text-(--foreground)">PODPISZ PAKT!</span>
                </Link>
                <p className="text-xl lg:text-3xl mb-6"><b>Po co?</b></p>
                <p className="text-lg lg:text-xl mb-12">Najważniejsza jest siła grupy – jeśli Twoje dziecko wie, że inne dzieci w klasie również nie dostaną smartfona przez kilka następnych lat, presja rówieśnicza znacząco <b>MALEJE</b>.</p>
                <p className="text-lg lg:text-xl mb-12">Podpisanie Paktu Rodziców zajmuje 30 sekund, a im więcej z nas to zrobi, tym szybciej zmienimy normy społeczne.</p>
                <p className="text-lg lg:text-xl mb-24">Ideą Paktu Rodziców jest ułatwienie lokalnego, wspólnego działania. W tym miejscu przedstawiamy aktualne dane dotyczące liczby podpisanych Paktów, dzięki czemu można zobaczyć, ile rodzin w całej Polsce podpisało Pakt.</p>
                <Link className="flex justify-center bg-(--foreground) text-(--secondary-accent) rounded-3xl w-full mx-auto mb-12 py-4 hover:bg-white hover:text-(--foreground)" href="co-moge-zrobic">
                    <span className="text-lg lg:text-2xl font-title">Co jeszcze mogę zrobić?</span>
                </Link>

            </header>
        </main>
    );
}
