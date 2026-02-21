import Link from 'next/link';
import Image from 'next/image';
import Tag from '@/components/Tag';
import PactForm from '@/components/PactForm';

export default function PodpiszPakt() {
    return (
        <main className="bg-(--main-accent) min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Pakt</Tag>
                <p className="text-3xl md:text-4xl xl:text-6xl font-title">Podpisz</p>
                <p className="text-5xl/16 md:text-6xl/20 xl:text-8xl/32 font-title mb-12">PAKT RODZICÓW</p>
                <p className="text-lg md:text-base xl:text-xl mb-8"><b>Podpisując ten Pakt, dołączasz do rosnącej społeczności rodziców, którzy decydują się poczekać z wręczeniem dziecku smartfona co najmniej do 14. roku życia, a dostępu do mediów społecznościowych do 16. roku życia.</b></p>
                <p className="text-lg md:text-base xl:text-xl mb-8">Podpisanie Paktu nie jest jawne (nigdy nie udostępnimy publicznie żadnych Twoich danych bez Twojej zgody).</p>
                <p className="text-lg md:text-base xl:text-xl mb-8">Dzięki podpisaniu Paktu będziemy mogli przedstawiać informacje na temat liczby rodziców, którzy podpisali Pakt w danej szkole, gminie, powiecie, aby ułatwić rodzicom myślącym podobnie odnalezienie się i dodawać im odwagi w podejmowaniu decyzji opóźnienia wręczenia smartfona swoim dzieciom. Im więcej z nas podpisze Pakt, tym większą będzie miał siłę w zmienianiu normy społecznej w naszej społeczności.</p>
                <p className="text-lg md:text-base xl:text-xl mb-8"><b>Twój głos ma ogromną moc</b>⚡⚡⚡</p>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-40 p-8">
                <PactForm />
                <p className="text-sm md:text-lg my-8">Masz jakieś pytanie? Zajrzyj do <Link href="https://drive.google.com/file/d/1PrCJM6r59RLLpfud7lGpMLLuNJyuOl_t/view?usp=sharing"><b><u>odpowiedzi na najczęściej zadawane pytania (FAQ</u>)</b>.</Link></p>
            </section>
        </main>
    );
}
