import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const font = Montserrat({ subsets: ['latin'] });

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
    <html lang="pl">
      <body className={font.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
