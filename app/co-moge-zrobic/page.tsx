import Tag from '@/components/Tag';
import Link from 'next/link';

export default function NaszaMisja() {
    return (
        <main className="bg-[url(/images/card-bg-01.webp)] min-h-screen flex flex-col items-center justify-top py-45">
            <header className="flex flex-col text-(--foreground) w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 mb-12">Co mogę zrobić?</Tag>
                <p className="text-4xl/16 lg:text-6xl/24 font-title mb-12">Zapraszamy cię do ogólnopolskiej społeczności DBS!</p>
                <p className="text-lg lg:text-xl mb-12">Ogólnopolska społeczność Dzieciństwo Bez Smartfona na WhatsAppie to przestrzeń gdzie łączą się rodzice, których jednoczy wspólny cel: zdrowsze i szczęśliwsze dzieciństwo.</p>
                <Link className="flex justify-center bg-(--foreground) text-(--secondary-accent) rounded-3xl w-full mx-auto mb-12 py-4 hover:bg-white hover:text-(--foreground)" href="https://chat.whatsapp.com/KKSz0wyUNaGJQD50908mGz?mode=r_c&source_surface=23">
                    <span className="text-lg lg:text-2xl font-title">Ogólnopolska Społeczność DBS na Whatsapp</span>
                </Link>
                <p className="text-lg lg:text-xl"><i>Już niedługo w tym miejscu udostępnimy także wskazówki, szablony i poradniki, które pomogą Ci zainicjować działanie ruchu bezpośrednio w Twojej okolicy Twojej szkole.</i></p>
            </header>
        </main>
    );
}
