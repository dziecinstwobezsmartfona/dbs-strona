import Tag from '@/components/Tag';
import Link from 'next/link';

export default function Dzialam() {
    return (
        <main className="bg-[url(/images/card-bg-01.webp)] min-h-screen flex flex-col items-center justify-top py-45">
            <header className="flex flex-col text-(--foreground) w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 mb-12">Co mogę zrobić?</Tag>

                <p className="text-4xl/16 lg:text-6xl/24 font-title mb-8">Zapraszamy cię do ogólnopolskiej społeczności DBS!</p>
                <p className="text-lg lg:text-xl mb-12">Ogólnopolska społeczność Dzieciństwo Bez Smartfona na WhatsAppie to przestrzeń gdzie łączą się rodzice, których jednoczy wspólny cel: zdrowsze i szczęśliwsze dzieciństwo.</p>
                <Link className="flex justify-center bg-(--foreground) text-(--secondary-accent) rounded-3xl w-full mx-auto mb-12 p-4 hover:bg-white hover:text-(--foreground)" href="https://chat.whatsapp.com/KKSz0wyUNaGJQD50908mGz?mode=r_c&source_surface=23">
                    <span className="text-lg lg:text-2xl font-title">Ogólnopolska Społeczność DBS na Whatsapp</span>
                </Link>

                <p className="text-4xl/16 lg:text-6xl/24 font-title mb-8">Podpisz PAKT RODZICÓW!</p>
                <p className="text-lg lg:text-xl mb-12">Pakt Rodziców to sposób, aby wspólnie z&nbsp;innymi rodzicami w&nbsp;swojej społeczności zobowiązać się wzajemnie do nie dawania swoim dzieciom smartfonów przed ukończeniem 14 lat, oraz dostępu do mediów społecznościowych przed ukończeniem 16 lat.</p>
                <Link className="flex justify-center bg-(--background) rounded-3xl w-full mx-auto mb-12 py-4 hover:bg-white" href="pakt-rodzicow">
                    <span className="text-lg lg:text-2xl font-title text-(--foreground)">PODPISZ PAKT</span>
                </Link>

                {/* Materiały pomocnicze */}
                <div className="flex flex-col items-center justify-between bg-[url(/images/card-bg-02.webp)] bg-auto bg-top text-(--main-accent) w-full h-auto mx-auto my-8 lg:mx-8 p-8 rounded-3xl">
                    <p className="text-3xl lg:text-5xl/16 font-title pb-8 text-center">Materiały pomocnicze</p>
                    <p className="text-sm lg:text-xl font-sans text-white">Jeśli jeszcze nie zapoznałeś się z naszymi materiałami pomagającymi wprowadzić Pakt Rodziców w szkole, zachęcamy do zapoznania się z nimi. Znajdziesz je poniżej:</p>
                    <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--background)" href="https://drive.google.com/file/d/1RJKOqdM0zf_lqiRsK9dW6w7MBr34vZWk/view?usp=sharing">
                        <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Jak działać jako Koordynator DBS w swojej szkole</span>
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
                    <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--background)" href="https://docs.google.com/document/d/15RmM4p2QndwEpb_zta4dxDe6KFVTTDn04UpiaQ1-FME/edit?usp=sharing">
                        <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Edytowalne szablony plakatów i ulotek</span>
                    </Link>
                    <Link className="flex justify-center bg-(--secondary-accent) rounded-3xl w-full mx-8 mt-8 p-4 hover:bg-(--background)" href="https://dziecinstwobezsmartfona.pl/kodeks-postepowania">
                        <span className="text-lg lg:text-2xl font-title text-(--foreground) text-center">Kodeks postępowania społeczności DBS</span>
                    </Link>
                </div>
            </header>
        </main>
    );
}
