import Image from 'next/image';
import Tag from '@/components/Tag';

export default function NaszaMisja() {
    return (
        <main className="bg-linear-to-b from-[#C2D3FF] to-white to-15% min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 md:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Rozwiązanie</Tag>
                <p className="text-5xl/16 md:text-8xl/32 font-title mb-12">Razem mamy moc</p>
                <p className="text-lg md:text-xl mb-12 font-bold">Wspólnymi siłami możemy dokonać kulturowej zmiany.</p>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                <div className="flex flex-col md:flex-row items-center justify-center w-full">
                    <div className="text-left order-2 md:order-1 w-full p-8 md:p-16">
                        <p className="text-3xl md:text-5xl/16 font-title pb-8">Odsuwamy w czasie, razem</p>
                        <p className="text-sm md:text-lg font-sans pb-4">Smartfony to “klucze do królestwa” mediów społecznościowych i całego internetu.</p>
                        <p className="text-sm md:text-lg font-sans pb-4">Jak wielką ulgę poczulibyśmy wiedząc, że nareszcie to wszystko nie ma dostępu do naszych dzieci przez 24 godziny na dobę, 7 dni w tygodniu?</p>
                        <p className="text-sm md:text-lg font-sans pb-4">To możliwe. Naszym celem jest opóźnienie momentu w życiu dziecka, w którym dostaje ono swój pierwszy smartfon.</p>
                        <p className="text-sm md:text-lg font-sans pb-4">Im później wręczymy go dziecku, tym więcej czasu zyskamy, by nauczyć je, jak radzić sobie z działaniem algorytmów, jak unikać negatywnego wpływu mediów społecznościowych i jak budować odporność psychiczną, zwłaszcza w obszarze narastających lęków.</p>
                        <p className="text-sm md:text-lg font-sans font-bold">Dlatego dziś mówimy jasno: razem opóźnijmy ten moment.</p>
                    </div>
                    <div className="order-1 md:order-2 w-full p-16">
                        <Image
                            src="/images/klucze.png"
                            alt=""
                            width={500}
                            height={500}
                            className="rounded-3xl w-full h-auto"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center w-full">
                    <div className="text-left order-2 md:order-2 w-full p-8 md:p-16">
                        <p className="text-3xl md:text-5xl/16 font-title pb-8">Właśnie po to powstał Pakt Rodziców</p>
                        <p className="text-sm md:text-lg font-sans pb-4">Doskonale wiemy, że gdy jeden rodzic mówi „nie”, może czuć się osamotniony, jednak kiedy robimy to wspólnie – w rodzinie, w społeczności szkolnej czy w lokalnej grupie –  staje się to dużo prostsze.</p>
                        <p className="text-sm md:text-lg font-sans pb-4">I właśnie o to chodzi w pakcie: o wspólne zobowiązanie, że nie dajemy dzieciom smartfonów przed 14-tym, a dostępu do mediów społecznościowych przed 16-tym rokiem życia.</p>
                        <p className="text-sm md:text-lg font-sans">Inicjatywa opiera się na społecznościach szkolnych – im więcej z nas dołączy, tym większą siłę zyskujemy i tym silniejszy jest nasz głos.</p>
                    </div>
                    <div className="order-1 md:order-1 w-full p-16">
                        <Image
                            src="/images/pakt-rodzicow.png"
                            alt=""
                            width={500}
                            height={500}
                            className="rounded-3xl w-full h-auto"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </section>
            <section className="flex flex-col bg-(--background) rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                <div className="flex flex-col w-full p-8 md:p-16 text-center text-3xl md:text-5xl/16 font-title">
                    <div className="flex flex-col w-full md:w-3/4 mx-auto items-center justify-center text-center">
                        <p className="text-3xl md:text-5xl/16 font-title mb-12">Nie jesteśmy przeciwnikami technologii, jesteśmy <i>zwolennikami dobrego dzieciństwa</i></p>
                        <p className="text-lg md:text-xl mb-6 font-sans">Wiemy, że technologia ułatwia wiele obszarów życia człowieka i przyczynia się do rozwoju ludzkości. Ważne jest to, jak z niej korzystamy. Chcemy, aby nasze dzieci dorastały z przekonaniem, że technologia jest narzędziem, a nie czymś, od czego zależy ich samopoczucie.</p>
                        <p className="text-lg md:text-xl mb-6 font-sans">Wierzymy w stopniowe, rozsądne budowanie kompetencji cyfrowych i dawanie dzieciom przestrzeni na to, by mogły po prostu być dziećmi. Bo świat online i tak stanie się kiedyś częścią ich życia.</p>
                        <p className="text-lg md:text-xl mb-12 font-sans">Dzieciństwo Bez Smartfona to droga "złotego środka", równowagi w zdrowym korzystaniu z technologii, a nie zakazów.</p>
                        <p className="text-lg md:text-xl mb-6 font-sans font-bold">Poniżej przedstawiamy model, który sprawdza się u wielu rodzin:</p>
                    </div>
                    <div className="w-full p-4"><div className="w-full border-b border-gray-300"></div></div>
                    <div className="flex flex-col md:flex-row w-full items-center justify-center p-8 md:p-16">
                        <div className="flex flex-col">
                            <Image
                                src="/images/solution-no-phone.webp"
                                alt=""
                                width={100}
                                height={100}
                            />
                            <Tag className="bg-black/10 text-foreground mb-12">0 - 11 lat</Tag>
                            <p className="text-xl md:text-3xl font-title mb-8">Bez telefonu</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
