import Heart from "@/components/Heart";

export default function DziekujemyZaWplate() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[url(/images/seamless-grass.jpg)]">

            <div className="relative w-full mx-[10%]">

                {/* Nice big heart */}
                <Heart className="max-w-200 max-h-200 mx-auto text-[#780606] heartbeat" />

                {/* Text overlaid on top of the heart */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-title text-white">Dziękujemy!</span>
                </div>

            </div>

        </main>
    );
}
