import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ActivityCard from '@/components/ActivityCard';

export default async function Dzialam() {
    const payload = await getPayload({ config: configPromise });
    const { docs: activities } = await payload.find({
        collection: 'activities',
        where: { visible: { equals: true } },
        depth: 1,
        limit: 100,
    });

    return (
        <main className="bg-[url(/images/card-bg-01.webp)] min-h-screen flex flex-col items-center justify-top">
            {/* Header Section */}
            <section className="flex flex-col w-full pt-45">
                <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center">
                    <p className="text-5xl md:text-6xl xl:text-7xl font-title mb-8">Działaj razem z nami!</p>
                    <p className="text-lg md:text-base xl:text-xl mb-16">Nie musisz być z problemem smartfonów w rękach dzieci sam — działajmy razem, ramię w ramię.</p>
                </div>
            </section>
            <section className="flex flex-col bg-white items-center justify-center w-full mx-auto">
                {/* List of activities */}
                <div className="w-3/4 lg:w-[60%] mx-auto">
                    <p className="text-3xl/10 md:text-5xl/20 xl:text-6xl/24 my-8 text-center font-title">Oto co możesz zrobić:</p>
                    <div className="flex flex-col gap-8 pb-24">
                        {activities.map((activity) => (
                            <ActivityCard key={activity.id} id={activity.id} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
