import Link from 'next/link';
import Image from 'next/image';
import Tag from '@/components/Tag';

export default function NaszaMisja() {
    return (
        <main className="bg-[#C2D3FF] min-h-screen flex flex-col items-center justify-top py-45">
            <header className="flex flex-col w-3/4 md:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Nasza Misja</Tag>
                <p className="text-5xl/16 md:text-8xl/32 font-title mb-12">Odzyskajmy dzieciństwo</p>
                <p className="text-lg md:text-xl mb-8"><b>Smartfony fundamentalne zmieniły dzieciństwo</b>. Na gorsze. Dzieci najpierw dostawały smartfony, bo <b>prawie nikt nie był świadomy</b> płynącego z nich zagrożenia, a teraz je dostają, ponieważ sprawy zaszły tak daleko, że <b>rodzice nie widzą innego wyjścia</b>.</p>
                <p className="text-lg md:text-xl mb-8"><b>Właśnie dlatego istnieje ten ruch</b>. Nie po to, by osądzać czy stwarzać podziały, ale by <b>razem stawić czoło temu problemowi</b>, by wspólnie z innymi rodzicami zadać sobie pytanie:</p>
                <p className="text-lg md:text-xl mb-8"><b><i>Może jednak coś da się z tym zrobić?</i></b></p>
                <p className="text-lg md:text-xl mb-12">Samemu jest trudno, ale <b>razem możemy dać dzieciom lepszy start</b>.</p>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className="">
                        <p>tekst</p>
                    </div>
                    <div className="">
                        <Image
                            src="/images/misja-1.jpg"
                            alt=""
                            width={600}
                            height={600}
                            className="rounded-3xl m-8"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
