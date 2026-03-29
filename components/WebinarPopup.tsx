"use client";

import { useEffect, useState } from "react";

export default function WebinarPopup() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const closePopup = () => setIsOpen(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closePopup} />

      <div className="relative max-w-lg w-full bg-white text-(--foreground) rounded-3xl shadow-2xl border border-(--secondary-background) p-8 overflow-y-auto max-h-[90vh]">
        <button
          type="button"
          onClick={closePopup}
          aria-label="Zamknij okno"
          className="absolute top-4 right-4 text-2xl text-(--foreground) hover:text-(--secondary-accent)"
        >
          &times;
        </button>

        <h2 className="text-2xl lg:text-3xl font-title mb-4 text-center">
          📢 Webinar: Jak działać jako Koordynator DBS w szkole?
        </h2>

        <div className="space-y-2 text-base leading-relaxed">
          <p>📅 <strong>Kiedy?</strong> 14.04.2026 (wtorek) o 20:30</p>
          <p>💻 <strong>Gdzie?</strong> Online</p>
          <div className="pt-2 text-center">
            <p className="font-semibold">🔗 Zapisy:</p>
            <a
              href="https://forms.gle/EYtSv78NkPJ95Tc16"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex mt-2 items-center justify-center rounded-2xl bg-(--main-accent) px-4 py-2 font-title text-(--foreground) hover:bg-(--secondary-accent) transition-colors"
            >
              https://forms.gle/EYtSv78NkPJ95Tc16
            </a>
          </div>
          <p className="text-sm text-(--foreground) text-center">
            📩 Link do spotkania prześlemy dzień przed webinarem na podany w formularzu adres e-mail.
          </p>
        </div>

        <div className="mt-6">
          <p className="font-semibold mb-3">Tematy webinaru:</p>
          <ul className="space-y-2 text-base leading-relaxed">
            <li>1️⃣ Czym jest Dzieciństwo Bez Smartfona i Pakt Rodziców</li>
            <li>2️⃣ Rola Koordynatora – kim jest Koordynator i jak może działać w swojej szkole</li>
            <li>3️⃣ Materiały i pomoce dla Koordynatorów</li>
            <li>4️⃣ Inne formy zaangażowania</li>
          </ul>
        </div>

        <p className="mt-6 text-center text-lg">Zapraszamy! 🙂</p>
      </div>
    </div>
  );
}