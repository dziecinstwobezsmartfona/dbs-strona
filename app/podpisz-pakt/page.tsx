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
                <p className="text-lg md:text-base xl:text-xl mb-8">Pakt jest anonimowy (nigdy nie udostępnimy publicznie Twoich danych). Im więcej z nas podpisze, tym większą siłę będzie miał w zmienianiu normy społecznej w naszej społeczności.</p>
                <p className="text-lg md:text-base xl:text-xl mb-8">Dzięki podpisaniu Paktu będziemy mogli przedstawiać informacje na temat liczby rodziców, którzy podpisali Pakt w danej szkole, gminie, powiecie, aby ułatwić rodzicom myślącym podobnie odnalezienie się i dodawać im odwagi w podejmowaniu decyzji opóźnienia wręczenia smartfona swoim dzieciom.</p>
                <p className="text-lg md:text-base xl:text-xl mb-24">Twój wybór - i Twój głos - ma ogromną moc ⚡⚡⚡</p>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                <PactForm />
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
                <div className="relative z-10 flex flex-col items-center justify-center w-3/4 lg:w-1/2 h-full mx-auto text-center text-(--foreground) px-4">
                    <p className="text-3xl md:text-4xl xl:text-5xl/16 font-title mt-16 mb-8">To dopiero początek</p>
                    <p className="text-sm md:text-base xl:text-lg font-bold mb-24">Widzimy rosnące zainteresowanie ze strony rodziców. Nasze wspólne zaangażowanie i determinacja mogą wiele zmienić. Ty też masz wpływ. Już wkrótce znajdziesz tutaj informacje, jak możesz pomóc.</p>
                </div>
            </section>
        </main>
    );
}
