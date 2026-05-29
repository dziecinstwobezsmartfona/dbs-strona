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
                        <p className="text-3xl lg:text-5xl/16 font-title pb-8">Wspieram Dzieciństwo Bez Smartfona</p>
                        <p className="text-sm lg:text-lg font-sans">Wspierając Stowarzyszenie Dzieciństwo Bez Smartfona, pomagasz realizować nasze cele regulaminowe, jakimi są:</p>
                        <ul className="text-sm lg:text-lg font-sans list-disc pl-10 py-4">
                            <li className="py-2">zmiana kulturowa polegająca na nie dawaniu dzieciom smartfonów do 14-tego roku życia, a mediów społecznościowych do 16-tego roku życia</li>
                            <li className="py-2">jednoczenie rodziców w Polsce i wspieranie ich w odraczaniu momentu wręczenia swojemu dziecku smartfona i mediów społecznościowych</li>
                            <li className="py-2">profilaktyka zdrowia dzieci i młodzieży w zakresie korzystania z technologii</li>
                            <li className="py-2">uświadamianie i edukowanie społeczeństwa odnośnie wpływu smartfonów na życie i rozwój dzieci.</li>
                        </ul>
                        <p className="text-sm lg:text-lg font-sans">Zebrane środki będą przeznaczone m.in. na koszty licencji, administracyjne i promocyjne stowarzysznia.</p>                        
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
