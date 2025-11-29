import Link from 'next/link';
import Image from 'next/image';
import Tag from '@/components/Tag';

export default function NaszaWplyw() {
    return (
        <main className="bg-(--main-accent) min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 md:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Nasz Wpływ</Tag>
                <p className="text-5xl/16 md:text-8xl/32 font-title mb-12">Zmiana jest zaraźliwa</p>
                <p className="text-lg md:text-xl mb-8">„Dzieciństwo Bez Smartfona” to nie kampania – to <b>zmiana kulturowa</b>, która zyskuje popularność na całym świecie.</p>
                <p className="text-lg md:text-xl mb-8">Rodziny stawiają opór, co zmienia charakter rozmów, a <b>presja</b>, by dać dzieciom smartfona, „bo wszyscy inni go mają”, <b>w końcu zaczyna ustępować</b>.</p>
                <p className="text-lg md:text-xl mb-8">Dzięki temu, dzieciństwo zaczyna się zmieniać, a <b>każdy dodatkowy rok dziecka bez smartfona to zwycięstwo</b>. Każdy niekupiony smartfon, każda usunięta aplikacja, każda szczera rozmowa – to wszystko jest ważne.</p>
                <p className="text-lg md:text-xl mb-12">Tak właśnie dokonuje się zmiana: <b>krok po kroku, rozmowa po rozmowie, rodzina po rodzinie</b>.</p>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                {/* Rodzice działają razem */}
                <div className="flex flex-col md:flex-row items-center justify-center w-full">
                    <div className="text-left order-2 md:order-1 w-full p-8 md:p-16">
                        <p className="text-3xl md:text-5xl/16 font-title pb-8">Rodzice działają razem</p>
                        <p className="text-sm md:text-lg font-sans pb-6">Rodzice opóźniają wręczenie smartfonów swoim dzieciom, dając im szansę na dorastanie we właściwym dla nich tempie. Właśnie w ten sposób można zmienić normy społeczne – nie za jednym zamachem, ale dzięki tysiącom rodzin sukcesywnie jednoczących się w podejmowaniu tego samego wyboru.</p>
                        <p className="text-sm md:text-lg font-sans">W Polsce dopiero rozpoczynamy, ale w Wielkiej Brytanii, gdzie “Dzieciństwo Bez Smartfona” się narodziło, statystyki wyglądają następująco:</p>
                    </div>
                    <div className="order-1 md:order-2 w-full p-16">
                        <Image
                            src="/images/rodzice-razem.jpg"
                            alt=""
                            width={500}
                            height={500}
                            className="rounded-3xl w-full h-auto"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
                {/* Statystyki */}
                <section className="flex flex-col w-full p-8 md:p-16 text-center text-3xl md:text-5xl/16 font-title">
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    <div className="w-full p-4">
                        <p>✍️ Ponad 160 000 podpisanych Paktów Rodzicielskich</p>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    <div className="w-full p-4">
                        <p>💬 Ponad 90 000 członków w sieci WhatsApp</p>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    <div className="w-full p-4">
                        <p>🧭 Ponad 200 zaangażowanych Liderów Regionalnych</p>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    <div className="w-full p-4">
                        <p>🌍 32 globalne oddziały Smartphone Free Childhood na sześciu kontynentach: od Nigerii po Holandię, od Argentyny po Australię</p>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                </section>
                {/* Świat się przygląda */}
                <div className="flex flex-col md:flex-row items-center justify-center w-full">
                    <div className="text-left order-2 md:order-2 w-full p-8 md:p-16">
                        <p className="text-3xl md:text-5xl/16 font-title pb-8">Świat się przygląda</p>
                        <p className="text-sm md:text-lg font-sans pb-6">Obecnie rodzice z ponad 30 krajów pracują nad rozwinięciem ruchu Smartphone Free Childhood. Zainteresowanie międzynarodowe szybko rośnie, a brytyjski ruch jest tematem artykułów, m.in., w „
                            <Link href="https://www.nytimes.com/2025/04/01/world/europe/smartphone-ban-schools-uk-childhood.html" className="hover:"><u>The New York Times</u></Link>” czy „
                            <Link href="https://www.theguardian.com/technology/2024/feb/17/thousands-join-uk-parents-calling-for-smartphone-free-childhood"><u>The Guardian</u></Link>”.
                        </p>
                        <p className="text-sm md:text-lg font-sans">Jest to problem istotny i dostrzegany już na świecie.</p>
                    </div>
                    <div className="order-1 md:order-1 w-full p-16">
                        <Image
                            src="/images/world-is-watching-2.jpg"
                            alt=""
                            width={500}
                            height={500}
                            className="rounded-3xl w-full h-auto"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </section>
            <section className="relative w-screen overflow-hidden">
                {/* Background Image */}
                <Image
                    src="/images/the-beginning.jpg"
                    alt=""
                    width={1168}
                    height={764}
                    className="absolute w-full h-full object-cover"
                    sizes="100vw, 50vw"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-white opacity-70"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-3/4 md:w-1/2 h-full mx-auto text-center text-(--foreground) px-4">
                    <p className="text-3xl md:text-5xl/16 font-title mt-16 mb-8">To dopiero początek</p>
                    <p className="text-sm md:text-lg font-bold mb-24">Widzimy rosnące zainteresowanie ze strony rodziców. Nasze wspólne zaangażowanie i determinacja mogą wiele zmienić. Ty też masz wpływ. Już wkrótce znajdziesz tutaj informacje, jak możesz pomóc.</p>
                </div>
            </section>
        </main>
    );
}
