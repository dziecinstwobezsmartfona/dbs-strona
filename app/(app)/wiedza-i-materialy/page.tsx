import ArticleShowcase from '@/components/ArticleShowcase';
import SectionNav from '@/components/SectionNav';
import { ARTICLE_CATEGORIES } from '@/lib/articleCategories';

export const dynamic = 'force-dynamic';

export default function Pomoce() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-top">
            {/* Header Section */}
            <section className="flex flex-col w-full bg-(--main-accent) ">
                <div className="flex flex-col w-3/4 lg:w-1/2 mx-auto items-center justify-center text-center pt-45">
                    <p className="text-5xl md:text-6xl xl:text-7xl font-title mb-8">Wiedza i Materiały</p>
                    <p className="text-lg md:text-base xl:text-xl mb-8">Poniżej znajdziesz ciekawe wiadomości, artykuły, odpowiedzi na pytania oraz inne zasoby, które mogą okazać się pomocne.</p>
                    <SectionNav
                        className="flex flex-wrap justify-center gap-3 mb-16"
                        items={ARTICLE_CATEGORIES.map((c) => ({ id: c.slug, label: c.title }))}
                    />
                </div>
            </section>
            {ARTICLE_CATEGORIES.map((c, i) => (
                <section key={c.slug} id={c.slug} className={`scroll-mt-28 w-full ${i % 2 === 0 ? 'bg-white' : 'bg-(--background)'}`}>
                    <div className="w-3/4 mx-auto py-24">
                        <ArticleShowcase
                            category={c.value}
                            title={c.title}
                            seeAllHref={`/wiedza-i-materialy/${c.slug}`}
                            seeAllLabel="Zobacz wszystkie"
                        />
                    </div>
                </section>
            ))}
        </main>
    );
}
