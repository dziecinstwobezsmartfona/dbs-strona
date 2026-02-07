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
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 3px solid #4CAF50;
          padding-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          color: #2c3e50;
          font-size: 24px;
        }
        .content {
          margin: 20px 0;
        }
        .content p {
          margin: 10px 0;
          font-size: 14px;
        }
        .highlight {
          background-color: #f0f8f0;
          padding: 15px;
          border-left: 4px solid #4CAF50;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          font-size: 12px;
          color: #666;
        }
        .footer a {
          color: #4CAF50;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Dziękujemy za przyłączenie się do Paktu Rodziców!</h1>
        </div>

        <div class="content">
          <p>Cześć ${firstName}!</p>
          
          <p>Jesteśmy niezmiernie wdzięczni, że dołączyłeś do naszej wspólnoty. Twoje podpisanie się na Pakt Rodziców to ważny krok w kierunku zdrowszego dzieciństwa, wolnego od nadmiernego wpływu smartfonów i urządzeń technicznych.</p>

          <div class="highlight">
            <p><strong>Co teraz?</strong></p>
            <p>Teraz możesz:</p>
            <ul>
              <li>Zapoznać się z wytycznymi Paktu Rodziców</li>
              <li>Połączyć się z innymi rodzicami w Twojej szkole</li>
              <li>Otrzymywać aktualizacje i wsparcie w naszym newsletter'ze</li>
              <li>Uczestniczyć w inicjatywach społeczności</li>
            </ul>
          </div>

          <p>Jeśli masz jakieś pytania lub chcesz się dowiedzieć więcej na temat naszych działań, zapraszamy do odwiedzenia naszej strony internetowej.</p>

          <p>Dziękujemy jeszcze raz za Twoje zaangażowanie w budowanie lepszej przyszłości dla naszych dzieci!</p>

          <p>Z poważaniem,<br><strong>Zespół Dzieciństwa Bez Smartfona</strong></p>
        </div>

        <div class="footer">
          <p>© 2024 Dzieciństwo Bez Smartfona. Wszystkie prawa zastrzeżone.</p>
          <p>Otrzymałeś tę wiadomość, ponieważ dołączyłeś do Paktu Rodziców.</p>
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
