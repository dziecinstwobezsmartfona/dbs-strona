import Link from 'next/link';
import Image from 'next/image';
import Tag from '@/components/Tag';
import ArticleCard from '@/components/ArticleCard';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export default async function Zasoby() {
    const payload = await getPayload({ config: configPromise });

    // Fetch first 20 visible articles
    const articlesResult = await payload.find({
        collection: 'articles',
        where: {
            visible: { equals: true }
        },
        limit: 20,
        depth: 1, // Populate image relationship
    });

    const articles = articlesResult.docs;

    return (
        <main className="bg-white min-h-screen flex flex-col items-center justify-top">
            {/* Header Section */}
            <section className="flex flex-col w-full bg-(--main-accent) ">
                <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center pt-45">
                    <p className="text-5xl md:text-6xl xl:text-7xl font-title mb-8">Zasoby</p>
                    <p className="text-lg md:text-base xl:text-xl mb-16">Poniżej znajdziesz ciekawe wiadomości, artykuły, odpowiedzi na pytania oraz inne zasoby, które mogą okazać się pomocne.</p>
                </div>
            </section>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-full md:w-3/4 mx-auto mb-16">
                {/* Articles content grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} articleId={article.id} />
                    ))}
                </div>
            </section>
        </main>
    );
}
