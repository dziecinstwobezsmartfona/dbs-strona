import Image from 'next/image';
import Tag from '@/components/Tag';

export default function NaszaMisja() {
    return (
        <main className="bg-(--purple) min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Nasza Misja</Tag>
                <p className="text-5xl/16 md:text-6xl/20 xl:text-8xl/32 font-title mb-12">Odzyskajmy dzieciństwo</p>
                <p className="text-lg md:text-lg xl:text-xl mb-8"><b>Smartfony fundamentalnie zmieniły dzieciństwo</b>. Na gorsze. Dzieci najpierw dostawały smartfony, bo <b>prawie nikt nie był świadomy</b> płynącego z nich zagrożenia, a teraz je dostają, ponieważ sprawy zaszły tak daleko, że <b>rodzice nie widzą innego wyjścia</b>.</p>
                <p className="text-lg md:text-lg xl:text-xl mb-8"><b>Właśnie dlatego istnieje ten ruch</b>. Nie po to, by osądzać czy stwarzać podziały, ale by <b>razem stawić czoło temu problemowi</b>, by wspólnie z innymi rodzicami zadać sobie pytanie:</p>
                <p className="text-lg md:text-lg xl:text-xl mb-8"><b><i>Może jednak coś da się z tym zrobić?</i></b></p>
                <p className="text-lg md:text-lg xl:text-xl mb-12">Samemu jest trudno, ale <b>razem możemy dać dzieciom lepszy start</b>.</p>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                <div className="flex flex-col lg:flex-row items-center justify-center w-full">
                    <div className="text-left order-2 lg:order-1 w-full p-8 lg:p-16">
                        <p className="text-3xl xl:text-5xl/16 font-title pb-8">Nowa rzeczywistość rodziców</p>
                        <p className="text-sm xl:text-lg font-sans pb-6">W niewiele ponad 15 lat smartfony całkowicie zmieniły oblicze dzieciństwa, a dowodów na to, że wyrządzają więcej szkód niż pożytku, nie można już ignorować. Obecnie nie ma żadnych formalnych wytycznych dotyczących tego, kiedy dzieci powinny otrzymać swój pierwszy smartfon, ani regulacji ograniczających korzystanie z tych urządzeń przez dzieci na terenie szkół.</p>
                        <p className="text-sm xl:text-lg font-sans">Powoduje to bezsilność rodziców wobec panujących realiów. Każdy rodzic, w trosce o swoje dziecko, staje samotnie do nierównej walki z najpotężniejszymi firmami technologicznymi na świecie, które wydają miliardy dolarów, by jak najdłużej przytrzymać dzieci przed ekranami.</p>
                    </div>
                    <div className="order-1 lg:order-2 w-full p-16">
                        <Image
                            src="/images/misja-1.jpg"
                            alt=""
                            width={500}
                            height={500}
                            className="rounded-3xl w-full h-auto"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center w-full">
                    <div className="text-left order-2 lg:order-2 w-full p-8 lg:p-16">
                        <p className="text-3xl xl:text-5xl/16 font-title pb-8">Wszyscy chcą zmiany</p>
                        <p className="text-sm xl:text-lg font-sans pb-2">👫 Rodzice, którzy dali swoim dzieciom smartfony, żałują, że nie poczekali</p>
                        <p className="text-sm xl:text-lg font-sans pb-2">🧑Nauczyciele twierdzą, że smartfony wpływają na naukę, przyjaźnie i koncentrację</p>
                        <p className="text-sm xl:text-lg font-sans pb-2">🏥 Lekarze łączą smartfony z kryzysem zdrowia psychicznego nastolatków</p>
                        <p className="text-sm xl:text-lg font-sans pb-6">📵 Młodzi ludzie chcieliby, żeby smartfon nie miał tak dużego wpływu na ich życie</p>
                        <p className="text-sm xl:text-lg font-sans"><b>To kto na tym korzysta? Firmy technologiczne</b>. Im więcej czasu dzieci spędzają na ich platformach, tym większy zysk te firmy osiągają, zupełnie nie przejmując się kosztem ponoszonym przez nasze dzieci.</p>
                    </div>
                    <div className="order-1 lg:order-1 w-full p-16">
                        <Image
                            src="/images/misja-2.jpg"
                            alt=""
                            width={500}
                            height={500}
                            className="rounded-3xl w-full h-auto"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center w-full">
                    <div className="text-left order-2 lg:order-1 w-full p-8 lg:p-16">
                        <p className="text-3xl xl:text-5xl/16 font-title pb-8">Niemożliwy wybór</p>
                        <p className="text-sm xl:text-lg font-sans pb-6">Kiedy większość dzieci ma smartfona z najaktualniejszymi aplikacjami, rezygnacja z niego wydaje się odsunięciem dziecka od rówieśników.</p>
                        <p className="text-sm xl:text-lg font-sans pb-2">Rodzice mają wrażenie, że stoją przed <b>niemożliwym wyborem</b>:</p>
                        <p className="text-sm xl:text-lg font-sans pb-2">☹️ Powiedzieć „<b>tak</b>" smartfonowi i <b>ryzykować zdrowie swojego dziecka</b></p>
                        <p className="text-sm xl:text-lg font-sans pb-6">☹️ Albo powiedzieć „<b>nie</b>" i <b>zaryzykować odcięcie dziecka od rówieśników</b></p>
                        <p className="text-sm xl:text-lg font-sans">To klasyczny przykład sytuacji, w której żadna decyzja nie wydaje się dobra. Sytuacji, przed którą żadna rodzina nie powinna była zostać postawiona samotnie.</p>
                    </div>
                    <div className="order-1 lg:order-2 w-full p-16">
                        <Image
                            src="/images/misja-3.jpg"
                            alt=""
                            width={500}
                            height={500}
                            className="rounded-3xl w-full h-auto"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center w-full">
                    <div className="text-left order-2 lg:order-2 w-full p-8 lg:p-16">
                        <p className="text-3xl xl:text-5xl/16 font-title pb-8">Rozwiązaniem tego dylematu jest działanie RAZEM</p>
                        <p className="text-sm xl:text-lg font-sans">W obliczu tego niemożliwego wyboru, rozwiązaniem jest <b>współpraca</b>. Zgadzając się <b>zbiorowo</b> na opóźnienie momentu wręczenia dzieciom smartfonów, możemy odwrócić bieg wydarzeń i odzyskać dzieciństwo z „rąk” gigantów technologicznych. Jeśli będziemy działać w grupie, zmiana jest nie tylko możliwa – jest <b>nieunikniona</b>.</p>
                    </div>
                    <div className="order-1 lg:order-1 w-full p-16">
                        <Image
                            src="/images/misja-4.jpg"
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
                    src="/images/misja-5.jpg"
                    alt=""
                    width={1168}
                    height={764}
                    className="absolute w-full h-full object-cover"
                    sizes="100vw, 50vw"
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black opacity-40"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-3/4 lg:w-1/2 h-full mx-auto text-center text-white px-4">
                    <p className="text-3xl xl:text-5xl/16 font-title mt-16 mb-8">Naszą misją jest zjednoczenie ludzi, aby wspólnie walczyć o zdrowsze i szczęśliwsze dzieciństwo</p>
                    <p className="text-sm xl:text-lg font-bold my-4">W programie „Dzieciństwo Bez Smartfona" nie chodzi o zakaz korzystania z technologii ani powrót do przeszłości – chodzi o danie dzieciom więcej tego, co naprawdę ważne: czasu na eksplorację świata, budowanie relacji z rówieśnikami i rodziną oraz zwyczajną dziecięcą beztroskę.</p>
                    <p className="text-sm xl:text-lg font-bold my-4">Pomagamy rodzinom wspólnie odłożyć smartfony i media społecznościowe – budując społeczność, dzieląc się wsparciem i pokazując, że jest inne wyjście. Krok po kroku. Cegiełka po cegiełce. Smartfon po smartfonie.</p>
                    <p className="text-sm xl:text-lg font-bold my-4">Bo prawdziwa zmiana nie przychodzi z góry. Zaczyna się tu - od nas wszystkich, od naszej wspólnej pracy.</p>
                    <p className="text-3xl xl:text-5xl/16 font-bold mt-4 mb-40"><b>Zjednoczeni dla dzieciństwa</b></p>
                </div>
            </section>
        </main>
    );
}
