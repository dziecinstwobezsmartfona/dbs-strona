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
                <p className="text-lg md:text-base xl:text-xl mb-8"><b>Dziękujemy za dołączenie do społeczności rodziców, którzy decydują się poczekać z wręczeniem dziecku smartfona co najmniej do 14. roku życia, a dostępu do mediów społecznościowych do 16. roku życia.</b></p>
                <p className="text-lg md:text-base xl:text-xl mb-8">Twój głos ma ogromną moc i pomaga zmieniać normy społeczne.</p>
                <p className="text-lg md:text-base xl:text-xl mb-24">Razem możemy wiele zmienić! ⚡⚡⚡</p>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-40 p-8">
                <p className="text-lg mb-4">Co dalej?</p>
                <p className="text-base mb-8">Możesz podzielić się informacją o Pakcie ze znajomymi lub sprawdzić nasze inne zasoby.</p>
                <Link href="/" className="bg-(--foreground) text-white px-6 py-2 rounded-3xl">Wróć do strony głównej</Link>
            </section>
        </main>
    );
}
