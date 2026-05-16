import Image from 'next/image';
import Tag from '@/components/Tag';

export default function RegulaminPlatnosci() {
    return (
        <main className="bg-(--main-accent) min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Regulamin Płatności</Tag>
                <p className="text-5xl/16 md:text-6xl/20 xl:text-8xl/32 font-title mb-12">Regulamin Płatności</p>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                <div className="text-left w-full p-8 lg:p-16">
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        W celu przekazania dobrowolnej wpłaty na rzecz Stowarzyszenia "Dzieciństwo Bez Smartfona" nasz serwis udostępnia płatności elektroniczne. Dostępne formy płatności to:
                    </p>
                    <ol type="a" className="text-sm xl:text-lg font-sans pb-6 list-disc list-inside">
                        <li>Karty płatnicze: Visa, Visa Electron, MasterCard, MasterCard Electronic, Maestro</li>
                        <li>Płatności online</li>
                        <li>Płatności mobilne BLIK</li>
                    </ol>
                    <Image
                        src="/images/tpay-logotypy.png"
                        alt=""
                        width={768}
                        height={90}
                        className="rounded-2xl h-auto mx-auto"
                    />
                    <p className="text-sm xl:text-lg font-sans py-6">
                        Podmiotem świadczącym obsługę płatności online drogą elektroniczną jest Krajowy Integrator Płatności S.A.
                    </p>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        W przypadku wystąpienia konieczność zwrotu środków za transakcję dokonaną przez wpłacającego kartą płatniczą przyjmujący wpłatę dokonana zwrotu na rachunek bankowy przypisany do karty płatniczej Wpłacającego.
                    </p>
                </div>
            </section>
        </main>
    );
}
