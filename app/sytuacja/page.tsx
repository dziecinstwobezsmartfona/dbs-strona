"use client";

import Link from 'next/link';
import Image from 'next/image';
import Tag from '@/components/Tag';
import ImpactCard from '@/components/ImpactCard';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';

export default function NaszWplyw() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onResize = () => emblaApi.reInit();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [emblaApi]);

    const stats = [
        {
            metric: '89 %',
            text: 'dzieci w wieku 7-14 lat spędza na smartfonie średnio 4 godziny i 8 minut dziennie',
            source: 'Raport "Internet Dzieci", Marzec 2025',
            href: 'https://pkdp.gov.pl/wp-content/uploads/2025/03/INTERNET_DZIECI_RAPORT.pdf'
        },
        {
            metric: '58 %',
            text: 'dzieci w wieku 7-12 lat korzysta z mediów społecznościowych i komunikatorów dozwolonych od 13 lat',
            source: 'Raport "Internet Dzieci", Marzec 2025',
            href: 'https://pkdp.gov.pl/wp-content/uploads/2025/03/INTERNET_DZIECI_RAPORT.pdf'
        },
        {
            metric: '25 %',
            text: 'dzieci w wieku 7-14 lat posiada konto w 5-8 serwisach społecznościowych',
            source: 'Raport "Internet Dzieci", Marzec 2025',
            href: 'https://pkdp.gov.pl/wp-content/uploads/2025/03/INTERNET_DZIECI_RAPORT.pdf'
        },
        {
            metric: '40 %',
            text: 'dzieci w wieku 9-10 lat posiada własny smartfon',
            source: 'Raport: Nastolatki 2025, NASK',
            href: 'https://www.nask.pl/media/2025/09/Nastolatki_RAPORT-2.pdf'
        }
    ];

    return (
        <main className="bg-(--main-accent) min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 md:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Sytuacja</Tag>
                <p className="text-5xl/16 md:text-8xl/32 font-title mb-12">Smartfony zmieniły dzieciństwo</p>
                <p className="text-lg md:text-xl mb-8 font-bold">Smartfony to nie zabawki i wcale nie powstały z myślą o dzieciach, a jednak w ekspresowym tempie wywróciły ich świat do góry nogami.</p>
                <p className="text-lg md:text-xl">Oto dane z najnowszych raportów dotyczących Polski, opublikowanych w 2025 roku:</p>
            </header>
            {/* Carousel: replace unordered list with horizontally scrollable cards using Embla */}
            <section className="w-full py-8">
                <div className="flex items-center justify-center mb-4 px-6">
                    <div className="flex gap-3">
                        <button onClick={scrollPrev} aria-label="Previous" className="w-10 h-10 rounded-full bg-emerald-900 text-emerald-100 flex items-center justify-center">◀</button>
                        <button onClick={scrollNext} aria-label="Next" className="w-10 h-10 rounded-full bg-emerald-900 text-emerald-100 flex items-center justify-center">▶</button>
                    </div>
                </div>
                <div className="embla">
                    <div className="embla__viewport overflow-hidden" ref={emblaRef}>
                        <div className="embla__container flex">
                            {stats.map((s, idx) => (
                                <div key={idx} className="embla__slide flex-none w-[80vw] md:w-[50vw] min-w-[27rem] min-h-[27rem] px-4">
                                    <ImpactCard className="bg-(--background) rounded-3xl text-(--foreground) p-8 min-h-[27rem] h-full" metric={s.metric} text={s.text} source={s.source} href={s.href} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-3/4 md:w-1/2 mx-auto text-center mt-24">
                <p className="text-lg md:text-xl mb-8 font-bold">Zamiast dorastać w odpowiednim tempie, dzieci są zbyt szybko wciągane w świat wirtualny, który jest zaprojektowany tak, aby nie mogły się już z niego wydostać.</p>
                <p className="text-lg md:text-xl mb-8">Ma to ogromny wpływ na ich rozwój, psychikę i relacje z innymi. Nie możemy już dłużej udawać, że problem nie istnieje.</p>
                <p className="text-lg md:text-xl mb-8 font-bold">Oto niektóre z najważniejszych czynników:</p>
            </section>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-36">
                <div className="flex flex-col w-full md:p-16 text-center text-3xl md:text-5xl/16 font-title">
                    {/* Coś za coś */}
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-3/4 mx-auto">
                        <div className="text-left order-2 md:order-2 w-full p-8 md:p-16">
                            <p className="text-3xl md:text-5xl/16 font-title pb-4 md:pb-8">Coś za coś</p>
                            <p className="text-sm md:text-lg font-sans">Dzieci dorastające w erze smartfonów spędzają mniej czasu na zewnątrz, mniej się bawią, mniej czytają, mniej się ruszają – a zdecydowanie więcej przewijają ekran, często w samotności.</p>
                        </div>
                        <div className="order-1 md:order-1 w-full p-8 md:p-16 mx-auto">
                            <Image
                                src="/images/opportunity-costs.jpg"
                                alt=""
                                width={200}
                                height={200}
                                className="rounded-3xl w-[80%] h-auto mx-auto"
                                sizes="(max-width: 200px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    {/* Szkodliwe treści */}
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-3/4 mx-auto">
                        <div className="text-left order-2 md:order-2 w-full p-8 md:p-16">
                            <p className="text-3xl md:text-5xl/16 font-title pb-4 md:pb-8">Szkodliwe treści</p>
                            <p className="text-sm md:text-lg font-sans">Dzieci korzystające ze smartfonów mogą w każdej chwili natrafić na nieodpowiednie dla siebie treści podsunięte przez algorytmy. To, co dziecko zobaczy w Internecie zostaje w jego głowie na zawsze.</p>
                        </div>
                        <div className="order-1 md:order-1 w-full p-8 md:p-16 mx-auto">
                            <Image
                                src="/images/harmful-content.webp"
                                alt=""
                                width={200}
                                height={200}
                                className="rounded-3xl w-[80%] h-auto mx-auto"
                                sizes="(max-width: 200px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    {/* Zdrowie psychiczne */}
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-3/4 mx-auto">
                        <div className="text-left order-2 md:order-2 w-full p-8 md:p-16">
                            <p className="text-3xl md:text-5xl/16 font-title pb-4 md:pb-8">Zdrowie psychiczne</p>
                            <p className="text-sm md:text-lg font-sans">Coraz więcej badań wskazuje na wyraźny związek między wczesnym posiadaniem smartfona a pogorszeniem zdrowia psychicznego. Od 2010 roku, czyli od czasu, gdy smartfony zaczęły trafiać do rąk dzieci, liczba nastolatków cierpiących na lęki, depresję czy mających problem z samookaleczeniem mocno wzrosła.</p>
                        </div>
                        <div className="order-1 md:order-1 w-full p-8 md:p-16 mx-auto">
                            <Image
                                src="/images/mental-health.jpg"
                                alt=""
                                width={200}
                                height={200}
                                className="rounded-3xl w-[80%] h-auto mx-auto"
                                sizes="(max-width: 200px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    {/* Uzależnienie */}
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-3/4 mx-auto">
                        <div className="text-left order-2 md:order-2 w-full p-8 md:p-16">
                            <p className="text-3xl md:text-5xl/16 font-title pb-4 md:pb-8">Uzależnienie</p>
                            <p className="text-sm md:text-lg font-sans">Model biznesowy firm technologicznych jest prosty: im dłużej dzieci korzystają z aplikacji, tym większy zysk dla tych firm. Nic dziwnego, że aplikacje są projektowane tak, by trudno było się od nich oderwać. Dzieci przywiązują się do nich błyskawicznie.</p>
                        </div>
                        <div className="order-1 md:order-1 w-full p-8 md:p-16 mx-auto">
                            <Image
                                src="/images/addiction.jpg"
                                alt=""
                                width={200}
                                height={200}
                                className="rounded-3xl w-[80%] h-auto mx-auto"
                                sizes="(max-width: 200px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    {/* Uwaga i skupienie */}
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-3/4 mx-auto">
                        <div className="text-left order-2 md:order-2 w-full p-8 md:p-16">
                            <p className="text-3xl md:text-5xl/16 font-title pb-4 md:pb-8">Uwaga i skupienie</p>
                            <p className="text-sm md:text-lg font-sans">Pojawiające się bardzo często powiadomienia, przyciągają uwagę dzieci i uniemożliwiają skoncentrowanie się na  lekcjach, pasjach czy rozmowach z przyjaciółmi. W dzisiejszym świecie nikogo nie dziwi już to, że młodzi ludzie mają dużą trudność w skupieniu uwagi.</p>
                        </div>
                        <div className="order-1 md:order-1 w-full p-8 md:p-16 mx-auto">
                            <Image
                                src="/images/attention.webp"
                                alt=""
                                width={200}
                                height={200}
                                className="rounded-3xl w-[80%] h-auto mx-auto"
                                sizes="(max-width: 200px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    {/* Rodzina */}
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-3/4 mx-auto">
                        <div className="text-left order-2 md:order-2 w-full p-8 md:p-16">
                            <p className="text-3xl md:text-5xl/16 font-title pb-4 md:pb-8">Rodzina</p>
                            <p className="text-sm md:text-lg font-sans">Smartfony wkradły się do naszych domów i zawładnęły tym, jak żyjemy. Codziennie powodują napięcie między domownikami - pojawiają się kłótnie, negocjacje o czas przed ekranem, a wspólne spędzanie czasu bez ciągłego zerkania na telefon staje się coraz trudniejsze. Czas spędzany wspólnie jako rodzina staje się dla dzieci nieatrakcyjny.</p>
                        </div>
                        <div className="order-1 md:order-1 w-full p-8 md:p-16 mx-auto">
                            <Image
                                src="/images/family-life.webp"
                                alt=""
                                width={200}
                                height={200}
                                className="rounded-3xl w-[80%] h-auto mx-auto"
                                sizes="(max-width: 200px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    {/* Cyberprzemoc */}
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-3/4 mx-auto">
                        <div className="text-left order-2 md:order-2 w-full p-8 md:p-16">
                            <p className="text-3xl md:text-5xl/16 font-title pb-4 md:pb-8">Cyberprzemoc</p>
                            <p className="text-sm md:text-lg font-sans">Kiedyś konflikty między rówieśnikami kończyły się wraz “z ostatnim dzwonkiem”. Dziś podążają za dziećmi do domu, świecą na ekranach przez całą dobę i nie dają wytchnienia. Dom przestaje być bezpiecznym miejscem, w którym można ochłonąć i odciąć się od napięć.</p>
                        </div>
                        <div className="order-1 md:order-1 w-full p-8 md:p-16 mx-auto">
                            <Image
                                src="/images/cyberprzemoc.png"
                                alt=""
                                width={200}
                                height={200}
                                className="rounded-3xl w-[80%] h-auto mx-auto"
                                sizes="(max-width: 200px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    {/* Sen */}
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-3/4 mx-auto">
                        <div className="text-left order-2 md:order-2 w-full p-8 md:p-16">
                            <p className="text-3xl md:text-5xl/16 font-title pb-4 md:pb-8">Sen</p>
                            <p className="text-sm md:text-lg font-sans">Niebieskie światło emitowane przez ekrany hamuje wydzielanie melatoniny i w konsekwencji utrudnia zasypianie. Dodatkowo emocje wynikające z niekończącego się przewijania i wyskakujących na ekranie powiadomień nie pozwalają dzieciom się wyciszyć i zasnąć spokojnie.</p>
                        </div>
                        <div className="order-1 md:order-1 w-full p-8 md:p-16 mx-auto">
                            <Image
                                src="/images/sleep.webp"
                                alt=""
                                width={200}
                                height={200}
                                className="rounded-3xl w-[80%] h-auto mx-auto"
                                sizes="(max-width: 200px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    {/* Grooming, czyli „uwodzenie” */}
                    <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-3/4 mx-auto">
                        <div className="text-left order-2 md:order-2 w-full p-8 md:p-16">
                            <p className="text-3xl md:text-5xl/16 font-title pb-4 md:pb-8">Grooming, czyli „uwodzenie”</p>
                            <p className="text-sm md:text-lg font-sans">TikTok, Snapchat czy Roblox, przez wielu uznawane za niegroźne platformy pozwalające dzieciom fajnie spędzić czas, to również miejsca, do których logują się osoby o złych zamiarach. Dzieci, które dopiero uczą się poruszać w cyfrowym świecie, są dla nich łatwym celem.</p>
                        </div>
                        <div className="order-1 md:order-1 w-full p-8 md:p-16 mx-auto">
                            <Image
                                src="/images/grooming.webp"
                                alt=""
                                width={200}
                                height={200}
                                className="rounded-3xl w-[80%] h-auto mx-auto"
                                sizes="(max-width: 200px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
