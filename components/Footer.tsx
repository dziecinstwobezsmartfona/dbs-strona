import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-(--foreground) text-(--background)">
      <div className="flex flex-row h-45 justify-between items-end p-8">
        <div>
          <Image
            src="/images/logo2.png"
            width={100}
            height={100}
            alt="Dzieciństwo Bez Smartfona Logo"
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="flex space-x-4 items-center">
            <a
              href="https://www.instagram.com/dziecinstwobezsmartfona/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-(--background) hover:opacity-80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61579059807051"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-(--background) hover:opacity-80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 4.84 3.44 8.84 8 9.8V14.7H7.5v-2.7H10V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.3.2 2.3.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6v1.8h2.7l-.4 2.7H14v7.1c4.56-.96 8-4.96 8-9.8z" stroke="currentColor" strokeWidth="0" fill="currentColor" />
              </svg>
            </a>

            <a
              href="https://chat.whatsapp.com/KKSz0wyUNaGJQD50908mGz?mode=r_c&source_surface=23"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Whatsapp"
              className="text-(--background) hover:opacity-80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 .01 5.36.01 12a11.5 11.5 0 001.64 6L0 24l6.26-1.62A11.88 11.88 0 0012 24c6.63 0 12-5.36 12-12 0-3.2-1.24-6.2-3.48-8.52zM12 21.5c-1.6 0-3.15-.38-4.53-1.1l-.32-.18-3.72.97.99-3.62-.2-.36A9.39 9.39 0 012.5 12c0-5.25 4.25-9.5 9.5-9.5S21.5 6.75 21.5 12 17.25 21.5 12 21.5z" fill="currentColor" />
                <path d="M17.1 14.2c-.3-.15-1.8-.9-2.1-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-.95 1.2-.15.2-.3.25-.6.1-.3-.15-1.2-.45-2.25-1.4-.83-.74-1.4-1.65-1.57-1.95-.17-.3-.02-.45.12-.6.12-.12.27-.3.4-.45.13-.15.17-.25.27-.4.1-.15.05-.3-.03-.45-.08-.15-.7-1.7-.95-2.34-.25-.6-.5-.5-.7-.5-.18 0-.4 0-.62 0-.22 0-.57.08-.87.37-.3.3-1.15 1.12-1.15 2.72 0 1.6 1.18 3.14 1.34 3.36.17.22 2.3 3.5 5.6 4.9 3.3 1.4 3.3 0.93 3.9.87.6-.06 1.95-.8 2.23-1.57.28-.77.28-1.43.2-1.56-.08-.13-.3-.2-.62-.35z" fill="white" />
              </svg>
            </a>

            <a
              href="mailto:kontakt@dziecinstwobezsmartfona.pl"
              aria-label="Email"
              className="text-(--background) hover:opacity-80"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M3 7.5l8.5 6L20 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
