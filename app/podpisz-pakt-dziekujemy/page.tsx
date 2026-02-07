import Link from 'next/link';
import Image from 'next/image';
import Tag from '@/components/Tag';

export default function PodpiszPaktDziekujemy() {
    return (
        <main className="bg-(--main-accent) min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Pakt</Tag>
                <p className="text-3xl md:text-4xl xl:text-6xl font-title">Dziękujemy</p>
                <p className="text-5xl/16 md:text-6xl/20 xl:text-8xl/32 font-title mb-12">ZA PODPISANIE PAKTU</p>
                <p className="text-lg md:text-base xl:text-xl mb-8"><b>Drogi Rodzicu, ta strona jest potwierdzeniem podpisania przez Ciebie Paktu Rodziców! Gratulujemy!</b></p>
            </header>
            <section className="flex flex-col bg-(--secondary-background) text-(--secondary-accent) rounded-3xl items-center justify-center w-3/4 mx-auto mb-40 p-8">
                <p className="text-lg mb-4">Co dalej?</p>
                <p className="text-lg md:text-base xl:text-xl mb-8">Początki mogą być trudne, dlatego przede wszystkim zachęcamy Cię do dołączenia do grupy Twojej szkoły w społeczności DBS na WhatsAppie. Bycie częścią grupy, która ma podobne podejście, może przynieść ogromne wsparcie.</p>
                <p className="text-lg md:text-base xl:text-xl mb-8">Tutaj znajdziesz grupę swojej szkoły na WhatsAppie:</p>
                <Link href="/" className="bg-(--foreground) text-white px-6 py-2 rounded-3xl mb-8">
                    <span className="text-lg lg:text-2xl font-title text-(--secondary-accent) text-center">Grupy Whatsapp dla szkół</span>
                </Link>
                <p className="text-lg md:text-base xl:text-xl mb-8">Grupa szkolna to miejsce, w którym wspólnie z innymi rodzicami, którzy mają dzieci w Twojej szkole, możecie rozmawiać, dzielić się pomysłami, planować wspólne działania oraz wspierać się nawzajem.</p>
            </section>
        </main>
    );
}
