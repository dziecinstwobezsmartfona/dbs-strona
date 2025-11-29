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
        <main className="bg-white min-h-screen flex flex-col items-center justify-top pt-45">
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
                                    <ImpactCard className="bg-(--main-accent) rounded-3xl text-(--foreground) p-8 min-h-[27rem] h-full" metric={s.metric} text={s.text} source={s.source} href={s.href} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
