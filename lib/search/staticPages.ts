import type { SearchDoc } from './types';

// Hand-maintained entries for pages that live in app/(app)/<route>/page.tsx rather than in the CMS.
// Edit this list when a static page is added, removed or its text changes; it is synced to the
// search index automatically on startup (see syncStaticPages). staticPages.test.ts fails when a
// route is neither listed here nor in EXCLUDED_ROUTES.

type StaticPage = Omit<SearchDoc, 'sourceType' | 'sourceId'> & { route: string };

export const STATIC_PAGES: StaticPage[] = [
  {
    route: 'nasza-misja',
    title: 'Nasza misja',
    url: '/nasza-misja',
    excerpt: 'W niewiele ponad 15 lat smartfony całkowicie zmieniły oblicze dzieciństwa. Rodzice nie mogą być z tym sami.',
    content: 'Nowa rzeczywistość rodziców. W niewiele ponad 15 lat smartfony całkowicie zmieniły oblicze dzieciństwa, a dowodów na to, że wyrządzają więcej szkód niż pożytku, nie można już ignorować. Nie ma formalnych wytycznych dotyczących tego, kiedy dzieci powinny otrzymać swój pierwszy smartfon. Rodzice, którzy dali swoim dzieciom smartfony, żałują, że nie poczekali. Nauczyciele twierdzą, że smartfony wpływają na naukę, przyjaźnie i koncentrację. Lekarze łączą smartfony z kryzysem zdrowia psychicznego nastolatków.',
  },
  {
    route: 'nasz-wplyw',
    title: 'Nasz wpływ',
    url: '/nasz-wplyw',
    excerpt: 'Rodziny stawiają opór, co zmienia normy społeczne. Ponad 175 000 podpisanych Paktów Rodziców.',
    content: 'Dzieciństwo Bez Smartfona to nie kampania. Rodziny stawiają opór, co zmienia charakter rozmów. Rodzice opóźniają wręczenie smartfonów swoim dzieciom, dając im szansę na dorastanie we właściwym dla nich tempie. Tak można zmienić normy społeczne dzięki tysiącom rodzin. Ponad 175 000 podpisanych Paktów Rodziców.',
  },
  {
    route: 'sytuacja',
    title: 'Sytuacja: smartfony zmieniły dzieciństwo',
    url: '/sytuacja',
    excerpt: 'Smartfony nie powstały z myślą o dzieciach, a w ekspresowym tempie wywróciły ich świat do góry nogami.',
    content: 'Smartfony zmieniły dzieciństwo. Smartfony to nie zabawki i nie powstały z myślą o dzieciach. Dane z najnowszych raportów dotyczących Polski, opublikowanych w 2025 roku. Dzieci są zbyt szybko wciągane w świat wirtualny, który jest zaprojektowany tak, aby nie mogły się już z niego wydostać. Ma to ogromny wpływ na ich rozwój, psychikę i relacje z innymi.',
  },
  {
    route: 'rozwiazanie',
    title: 'Rozwiązanie: opóźnijmy pierwszy smartfon',
    url: '/rozwiazanie',
    excerpt: 'Wspólnymi siłami możemy dokonać kulturowej zmiany. Naszym celem jest opóźnienie momentu, w którym dziecko dostaje pierwszy smartfon.',
    content: 'Wspólnymi siłami możemy dokonać kulturowej zmiany. Smartfony to klucze do królestwa mediów społecznościowych i całego internetu. Naszym celem jest opóźnienie momentu w życiu dziecka, w którym dostaje ono swój pierwszy smartfon. Im później wręczymy go dziecku, tym więcej czasu zyskamy, by nauczyć je radzić sobie z algorytmami, unikać negatywnego wpływu mediów społecznościowych i budować odporność psychiczną.',
  },
  {
    route: 'dzialam',
    title: 'Działaj',
    url: '/dzialam',
    excerpt: 'Nie musisz być z problemem smartfonów w rękach dzieci sam — działajmy razem, ramię w ramię.',
    content: 'Nie musisz być z problemem smartfonów w rękach dzieci sam — działajmy razem, ramię w ramię. Działania dla rodziców i nauczycieli.',
  },
  {
    route: 'wspieram',
    title: 'Wesprzyj nas',
    url: '/wspieram',
    excerpt: 'Wspierając Stowarzyszenie Dzieciństwo Bez Smartfona, pomagasz tworzyć świat, w którym dzieci rozwijają się w swoim tempie.',
    content: 'Dzieciństwo mija tylko raz. Wspierając Stowarzyszenie Dzieciństwo Bez Smartfona, pomagasz tworzyć świat, w którym dzieci mogą rozwijać się w swoim tempie, budować prawdziwe relacje i odkrywać rzeczywistość poza ekranem. Wspieramy rodziców, edukujemy społeczeństwo i działamy na rzecz ograniczenia zbyt wczesnego dostępu do smartfonów i mediów społecznościowych. Darowizna, wpłata.',
  },
  {
    route: 'pakt-rodzicow',
    title: 'Pakt Rodziców',
    url: '/pakt-rodzicow',
    excerpt: 'Pakt Rodziców to sposób, aby wspólnie z innymi rodzicami w swojej społeczności zobowiązać się do niedawania dzieciom smartfonów.',
    content: 'Pakt Rodziców dla Dzieciństwa Bez Smartfona. Sposób, aby wspólnie z innymi rodzicami w swojej społeczności zobowiązać się do nie dawania swoim dzieciom smartfonów. Podpisanie Paktu zajmuje 30 sekund. Dane o liczbie podpisanych Paktów w całej Polsce. Dołącz do rosnącego ruchu rodziców.',
  },
  {
    route: 'podpisz-pakt',
    title: 'Podpisz Pakt Rodziców',
    url: '/podpisz-pakt',
    excerpt: 'Podpisanie Paktu nie jest jawne. Im więcej z nas podpisze Pakt, tym większą będzie miał siłę w zmienianiu normy społecznej.',
    content: 'Podpisz Pakt Rodziców. Podpisanie Paktu nie jest jawne, nigdy nie udostępnimy publicznie żadnych Twoich danych bez Twojej zgody. Przedstawiamy informacje o liczbie rodziców, którzy podpisali Pakt w danej szkole, gminie, powiecie, aby ułatwić rodzicom myślącym podobnie odnalezienie się.',
  },
  {
    route: 'pakt-rodzicow-wyniki',
    title: 'Wyniki Paktu Rodziców',
    url: '/pakt-rodzicow-wyniki',
    excerpt: 'Statystyki podpisanych Paktów Rodziców według województw, powiatów i szkół.',
    content: 'Wyniki Paktu Rodziców. Statystyki podpisanych Paktów według województw, powiatów, gmin i szkół.',
  },
  {
    route: 'zostan-koordynatorem',
    title: 'Zostań koordynatorem szkolnym',
    url: '/zostan-koordynatorem',
    excerpt: 'Jak zostać koordynatorem szkolnym Dzieciństwa Bez Smartfona.',
    content: 'Jak zostać koordynatorem szkolnym. Koordynator szkolny Dzieciństwa Bez Smartfona wspiera rodziców w swojej szkole.',
  },
  {
    route: 'dolacz-do-spolecznosci',
    title: 'Dołącz do społeczności DBS na WhatsApp',
    url: '/dolacz-do-spolecznosci',
    excerpt: 'Połącz się z rodzicami w Twojej szkole i w całej Polsce. Ogólnopolska grupa DBS na WhatsApp.',
    content: 'Dołącz do społeczności DBS na WhatsApp. Połącz się z rodzicami w Twojej szkole i w całej Polsce. Miejsce do dzielenia się pomysłami, zadawania pytań i dowiadywania się, jakie kroki podejmują inni, aby utrzymać dzieciństwo wolne od smartfonów. Grupa WhatsApp szkoły.',
  },
  {
    route: 'kodeks-postepowania',
    title: 'Kodeks postępowania społeczności DBS',
    url: '/kodeks-postepowania',
    excerpt: 'Zasady reprezentowania DBS publicznie, korzystania z zasobów oraz marki i logo DBS.',
    content: 'Kodeks postępowania społeczności Dzieciństwo Bez Smartfona. Reprezentowanie DBS publicznie. Korzystanie z zasobów DBS. Korzystanie z marki i logo DBS.',
  },
  {
    route: 'polityka-prywatnosci',
    title: 'Polityka prywatności',
    url: '/polityka-prywatnosci',
    excerpt: 'Podstawa i cel przetwarzania danych osobowych, odbiorcy danych i prawa właściciela danych.',
    content: 'Polityka prywatności. Podstawa i cel przetwarzania danych osobowych. Zasady przetwarzania danych osobowych. Odbiorcy danych osobowych. Prawa właściciela danych osobowych. RODO.',
  },
  {
    route: 'regulamin-newslettera',
    title: 'Regulamin newslettera',
    url: '/regulamin-newslettera',
    excerpt: 'Regulamin newslettera Fundacji Dzieciństwo Bez Smartfona.',
    content: 'Regulamin newslettera Fundacji Dzieciństwo Bez Smartfona. Zawieranie i rozwiązywanie umowy. Przedmiot umowy newslettera. Zasady korzystania z newslettera. Postępowanie reklamacyjne. Ochrona danych osobowych.',
  },
  {
    route: 'regulamin-wplat',
    title: 'Regulamin wpłat',
    url: '/regulamin-wplat',
    excerpt: 'Regulamin wpłat i darowizn na rzecz Fundacji Dzieciństwo Bez Smartfona.',
    content: 'Regulamin wpłat i darowizn na rzecz Fundacji Dzieciństwo Bez Smartfona.',
  },
];

// Routes under app/(app) that intentionally do not appear in search.
export const EXCLUDED_ROUTES = [
  'api',
  '[slug]', // articles, indexed from the CMS
  'szukaj',
  'wiedza-i-materialy', // listing page; its content is indexed as articles
  'dziekujemy-za-wplate',
  'nieudana-platnosc',
  'podpisz-pakt-dziekujemy',
];

export function staticPageDocs(): SearchDoc[] {
  return STATIC_PAGES.map(({ route, ...page }) => ({ sourceType: 'page', sourceId: route, ...page }));
}
