import Tag from '@/components/Tag';

export default function PolitykaPrywatnosci() {
    return (
        <main className="bg-(--main-accent) min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Polityka Prywatności</Tag>
                <p className="text-5xl/16 md:text-6xl/20 xl:text-8xl/32 font-title mb-12">Polityka Prywatności</p>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                <div className="text-left w-full p-8 lg:p-16">
                    <h1 className="text-2xl xl:text-3xl font-title pb-6">Polityka Prywatności</h1>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Fundacja „Dzieciństwo Bez Smartfona” (dalej Fundacja) jest organizacją pozarządową działającą na rzecz ochrony dzieci i młodzieży przed nadmiernym korzystaniem z urządzeń ekranowych (smartfonów, tabletów, komputerów) oraz promowania zdrowego dzieciństwa.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Realizując naszą misję zbieramy i przetwarzamy dane osobowe rodziców / opiekunów prawnych podpisujących Pakt Rodziców, oraz osób zapisujących się na newsletter, a także uczestników naszych wydarzeń, darczyńców, współpracowników i wolontariuszy.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Poniżej znaleźć można nasze zasady przetwarzania danych osobowych.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">RODO</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Od 25 maja 2018 r. obowiązuje Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (określane popularnie jako „RODO”).
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        RODO obowiązywać będzie w identycznym zakresie we wszystkich krajach Unii Europejskiej, a więc także w Polsce i wprowadza szereg zmian w zasadach regulujących przetwarzanie danych osobowych, które będą miały wpływ na działalność mi. in. organizacji i stowarzyszeń, w tym naszej Fundacji. Poza RODO w polskim porządku prawnym obowiązuje też ustawa z dnia 10 maja 2018 r. o ochronie danych osobowych (t.j. Dz. U. z 2019 r. poz. 1781), która doprecyzowuje niektóre z zasad ochrony danych osobowych.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Poniżej przedstawiamy najważniejsze informacje dotyczące przetwarzania danych osobowych w związku z działaniami Fundacji „Dzieciństwo Bez Smartfona”.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Czym są dane osobowe?</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Zgodnie z RODO dane osobowe to informacje o zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej („osobie, której dane dotyczą”). Mogą to być np.: imię i nazwisko, adres e-mail, numer telefonu, adres zamieszkania, wizerunek (w przypadku zdjęć z wydarzeń).
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Administrator danych</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Administratorem danych osobowych jest:
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Fundacja „Dzieciństwo Bez Smartfona”<br />
                        Aleje Jerozolimskie 109/70, 02-011 Warszawa
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Podstawa i cel przetwarzania danych osobowych</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Przetwarzanie danych osobowych musi mieć zawsze podstawę prawną. W działalności Fundacji występują przede wszystkim następujące podstawy:
                    </p>
                    <ul className="text-sm xl:text-lg font-sans pb-6 list-disc list-inside">
                        <li><strong>Dobrowolna zgoda</strong> – dotyczy przede wszystkim zapisania się na newsletter (otrzymywania informacji o kampaniach, webinarach, materiałach edukacyjnych) oraz podpisania <strong>Paktu Rodziców</strong> (w którym podajesz swoje dane w celu dołączenia do społeczności i otrzymywania wsparcia);</li>
                        <li><strong>Niezbędność przetwarzania do celów wynikających z prawnie uzasadnionych interesów administratora</strong> – dotyczy ona realizacji celów regulaminowych Fundacji, w tym: prowadzenia kampanii społecznych, działalności edukacyjnej, budowania społeczności świadomych rodziców, informowania o wydarzeniach i akcjach, kontaktu w sprawach Paktu Rodziców, analizy zasięgu działań;</li>
                        <li><strong>Niezbędność do wykonania umów</strong> – w przypadku ewentualnych umów darowizny, współpracy wolontariackiej lub umów z wykonawcami;</li>
                        <li><strong>Prawne zobowiązania</strong> – w naszym przypadku jest to np.: przekazanie materiałów na żądanie uprawnionego organu np.: sądu.</li>
                    </ul>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Zasady przetwarzania danych osobowych</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Dane osobowe w Fundacji przetwarzane będą wyłącznie w przypadku posiadania przez Fundację jednej z dopuszczonych przez RODO podstaw prawnych i wyłącznie w celu dostosowanym do danej podstawy, zgodnie z opisem powyżej. Dane osobowe przetwarzane będą do czasu istnienia podstawy do ich przetwarzania – czyli w przypadku udzielenia zgody do momentu jej cofnięcia, ograniczenia lub innych działań ze strony właściciela danych ograniczających tę zgodę, w przypadku niezbędności do wykonania umowy – przez czas jej wykonywania, a w przypadku, gdy podstawą przetwarzania danych jest uzasadniony interes administratora – do czasu istnienia tego uzasadnionego interesu.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Po wskazanym w w/w punkcie okresie czasu dane osobowe podlegają usunięciu z baz elektronicznych Fundacji lub zniszczeniu jeśli są w formie papierowej.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Odbiorcy danych osobowych</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Dane osobowe mogą być przekazywane jedynie w niezbędnym zakresie:
                    </p>
                    <ul className="text-sm xl:text-lg font-sans pb-6 list-disc list-inside">
                        <li>podmiotom świadczącym dla nas usługi techniczne (hosting, poczta e-mail, narzędzie do newsletterów typu MailerLite / Mailchimp / FreshMail itp.) – na podstawie umowy powierzenia przetwarzania</li>
                        <li>instytucjom publicznym uprawnionym do otrzymania danych na podstawie prawa (np. US, sąd, policja)</li>
                    </ul>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Prawa właściciela danych osobowych</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Właścicielowi danych osobowych przysługują następujące uprawnienia (w odniesieniu do danych dziecka wykonuje je rodzic/opiekun prawny):
                    </p>
                    <ul className="text-sm xl:text-lg font-sans pb-6 list-disc list-inside">
                        <li>prawo dostępu do danych</li>
                        <li>prawo sprostowania danych</li>
                        <li>prawo usunięcia danych („bycie zapomnianym”)</li>
                        <li>prawo ograniczenia przetwarzania</li>
                        <li>prawo wniesienia sprzeciwu wobec przetwarzania (szczególnie w przypadku uzasadnionego interesu)</li>
                        <li>prawo cofnięcia zgody w dowolnym momencie (nie wpływa na zgodność z prawem wcześniejszego przetwarzania)</li>
                        <li>prawo przenoszenia danych (gdy przetwarzamy je na podstawie zgody lub umowy w sposób automatyczny)</li>
                        <li>prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych</li>
                    </ul>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Dane kontaktowe</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        W sprawach związanych z ochroną danych osobowych prosimy o kontakt drogą emailową na adres: kontakt@dziecinstwobezsmartfona.pl.
                    </p>
                </div>
            </section>
        </main>
    );
}
