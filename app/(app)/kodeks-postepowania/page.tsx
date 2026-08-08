import Tag from '@/components/Tag';

export default function KodeksPostepowania() {
    return (
        <main className="bg-(--main-accent) min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Kodeks Postępowania</Tag>
                <p className="text-5xl/16 md:text-6xl/20 xl:text-8xl/32 font-title mb-12">Kodeks Postępowania</p>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                <div className="text-left w-full p-8 lg:p-16">
                    <h1 className="text-2xl xl:text-3xl font-title pb-6">Kodeks postępowania społeczności Dzieciństwo Bez Smartfona (DBS)</h1>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        <b>Dbajmy o to, aby ten ruch był czymś, z czego wszyscy możemy być dumni</b>
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        DBS to społeczność ludzi, których jednoczy bardzo ważny cel: zapewnienie dzieciom czasu i przestrzeni na dorastanie w wolności od wciągających i uzależniających algorytmów.
                        Nie jesteśmy tu po to, by dzielić – jesteśmy tu, by się wspierać, zadawać pytania, wymieniać pomysłami i wspólnie działać na rzecz dzieciństwa.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Ten Kodeks Postępowania powstał po to, aby społeczność Dzieciństwo Bez Smartfona pozostała otwartym, pełnym szacunku miejscem. Dotyczy to rozmów na naszych grupach WhatsApp, w mediach społecznościowych, w społecznościach szkolnych i poza nimi.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Nasze wartości</h2>
                    <p className="text-sm xl:text-lg font-sans pb-2">
                        <b>Empatia. Szacunek. Otwartość.</b>
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Oczekujemy, że wszyscy członkowie społeczności będą rozmawiać z życzliwością i empatią – niezależnie od tego, czy rozmawiają z kimś, kto doskonale rozumie nasze podejście, czy patrzy na sprawę inaczej.
                        To trudny temat. Nie ma jednej słusznej odpowiedzi. Rodzicielstwo nie jest łatwe, każdy robi, co może, w oparciu o posiadane informacje i doświadczenie, a naszym zadaniem jest dzielenie się, słuchanie i tworzenie przestrzeni do tego, żeby móc swobodnie rozmawiać.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Jak działamy</h2>
                    <p className="text-sm xl:text-lg font-sans pb-2">
                        <b>Szanujemy różne punkty widzenia.</b>
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Dążymy do dużej zmiany kulturowej. Ludzie będą mieli różne opinie i doświadczenia związane z tym tematem – i to jest w porządku. Szacunek w dyskusji to podstawa zdrowej rozmowy. W tej społeczności nie zawstydzamy, nie atakujemy, nie moralizujemy.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-2">
                        <b>Pamiętajmy: to system jest wadliwy, nie ludzie</b>
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Bez względu na to, jakie mamy zdanie w tej debacie, pamiętajmy, że rodziny, szkoły i same dzieci zostały postawione w trudnej sytuacji przez firmy technologiczne, które zaprojektowały swoje produkty tak, abyśmy spędzali przy nich jak najwięcej czasu.
                        Wszyscy potrzebujemy wsparcia, aby przez to przejść.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-2">
                        <b>Z serdecznością i nadzieją</b>
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Nie unikamy poważnych tematów – jednocześnie nasz ruch opiera się na serdeczności i nadziei. Skupmy się na tym, co dzieci mogą zyskać: wolność, zabawę, relacje, wyobraźnię, zdrowie psychicznie. Tego właśnie chcemy dla naszych dzieci.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Współpraca ze szkołami</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Nawiązując kontakt ze szkołą, bądźmy pełni szacunku, pozytywnie nastawieni i gotowi do współpracy.
                        Pracownicy szkół są pod ogromną presją, więc starajmy się, aby nasze wiadomości były krótkie, życzliwe i otwarte.
                        Nie chodzi o wywieranie nacisku ani składanie petycji – chodzi o dzielenie się pomysłami i oferowanie wsparcia.
                        Świętujmy małe sukcesy i pamiętajmy: wszyscy gramy do jednej bramki.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Poufność</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Szanujemy prywatności innych.
                        Nie udostępniamy cudzych danych osobowych, historii ani zrzutów ekranu bez wyraźnej zgody.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Jesteśmy dla wszystkich</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Ten ruch jest dla wszystkich, natomiast nie tolerujemy żadnej formy dyskryminacji – ani tej ze względu na narodowość, płeć, klasę społeczną, ani żadnej innej.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Reprezentowanie DBS publicznie</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Jeśli mówimy o DBS publicznie – w mediach, w szkole lub online – upewnijmy się, że rozumiemy i odzwierciedlamy kluczowe wartości oraz ton ruchu. Zawsze wyraźnie zaznaczajmy, że jesteśmy wolontariuszami społeczności DBS, a nie osobami zatrudnionymi przez Fundację DBS, czyli organizację formalno-prawną.
                        Jeśli macie wątpliwości – prosimy o kontakt pod adresem email: kontakt@dziecinstwobezsmartfona.pl.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Korzystanie z zasobów DBS</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Materiały Fundacji DBS są udostępniane do wykorzystania niekomercyjnego.
                        Każdy może z nich korzystać – prosimy jedynie o wskazanie źródła i link do oryginału.
                        Jeśli potrzebujecie czegoś, czego jeszcze nie mamy – napiszcie do nas, być może możemy pomóc.
                        Wykorzystanie komercyjne marki, nazwy, zasobów, narzędzi, prezentacji czy treści Fundacji DBS – w całości lub częściowo – jest zabronione.
                        Jeśli macie wątpliwości – prosimy o kontakt pod adresem email: kontakt@dziecinstwobezsmartfona.pl.
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Korzystanie z marki i logo DBS</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Członkowie społeczności nie mogą wypowiadać się <i>w imieniu</i> Dzieciństwo Bez Smartfona bez wyraźnej zgody Fundacji DBS (kontakt@dziecinstwobezsmartfona.pl).
                        Dotyczy to także petycji i komunikatów, które mogłyby sugerować oficjalne stanowisko Fundacji DBS.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Lokalni koordynatorzy mogą używać nazwy, logo oraz materiałów DBS w celu wykorzystania podczas lokalnych wydarzeń, pod warunkiem dodania nazwy regionu, miejscowości lub szkoły, np.
                        „Dzieciństwo Bez Smartfona - Szkoła Podstawowa nr. X w Warszawie”
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Dostępne edytowalne szablony ułatwiają tworzenie lokalnych materiałów.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Jeśli publikujesz komunikaty w imieniu lokalnej grupy DBS, dodaj:
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        <b>“Dzieciństwo Bez Smartfona - Szkoła Podstawowa nr. X w Warszawie” to niezależna, samoorganizująca się grupa inspirowana ogólnopolskim ruchem Dzieciństwo Bez Smartfona. Wyrażane tu opinie nie odzwierciedlają stanowiska DBS, a DBS nie jest zaangażowane w zarządzanie tą grupą, jej treściami, wydarzeniami ani danymi.”</b>
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Nie używaj nazwy ani logo DBS do:
                    </p>
                    <ul className="text-sm xl:text-lg font-sans pb-6 list-disc list-inside">
                        <li>ogólnokrajowych kampanii lub wydarzeń</li>
                        <li>działań komercyjnych</li>
                        <li>działań politycznych lub związanych z partiami</li>
                    </ul>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        W razie wątpliwości napisz do nas: kontakt@dziecinstwobezsmartfona.pl
                    </p>

                    <h2 className="text-xl xl:text-2xl font-title pb-4">Zasady grup WhatsApp</h2>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Nasze grupy służą budowaniu kontaktów, wymianie pomysłów i wzajemnemu wsparciu.
                        Na grupach Whatsapp przestrzegamy następujących zasad:
                    </p>
                    <ul className="text-sm xl:text-lg font-sans pb-6 list-disc list-inside">
                        <li>Nie wstawiamy postów promocyjnych (w tym ofert komercyjnych).</li>
                        <li>Nie używamy obraźliwego języka, mowy nienawiści i przemocy.</li>
                        <li>Trzymamy się tematu: rozmowy dotyczą opóźniania dostępu dzieci do smartfonów.</li>
                        <li>Nie publikujemy niepokojących ani nieodpowiednich treści wizualnych.</li>
                        <li>Unikamy straszenia innych – chodzi nam o nadzieję i działanie.</li>
                        <li>Nie wykorzystujemy grup do zakupu czy wymiany prywatnych, nie związanych z ruchem DBS rzeczy.</li>
                        <li>Jeśli to możliwe, reagujemy emotikonem lub wiadomością prywatną, aby nie spamować czatu.</li>
                        <li>Akceptujemy różnorodne perspektywy, ale w granicach regulowanych Kodeksem Postępowania DBS.</li>
                        <li>Administratorzy mogą usuwać osoby łamiące zasady.</li>
                    </ul>
                </div>
            </section>
        </main>
    );
}
