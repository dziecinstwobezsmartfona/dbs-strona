import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ArticleCard from '@/components/ArticleCard';
import { getCategoryBySlug } from '@/lib/articleCategories';

export const dynamic = 'force-dynamic';

export default async function Kategoria({ params }: { params: Promise<{ kategoria: string }> }) {
    const { kategoria } = await params;
    const category = getCategoryBySlug(kategoria);
    if (!category) notFound();

    const payload = await getPayload({ config: configPromise });
    const articlesResult = await payload.find({
        collection: 'articles',
        where: {
            and: [
                { visible: { equals: true } },
                { category: { in: [category.value] } },
            ],
        },
        depth: 1,
        sort: 'order',
        limit: 0,
    });

    return (
        <main className="bg-white min-h-screen flex flex-col items-center justify-top">
            <section className="flex flex-col w-full bg-(--main-accent) ">
                <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center pt-45">
                    <p className="text-5xl md:text-6xl xl:text-7xl font-title mb-8">{category.title}</p>
                    <Link href="/wiedza-i-materialy" className="text-lg xl:text-xl mb-16 underline">← Wiedza i Materiały</Link>
                </div>
            </section>
            <section className="flex flex-col bg-white rounded-3xl items-center justify-center w-full max-w-[1424px] mx-auto mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
                    {articlesResult.docs.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={{
                                id: article.id,
                                title: article.title,
                                slug: article.slug,
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                coverImage: article.coverImage as any,
                                visible: article.visible || false,
                            }}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
