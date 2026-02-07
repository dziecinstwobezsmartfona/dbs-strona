import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Pact from '../../../lib/models/Pact';

// Required for Netlify deployment - ensures this route runs as a Node.js function
export const runtime = 'nodejs';

// Send transactional email via Brevo API
async function sendBrevoEmail(firstName: string, lastName: string, email: string) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error('BREVO_API_KEY is not set in environment variables');
    return false;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Potwierdzenie podpisania Paktu Rodziców</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;500;600;700&family=Victor+Mono:wght@400;500&display=swap" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        :root {
          --background: #EDFFDD;
          --secondary-background: #0A6880;
          --foreground: #0E3B3B;
          --main-accent: #CEFFA8;
          --secondary-accent: #ECFF87;
        }
        body {
          font-family: 'Montserrat', sans-serif;
          background-color: var(--background);
          color: var(--foreground);
        }
        h1, h2, h3 {
          font-family: 'Anton', sans-serif;
        }
        .mono {
          font-family: 'Victor Mono', monospace;
        }
      </style>
    </head>
    <body class="min-h-screen">
      <!-- Main container -->
      <div class="max-w-3xl mx-auto my-8 md:my-12 px-4 sm:px-6 lg:px-8">
        <!-- Email wrapper -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-[var(--main-accent)]">
          <!-- Header with logo -->
          <div class="bg-[var(--foreground)] text-[var(--background)] py-10 px-8">
            <div class="flex items-center justify-center md:justify-start gap-4 md:gap-6 flex-col md:flex-row">
              <img
                src="https://dziecinstwobezsmartfona.pl/_next/image?url=%2Fimages%2Flogo2.png&w=128&q=75"
                alt="Logo Dzieciństwo Bez Smartfona"
                class="h-20 md:h-24 w-auto object-contain"
                width="128"
              />
              <div class="text-center md:text-left">
                <h1 class="text-3xl md:text-4xl font-normal tracking-wide uppercase">
                  Dzieciństwo Bez Smartfona
                </h1>
                <p class="mt-2 text-lg md:text-xl opacity-90">Pakt Rodziców – potwierdzenie</p>
              </div>
            </div>
          </div>
          <!-- Content -->
          <div class="px-8 md:px-12 py-10">
            <h2 class="text-3xl font-normal text-[var(--foreground)] mb-6">
              Drogi Rodzicu,
            </h2>
            <p class="text-lg leading-relaxed mb-6">
              Ten e-mail jest potwierdzeniem podpisania przez Ciebie Paktu Rodziców!<br> <strong class="font-semibold">Gratulujemy!</strong>
            </p>
            <h3 class="text-2xl font-normal text-[var(--foreground)] mt-10 mb-5">
              Co dalej?
            </h3>
            <p class="text-base leading-relaxed mb-6">
              Początki mogą być trudne, dlatego przede wszystkim zachęcamy Cię do dołączenia do grupy Twojej szkoły w społeczności DBS na WhatsAppie. Bycie częścią grupy, która ma podobne podejście, może przynieść ogromne wsparcie.
            </p>
            <p class="text-base leading-relaxed mb-8">
              <a href="[Link do grup WhatsApp]" class="text-[var(--foreground)] hover:text-[var(--main-accent)] font-medium underline"><strong>▶ Znajdź grupę swojej szkoły na WhatsAppie ◀</strong></a>.
            </p>
            <p class="text-base leading-relaxed mb-8">
              Grupa szkolna to miejsce, w którym wspólnie z innymi rodzicami, którzy mają dzieci w Twojej szkole, możecie rozmawiać, dzielić się pomysłami, planować wspólne działania oraz wspierać się nawzajem.
            </p>
            <p class="text-base leading-relaxed mb-8">
              Jeżeli Twojej szkoły nie ma na liście, oznacza to, że grupa jeszcze nie została założona. Każdy może stworzyć taką grupę na WhatsAppie.
              <br><a href="[Link]" class="text-[var(--foreground)] hover:text-[var(--main-accent)] font-medium underline"><strong>▶ Oto instrukcja, jak to zrobić ◀</strong></a>.
            </p>
            <p class="text-base leading-relaxed mb-8">
              Zapraszamy Cię również do dołączenia do naszej ogólnopolskiej społeczności na WhatsAppie. To miejsce, gdzie możemy wspierać się i dzielić wszystkim, co pomoże zadbać o lepsze dzieciństwo dla naszych dzieci.
              <br><a href="[LINK DO SPOŁECZNOŚCI]" class="text-[var(--foreground)] hover:text-[var(--main-accent)] font-medium underline"><strong>▶ Dołącz do ogólnopolskiej społeczności ◀</strong></a>.
            </p>
            <h3 class="text-2xl font-normal text-[var(--foreground)] mt-10 mb-5">
              Materiały pomocnicze
            </h3>
            <p class="text-base leading-relaxed mb-6">
              Jeśli jeszcze nie zapoznałeś się z naszymi materiałami pomagającymi wprowadzić Pakt Rodziców w szkole, zachęcamy do zapoznania się z nimi. Znajdziesz je poniżej:
            </p>
            <strong>
              <ul class="list-disc pl-6 space-y-3 text-base">
                <li><a href="#" class="text-[var(--foreground)] hover:text-[var(--main-accent)] underline">Jak rozpocząć budowanie społeczności DZIECIŃSTWO BEZ SMARTFONA (DBS) w swojej szkole</a></li>
                <li><a href="#" class="text-[var(--foreground)] hover:text-[var(--main-accent)] underline">Jak zacząć rozmowę o "Dzieciństwie Bez Smartfona" na grupie klasowej?</a></li>
                <li><a href="#" class="text-[var(--foreground)] hover:text-[var(--main-accent)] underline">Jak poruszyć temat odkładania smartfonów z innymi rodzicami, żeby nie brzmieć oceniająco?</a></li>
                <li><a href="#" class="text-[var(--foreground)] hover:text-[var(--main-accent)] underline">Prezentacja dla rodziców.pdf</a></li>
                <li><a href="#" class="text-[var(--foreground)] hover:text-[var(--main-accent)] underline">Edytowalny szablon plakatu</a></li>
                <li><a href="#" class="text-[var(--foreground)] hover:text-[var(--main-accent)] underline">Kodeks postępowania społeczności DBS</a></li>
              </ul>
            </strong>
            <div class="mt-10 pt-8 border-t border-[var(--main-accent)]/30">
              <p class="text-lg leading-relaxed mb-6 font-medium">
                Pamiętaj, że decyzja o podpisaniu Paktu Rodziców to nie tylko krok ku wielkim zmianom, ale przede wszystkim realna szansa na poprawę życia i dzieciństwa Twojego dziecka.
              </p>
              <p class="text-lg leading-relaxed mb-6">
                Zachęcaj innych rodziców do przyłączenia się do tej inicjatywy – wspólne działanie przyniesie znacznie lepsze efekty. Razem możemy stworzyć lepszą przyszłość dla naszych dzieci!
              </p>
            </div>
            <div class="mt-10 text-center">
              <p class="text-xl font-semibold text-[var(--foreground)]">Powodzenia!</p>
              <p class="text-lg mt-2 text-[var(--foreground)]/90 mb-8">
                Zespół <span class="font-bold">„Dzieciństwo Bez Smartfona”</span>
              </p>
	            <p class="text-base leading-relaxed mb-8">
                <a href="https://dziecinstwobezsmartfona.pl" class="text-[var(--foreground)] hover:text-[var(--main-accent)] font-medium underline"><strong>www.dziecinstwobezsmartfona.pl</strong></a>.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-[var(--foreground)] text-[var(--background)] px-6 py-8">
            <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-6 max-w-2xl mx-auto">
              <!-- Address block -->
              <div class="text-center md:text-left text-sm md:text-base">
                <p class="font-bold">Stowarzyszenie "Dzieciństwo Bez Smartfona"</p>
                <p>Aleje Jerozolimskie 109/70</p>
                <p>02-011 Warszawa</p>
                <p class="mt-1">kontakt@dziecinstwobezsmartfona.pl</p>
              </div>

              <!-- Links & social icons -->
              <div class="flex flex-col items-center md:items-end gap-4">
                <!-- Policy links -->
                <div class="flex flex-wrap justify-center md:justify-end gap-x-5 gap-y-2 text-sm md:text-base">
                  <a href="https://dziecinstwobezsmartfona.pl/kodeks-postepowania" class="hover:opacity-80 font-medium">Kodeks postępowania</a>
                  <a href="https://dziecinstwobezsmartfona.pl/polityka-prywatnosci" class="hover:opacity-80 font-medium">Polityka prywatności</a>
                </div>

                <!-- Social icons -->
                <div class="flex space-x-5 items-center">
                  <a
                    href="https://www.instagram.com/dziecinstwobezsmartfona"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    class="text-[var(--background)] hover:opacity-80"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/>
                      <circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.5"/>
                      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61579059807051"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    class="text-[var(--background)] hover:opacity-80"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 4.84 3.44 8.84 8 9.8V14.7H7.5v-2.7H10V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.3.2 2.3.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6v1.8h2.7l-.4 2.7H14v7.1c4.56-.96 8-4.96 8-9.8z" fill="currentColor"/>
                    </svg>
                  </a>

                  <a
                    href="https://chat.whatsapp.com/KKSz0wyUNaGJQD50908mGz?mode=r_c&source_surface=23"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Whatsapp"
                    class="text-[var(--background)] hover:opacity-80"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 .01 5.36.01 12a11.5 11.5 0 001.64 6L0 24l6.26-1.62A11.88 11.88 0 0012 24c6.63 0 12-5.36 12-12 0-3.2-1.24-6.2-3.48-8.52zM12 21.5c-1.6 0-3.15-.38-4.53-1.1l-.32-.18-3.72.97.99-3.62-.2-.36A9.39 9.39 0 012.5 12c0-5.25 4.25-9.5 9.5-9.5S21.5 6.75 21.5 12 17.25 21.5 12 21.5z" fill="currentColor"/>
                      <path d="M17.1 14.2c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-.95 1.2-.15.2-.3.25-.6.1-.3-.15-1.2-.45-2.25-1.4-.83-.74-1.4-1.65-1.57-1.95-.17-.3-.02-.45.12-.6.12-.12.27-.3.4-.45.13-.15.17-.25.27-.4.1-.15.05-.3-.03-.45-.08-.15-.7-1.7-.95-2.34-.25-.6-.5-.5-.7-.5-.18 0-.4 0-.62 0-.22 0-.57.08-.87.37-.3.3-1.15 1.12-1.15 2.72 0 1.6 1.18 3.14 1.34 3.36.17.22 2.3 3.5 5.6 4.9 3.3 1.4 3.3 0.93 3.9.87.6-.06 1.95-.8 2.23-1.57.28-.77.28-1.43.2-1.56-.08-.13-.3-.2-.62-.35z" fill="#ffffff"/>
                    </svg>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Dzieciństwo Bez Smartfona',
          email: 'pakt@dziecinstwobezsmartfona.pl',
        },
        to: [
          {
            email: email,
            name: `${firstName} ${lastName}`,
          },
        ],
        subject: 'Dziękujemy za przyłączenie się do Paktu Rodziców!',
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      return false;
    }

    const data = await response.json();
    console.log('Email sent successfully via Brevo. Message ID:', data.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email via Brevo:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Check if a pact with the same email and schoolId already exists
    const existingPact = await Pact.findOne({
      email: body.email,
      schoolId: body.schoolId,
    });

    if (existingPact) {
      // Silently ignore and proceed as if the record was added
      console.log('Pakt already exists for email and school.id, skipping insert');
      return NextResponse.json({ success: true, message: 'Pakt podpisany pomyślnie' });
    }

    // Create new pact document
    const pact = new Pact({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      schoolId: body.schoolId,
      schoolVoivodship: body.schoolVoivodship,
      schoolDistrict: body.schoolDistrict,
      schoolCounty: body.schoolCounty,
      schoolName: body.schoolName,
      numberOfChildren: body.numberOfChildren,
      gdpr_consent: body.gdpr_consent,
      newsletter_consent: body.newsletter_consent || false,
    });

    // Save to database
    await pact.save();

    console.log('Pakt saved to database:', pact);

    // Send confirmation email
    const emailSent = await sendBrevoEmail(body.firstName, body.lastName, body.email);
    if (!emailSent) {
      console.warn('Warning: Email confirmation could not be sent, but pact was saved to database');
    }

    return NextResponse.json({ success: true, message: 'Pakt podpisany pomyślnie' });
  } catch (error) {
    console.error('Error processing pakt:', error);
    return NextResponse.json({ success: false, message: 'Błąd podczas podpisywania paktu' }, { status: 500 });
  }
}
