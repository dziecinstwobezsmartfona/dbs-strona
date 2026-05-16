import Tag from "@/components/Tag";

export default function NieudanaPlatnosc() {
    return (
        <main className="bg-(--main-accent) min-h-screen flex flex-col items-center justify-top pt-45">
            <header className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                <Tag className="bg-black/10 text-foreground mb-12">Nieudana płatność</Tag>
            </header>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-3/4 mx-auto mb-16">
                <div className="text-left w-full p-8 lg:p-16">
                    <h1 className="text-2xl xl:text-3xl font-title pb-6">Płatność nieudana - prosimy o sprawdzenie</h1>
                    <p className="text-sm xl:text-lg font-sans pb-6">
                        Płatność nie została potwierdzona przez Twój bank lub wydawcę karty płatniczej.
                    </p>
                    <p className="text-sm xl:text-lg font-sans">
                        Spróbuj ponownie rozpoczynając płatność od początku albo klikając w link, który otrzymasz emailem.
                    </p>
                </div>
            </section>
        </main>
    );
}
