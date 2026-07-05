import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/Tag';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export default async function DolaczDoSpolecznosci() {
    const payload = await getPayload({ config: configPromise });
    const schoolsResult = await payload.find({
        collection: 'schools',
        limit: 0,
        sort: 'school_full_name',
        where: { whatsapp_link: { exists: true } },
    });

    const schoolsWithGroup = schoolsResult.docs.filter(s => s.whatsapp_link);

    return (
        <main className="bg-linear-to-b from-[#C2D3FF] to-white to-15% min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 md:w-1/2 mx-auto items-center justify-center text-center mb-16">
                <Tag className="bg-black/10 text-foreground mb-12">Społeczność</Tag>
                <p className="text-5xl/16 md:text-8xl/32 font-title mb-12">Dołącz do społeczności DBS na&nbsp;WhatsApp</p>
                <p className="text-lg md:text-xl font-bold">Połącz się z rodzicami w Twojej szkole i w całej Polsce.</p>
            </header>

            {/* Intro section */}
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                <div className="flex flex-col lg:flex-row items-center justify-center w-full">
                    <div className="text-left order-2 lg:order-1 w-full p-8 lg:p-16">
                        <p className="text-3xl xl:text-5xl/16 font-title pb-8">Razem jesteśmy silniejsi</p>
                        <p className="text-sm xl:text-lg font-sans pb-4">Nasza Społeczność na WhatsApp to najlepszy sposób na połączenie się z innymi rodzicami myślącymi podobnie. Jest ona miejscem do dzielenia się pomysłami, zadawania pytań i dowiadywania się, jakie kroki podejmują inni, aby utrzymać dzieciństwo wolne od smartfonów.</p>
                        <p className="text-sm xl:text-lg font-sans pb-8">Dołącz do ogólnopolskiej grupy DBS, gdzie setki rodziców każdego dnia wspierają się nawzajem w budowaniu zdrowszego dzieciństwa dla naszych dzieci.</p>
                        <Link
                            href="https://chat.whatsapp.com/H94Rw9uG0cjFCEIgAeTyqj"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex justify-center items-center bg-(--main-accent) rounded-3xl px-8 py-4 hover:bg-(--secondary-accent) transition-colors"
                        >
                            <span className="text-lg lg:text-2xl font-title text-(--foreground)">Dołącz do Ogólnopolskiej Społeczności DBS</span>
                        </Link>
                    </div>
                    <div className="order-1 lg:order-2 w-full p-8 lg:p-16">
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
            </section>

            {/* Schools section */}
            <section className="flex flex-col bg-(--background) rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                <div className="flex flex-col w-full p-8 md:p-16">
                    <p className="text-3xl md:text-5xl/16 font-title mb-4 text-center">Znajdź swoją szkołę</p>
                    <p className="text-base md:text-lg font-sans mb-12 text-center">
                        Poniżej znajdziesz listę szkół, które mają już swoją grupę w społeczności DBS na Whatsapp. Dołącz do grupy swojej szkoły i działaj razem z innymi rodzicami!
                    </p>

                    {schoolsWithGroup.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full mb-4">
                            {schoolsWithGroup.map(school => (
                                <Link
                                    key={school.id}
                                    href={school.whatsapp_link!}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="flex flex-row bg-(--main-accent) rounded-3xl p-6 transition-transform hover:scale-[1.05] hover:bg-foreground hover:text-background">
                                        <div className="block w-[50px]">
                                            <WhatsAppIcon width={30} height={30}/>
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <p className="text-xl font-title mb-1">{school.school_full_name}</p>
                                            {school.number_of_members ? (
                                                <p className="text-sm font-sans text-gray-400 mb-4">Liczba członków: {school.number_of_members}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-base md:text-lg font-sans mb-12 text-gray-500">Żadna szkoła nie ma jeszcze grupy WhatsApp. Bądź pierwszy i utwórz grupę dla swojej szkoły!</p>
                    )}

                </div>
            </section>

            {/* CTA - Become Coordinator */}
            <section className="flex flex-col lg:flex-row bg-white rounded-3xl items-center lg:items-start justify-between w-3/4 mx-auto mb-32">
                <div className="flex flex-col text-left order-2 lg:order-1 w-full p-8 lg:p-16">
                    <p className="text-3xl md:text-5xl/16 font-title pb-8">Nie widzisz grupy swojej szkoły? Załóż ją!</p>
                    <p className="text-base md:text-lg font-sans pb-4">Jeśli Twoja szkoła nie ma jeszcze grupy WhatsApp w społeczności DBS, możesz ją założyć! Koordynator Szkolny to osoba, która robi pierwszy krok i łączy rodziców wokół wspólnego celu – dzieciństwa bez smartfonów.</p>
                    <p className="text-base md:text-lg font-sans pb-8">To prostsze niż myślisz – wystarczy chęć działania, a my pomożemy Ci na każdym kroku.</p>
                    <Link
                        href="/zostan-koordynatorem-szkolnym"
                        className="inline-flex justify-center text-center bg-(--secondary-accent) rounded-3xl px-8 py-4 hover:bg-(--background) transition-colors"
                    >
                        <span className="text-lg lg:text-2xl font-title text-(--foreground)">Jak zostać Koordynatorem Szkolnym?</span>
                    </Link>
                </div>
                <div className="order-1 lg:order-2 w-full mb-12 lg:mb-0 lg:w-1/2 p-8 lg:p-16">
                    <Image
                        src="/api/media/file/Koordynator%20Szkolny%20(zębatka)%20png"
                        alt=""
                        width={500}
                        height={500}
                        className="rounded-3xl w-full h-auto"
                        sizes="(max-width: 500px) 100vw, 50vw"
                    />
                </div>
            </section>
        </main>
    );
}
