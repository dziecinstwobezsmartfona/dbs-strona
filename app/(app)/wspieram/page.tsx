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
        <main className="flex min-h-screen items-center justify-center bg-[url(/images/seamless-grass.jpg)]">
            <div className="relative w-full mx-[10%]">
                <Script
                    id="fanimani-widget-script"
                    type="text/javascript"
                    src="https://widget2.fanimani.pl/GxCmocpavo4VCruB5iScHU.js"
                    strategy="afterInteractive"
                />
                <div id="fanipay-widget" className="relative w-full"></div>
            </div>
        </main>
    );
}
