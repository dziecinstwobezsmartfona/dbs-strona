import ArticleCard from '@/components/ArticleCard';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

export default async function Pomoce() {
    const payload = await getPayload({ config: configPromise });

    // Fetch all visible articles with populated coverImage in a single query
    const articlesResult = await payload.find({
        collection: 'articles',
        where: {
            visible: { equals: true }
        },
        depth: 1, // Populate image relationship
        sort: '-createdAt', // Sort by creation date (newest first)
    });

    const articles = articlesResult.docs;

    return (
        <main className="bg-white min-h-screen flex flex-col items-center justify-top">
            {/* Header Section */}
            <section className="flex flex-col w-full bg-(--main-accent) ">
                <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center pt-45">
                    <p className="text-5xl md:text-6xl xl:text-7xl font-title mb-8">Wiedza i Materiały</p>
                    <p className="text-lg md:text-base xl:text-xl mb-16">Poniżej znajdziesz ciekawe wiadomości, artykuły, odpowiedzi na pytania oraz inne zasoby, które mogą okazać się pomocne.</p>
                </div>
            </section>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-full max-w-[1424px] mx-auto mb-16">
                {/* Articles content grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
                    {articles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={{
                                id: article.id,
                                title: article.title,
                                slug: article.slug,
                                coverImage: article.coverImage as any,
                                visible: article.visible || false
                            }}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}