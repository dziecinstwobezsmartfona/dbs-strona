import type { Metadata } from "next";
import { Montserrat, Anton, Victor_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const victor = Victor_Mono({ subsets: ['latin'], variable: '--font-victor' });

export const metadata: Metadata = {
  title: "Dzieciństwo Bez Smartfona",
  description: "Strona akcji Dzieciństwo Bez Smartfona",
};

export default function RootLayout ({
  children,
}: {
  children:React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${montserrat.variable} ${anton.variable} ${victor.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
