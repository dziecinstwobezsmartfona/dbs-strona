# Contributing to the DBS website

English | [Polski](#polski)

Thank you for helping Dzieciństwo Bez Smartfona! This project is
**source-available, not open source**: the code is public so that volunteers
can help and anyone can read it, but all rights remain with the copyright
holder (see [LICENSE](LICENSE)).

## Licensing of contributions

By opening a pull request, or otherwise submitting code, text, images or any
other material to this repository, you confirm that:

1. you wrote it yourself, or you have the right to submit it;
2. you grant Fundacja Dzieciństwo Bez Smartfona a perpetual, worldwide,
   non-exclusive, irrevocable, royalty-free license to use, copy, modify,
   sublicense and distribute your contribution as part of the project, under
   the project's current license or any future license, including an
   open-source one;
3. you keep the copyright in your contribution; this is a license, not a
   transfer of ownership;
4. you receive no payment for the contribution unless agreed separately and
   in writing.

If you cannot agree to this, please do not submit a pull request. Opening an
issue to report a problem or suggest an idea is always fine.

## How to contribute

1. **Talk first.** Open an issue, or comment on an existing one, before
   starting anything larger than a small fix, so we do not duplicate work.
2. **Fork** the repository and create a branch from `main`.
3. **Run the site locally** and check that your change works.
4. **Open a pull request** against `main` with a short description of what
   changed and why.

Maintainers review every pull request before merging. We may ask for changes,
or decline a contribution that does not fit the project.

## Code guidelines

- TypeScript in strict mode; avoid `any`.
- Run `npm run lint` and fix what it reports before opening a PR.
- Follow the style and naming of the surrounding code.
- Keep pull requests small and focused on one thing.

## Security and secrets

- **Never commit secrets**: API keys, database URIs, `.env` files, or
  credentials of any kind.
- **Report security problems privately** to the maintainers (use GitHub's
  "Report a vulnerability" feature on the repository, or the contact details
  on the website). Do not open a public issue for them.
- Do not include personal data of the people who signed the Parents' Pact in
  issues, screenshots, test fixtures or pull requests.

## Conduct

Be respectful and assume good faith. Harassment and vulgarity are not
tolerated, and maintainers may remove comments or block offenders.

---

# Polski

[English](#contributing-to-the-dbs-website) | Polski

Dziękujemy za pomoc w rozwoju Dzieciństwa Bez Smartfona! Ten projekt jest
**dostępny w formie kodu źródłowego (source-available), ale nie jest open
source**: kod jest publiczny, aby wolontariusze mogli pomagać, a każdy mógł go
czytać, ale wszelkie prawa pozostają przy podmiocie uprawnionym z praw
autorskich (zob. [LICENSE](LICENSE)).

## Licencjonowanie wkładów

Otwierając pull request lub w inny sposób przekazując do tego repozytorium
kod, teksty, obrazy lub jakiekolwiek inne materiały, potwierdzasz, że:

1. stworzyłeś(-aś) je samodzielnie lub masz prawo je przekazać;
2. udzielasz Fundacji Dzieciństwo Bez Smartfona nieograniczonej w czasie,
   obejmującej cały świat, niewyłącznej, nieodwołalnej i nieodpłatnej licencji
   na korzystanie z Twojego wkładu, jego kopiowanie, modyfikowanie,
   udzielanie sublicencji i rozpowszechnianie w ramach projektu, na zasadach
   obecnej licencji projektu lub dowolnej przyszłej licencji, w tym licencji
   open source;
3. zachowujesz autorskie prawa majątkowe do swojego wkładu; to udzielenie
   licencji, a nie przeniesienie praw;
4. nie otrzymujesz wynagrodzenia za wkład, chyba że odrębnie i na piśmie
   ustalono inaczej.

Jeśli nie możesz się na to zgodzić, nie przesyłaj pull requesta. Zgłoszenie
błędu lub pomysłu w formie issue jest zawsze mile widziane.

## Jak współtworzyć projekt

1. **Najpierw porozmawiajmy.** Zanim zaczniesz coś większego niż drobna
   poprawka, otwórz issue lub skomentuj istniejące, żebyśmy nie dublowali
   pracy.
2. **Zrób fork** repozytorium i utwórz gałąź z `main`.
3. **Uruchom stronę lokalnie** i sprawdź, czy Twoja zmiana działa.
4. **Otwórz pull request** do `main` z krótkim opisem tego, co się zmieniło
   i dlaczego.

Opiekunowie przeglądają każdy pull request przed scaleniem. Możemy poprosić
o zmiany lub odrzucić wkład, który nie pasuje do projektu.

## Zasady dotyczące kodu

- TypeScript w trybie strict; unikaj `any`.
- Przed otwarciem PR uruchom `npm run lint` i popraw zgłoszone problemy.
- Trzymaj się stylu i nazewnictwa otaczającego kodu.
- Twórz małe pull requesty, skupione na jednej rzeczy.

## Wyszukiwarka

Wyszukiwarka (`/szukaj`) korzysta z MongoDB Atlas Search i kolekcji `search-index`.

- **Artykuły i działania** trafiają do indeksu automatycznie (hooki w panelu administratora).
- **Strony statyczne** (pliki `app/(app)/<trasa>/page.tsx`) trzeba dopisać do
  `lib/search/staticPages.ts` (albo do `EXCLUDED_ROUTES`, jeśli mają nie być
  wyszukiwane). Test `npm test` zgłosi błąd, jeśli o tym zapomnisz. Zmiany
  synchronizują się same przy starcie aplikacji.
- Po zaimportowaniu danych poza panelem lub na nowym środowisku uruchom
  `npm run search:reindex` (tworzy indeks Atlas Search i odbudowuje wpisy).

## Bezpieczeństwo i sekrety

- **Nigdy nie commituj sekretów**: kluczy API, adresów URI baz danych, plików
  `.env` ani żadnych innych danych uwierzytelniających.
- **Problemy z bezpieczeństwem zgłaszaj prywatnie** opiekunom projektu
  (użyj funkcji „Report a vulnerability" w repozytorium lub danych
  kontaktowych ze strony internetowej). Nie otwieraj w tej sprawie publicznego
  issue.
- Nie umieszczaj danych osobowych osób, które podpisały Pakt Rodziców,
  w issue, zrzutach ekranu, danych testowych ani pull requestach.

## Zasady współpracy

Szanujmy się nawzajem i zakładajmy dobre intencje. Nie tolerujemy
nękania ani wulgarnego języka. Opiekunowie mogą usuwać komentarze lub blokować
osoby, które wielokrotnie łamią te zasady.
