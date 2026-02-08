import Tag from '@/components/Tag';

export default function RegulaminNewslettera() {
    return (
        <main className="bg-(--main-accent) min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Regulamin Newslettera</Tag>
                <p className="text-5xl/16 md:text-6xl/20 xl:text-8xl/32 font-title mb-12">Regulamin Newslettera</p>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                <div className="text-left w-full p-8 lg:p-16">
                    <h1 className="text-2xl xl:text-3xl font-title pb-6">Regulamin newslettera Stowarzyszenia "Dzieciństwo Bez Smartfona"</h1>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Regulamin newslettera Stowarzyszenia "Dzieciństwo Bez Smartfona", zwany dalej „Regulaminem" określa prawa i obowiązki stron usługi świadczonej elektronicznie za pośrednictwem serwisu pod adresem https://dziecinstwobezsmartfona.pl.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">§ 1. Definicje</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        W Regulaminie poszczególne pojęcia otrzymują wskazane poniżej znaczenia:
                    </p>
                    <ul className="text-sm xl:text-lg font-sans pb-6 list-disc list-inside">
                        <li><strong>Stowarzyszenie</strong> - Stowarzyszenie "Dzieciństwo Bez Smartfona" z siedzibą w Warszawie, Aleje Jerozolimskie 109/70, 02-011 Warszawa</li>
                        <li><strong>Link Aktywacyjny</strong> - adres strony WWW w formacie URL, przez użycie którego Użytkownik kończy proces zawierania Umowy Newslettera;</li>
                        <li><strong>Newsletter</strong> - wiadomość przekazywana przez Stowarzyszenie pocztą elektroniczną, zawierająca informacje o działalności Stowarzyszenia, realizowanych, organizowanych i współorganizowanych przez nią akcjach, kampaniach społecznych i wydarzeniach, oraz o funkcjonalnościach Serwisu, a także zawierając informacje marketingowe;</li>
                        <li><strong>Umowa Newslettera</strong> - zobowiązanie, którego przedmiotem jest nieodpłatne świadczenie przez Stowarzyszenie na rzecz Użytkownika, usługi polegającej na przesyłaniu newslettera na adres e-mailowy wskazany przez Użytkownika;</li>
                        <li><strong>Użytkownik</strong> – osoba korzystająca z Serwisu;</li>
                        <li><strong>Serwis</strong> – strona internetowa https://dziecinstwobezsmartfona.pl</li>
                    </ul>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">§ 2. Zawieranie i rozwiązywanie umowy</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Zawarcie Umowy Newslettera następuje poprzez:
                    </p>
                    <ul className="text-sm xl:text-lg font-sans pb-6 list-disc list-inside">
                        <li>zaakceptowanie Regulaminu;</li>
                        <li>wprowadzenie przez Użytkownika adresu poczty elektronicznej w okienku "Dołącz do naszego newslettera", na który ma być dostarczany Newsletter i kliknięcie w przycisk znajdujący się przy wprowadzonym adresie e-mail;</li>
                        <li>spełnianie warunków technicznych koniecznych do korzystania z Newslettera;</li>
                        <li>kliknięcie w Link Aktywacyjny przesłany przez Stowarzyszenie, na adres wprowadzony w sposób wskazany w lit. b) powyżej.</li>
                    </ul>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Użytkownik może rozwiązać Umowę Newslettera w każdej chwili poprzez:
                    </p>
                    <ul className="text-sm xl:text-lg font-sans pb-6 list-disc list-inside">
                        <li>kliknięcie linka „Rezygnacja z Newslettera" podanego w każdej wiadomości Newslettera,</li>
                        <li>wysłanie na adres poczty elektronicznej kontakt@dziecinstwobezsmartfona.pl oświadczenia o rezygnacji z Newslettera.</li>
                    </ul>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Żądanie przez Użytkownika rozwiązania Umowy Newslettera będzie skuteczne, gdy zostanie skierowane z adresu poczty elektronicznej, na który wysyłany jest Newsletter.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Stowarzyszenie może rozwiązać Umowę Newslettera w każdej chwili poprzez przesłanie oświadczenia o rozwiązaniu umowy na adres poczty elektronicznej, na który jest wysyłany Newsletter.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Stowarzyszenie każdorazowo po rozwiązaniu Umowy Newslettera usunie dane osobowe Użytkownika.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">§ 3. Przedmiot Umowy Newslettera</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Na podstawie zawartej Umowy Newslettera, Stowarzyszenie będzie przesyłać Użytkownikowi cyklicznie następujące informacje: treści dotyczące działalności Stowarzyszenia, organizowanych i współorganizowanych akcji, kampanii społecznych i wydarzeń, funkcjonalności serwisu, a także treści o charakterze marketingowym i handlowym oraz związane ze wsparciem finansowym Stowarzyszenia.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Umowa Newslettera jest nieodpłatna.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Użytkownik zapisując się do Newslettera wyraża zgodę na otrzymywanie drogą elektroniczną od Fundacji marketingu bezpośredniego oraz informacji handlowej w rozumieniu ustawy z dnia 16 lipca 2004 r. Prawo telekomunikacyjne.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">§ 4. Zasady korzystania z Newslettera</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        W celu prawidłowego działania Newslettera konieczny jest dostęp do systemu informatycznego, który umożliwia korzystanie z sieci Internet, posiadanie elektronicznej skrzynki pocztowej, dającej możliwość wysyłania i odbierania wiadomości elektronicznych.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">§ 5. Postępowanie reklamacyjne</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Wszelkie wadliwe działanie Newslettera należy zgłaszać na adres: kontakt@dziecinstwobezsmartfona.pl
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Zgłoszona reklamacja zostanie rozpatrzona w terminie 30 dni od daty jej złożenia.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">§ 6. Ochrona danych osobowych</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Administratorem danych osobowych Użytkownika jest Stowarzyszenie.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        W sprawach dotyczących ochrony danych osobowych prosimy o kontakt pod adresem e-mail: kontakt@dziecinstwobezsmartfona.pl.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Przekazane przez Użytkownika dane osobowe będą przetwarzane w celu prawidłowej realizacji Umowy Newslettera, tj. na podstawie art. 6 ust. 1 lit. b RODO. Dane osobowe mogą być przetwarzane również na podstawie art. 6 ust. 1 lit. f RODO, gdy niezbędność przetwarzania wynika z prawnie uzasadnionych interesów realizowanych przez administratora, co obejmuje realizację celów Stowarzyszenia takich, jak np.: propagowanie w społeczeństwie naszej misji, jaką jest zapewnienie każdemu dziecka szczęśliwego dzieciństwa, wolnego od negatywnego wpływu smartfonów.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Odbiorcą danych osobowych Użytkownika będą podmioty współpracujące z Administratorem, które pomagają Administratorowi wykonywać umowę (kontrahenci z branży IT, podmioty świadczące usługi marketingowe).
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Dane Użytkownika będą przetwarzane do czasu rozwiązania Umowy.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Użytkownik ma następujące prawa związane z ochroną jego danych osobowych: prawo dostępu do treści danych, prawo do sprostowania danych, prawo do usunięcia danych, prawo do ograniczenia przetwarzania danych, prawo do przenoszenia danych, prawo do wniesienia sprzeciwu, prawo do wniesienia skargi do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych) w przypadku uznania, że przetwarzanie danych osobowych narusza przepisy Ogólnego rozporządzenia o ochronie danych.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Podanie danych osobowych jest wymogiem umownym, ich podanie jest dobrowolne i konieczne do zawarcia i realizacji Umowy Newslettera.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Dane Użytkownika nie będą podlegały profilowaniu.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">§ 7. Tryb zmiany Regulaminu</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Regulamin wchodzi w życie z dniem ogłoszenia w Serwisie.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Stowarzyszenie ma prawo do jednostronnej zmiany postanowień Regulaminu, w szczególności z ważnych powodów, np. z powodu zmian technologicznych, zmian przepisów prawa.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        W przypadku dokonania zmian w Regulaminie, Stowarzyszenie poinformuje o tym Użytkowników w formie wiadomości elektronicznej wysłanej na adres podany przez Użytkownika. Użytkownik może nie wyrazić zgody na zmiany w Regulaminie rozwiązując umowę newslettera.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">§8. Prawo i sąd właściwy</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Wszelkie spory będą rozstrzygane przez właściwe miejscowo polskie sądy powszechne.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        W zakresie nieuregulowanym w Regulaminie zastosowanie znajdują polskie powszechnie obowiązujące przepisy prawa, w tym o prawach konsumenta z dnia 30 maja 2014 r. (Dz.U. z 2019 r. poz. 134 z późn. zm.) oraz Kodeksu cywilnego.
                    </p>
                </div>
            </section>
        </main>
    );
}
