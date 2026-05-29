'use client';

import { useEffect } from "react";
import Script from "next/script";

export default function Wspieram() {

    useEffect(() => {
        const script = document.createElement('script')
        script.src = `https://widget2.fanimani.pl/GxCmocpavo4VCruB5iScHU.js?v=${Date.now()}`
        script.async = true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return (
        <main className="flex w-screen min-h-screen items-start justify-center bg-(--main-accent)">

            {/* Two boxes layout - one for description, one for the fanipay widget */}
            <div className="flex w-full mx-[10%] pt-48 z-1">
                <div className="flex flex-col items-start justify-center md:flex-row md:items-center">
                    <div className="flex flex-col md:w-1/2 md:mr-8 text-(--foreground)">
                        <p className="text-3xl lg:text-5xl/16 font-title pb-8">Dzieciństwo mija tylko raz</p>
                        <p className="text-sm lg:text-lg font-sans pb-4">Wspierając Stowarzyszenie Dzieciństwo Bez Smartfona, pomagasz tworzyć świat, w którym dzieci mogą rozwijać się w swoim tempie, budować prawdziwe relacje i odkrywać rzeczywistość poza ekranem.</p>
                        <p className="text-sm lg:text-lg font-sans pb-4">Wierzymy, że dzieci zasługują na dzieciństwo pełne zabawy, przyjaźni, ruchu i ciekawości świata. Dlatego wspieramy rodziców, edukujemy społeczeństwo i działamy na rzecz ograniczenia zbyt wczesnego dostępu do smartfonów i mediów społecznościowych.</p>
                        <p className="text-sm lg:text-lg font-sans pb-4"><b>Twoja darowizna to realne wsparcie dla działań, które chronią zdrowie i rozwój dzieci i młodzieży.</b></p>
                        <p className="text-sm lg:text-lg font-sans pb-4">Razem możemy sprawić, że więcej dzieci będzie patrzeć na świat własnymi oczami, a nie przez ekran telefonu. ❤️</p>
                    </div>
                    {/* Fanipay widget */}
                    <div className="my-16 md:my-auto md:w-1/2 md:ml-8">
                        <div id="fanipay-widget"></div>
                    </div>
                </div>
            </div>

            {/* Fanipay widget script */}
            <Script
                id="fanimani-widget-script"
                type="text/javascript"
                src="https://widget2.fanimani.pl/GxCmocpavo4VCruB5iScHU.js"
                strategy="afterInteractive"
            />
        </main>
    );
}
