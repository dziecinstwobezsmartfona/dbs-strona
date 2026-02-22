import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Article } from '@/payload-types';
import Tag from './Tag';
import { ArticleContent } from '@/components/ArticleContent';

type Props = {
  slug: string;
  // Optional: you can also pass width/height/className etc. if you want to customize per usage
  className?: string;
};

export default async function Article({ slug }: Props) {
  const payload = await getPayload({ config: configPromise });

  const documents = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug }
    },
    depth: 1,
  });

  const article = documents.docs[0] as Article | null;

  if (!article || !article.visible) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center">

      {/* Header Section */}
      <section className="bg-(--main-accent) w-full">
        <div className="flex flex-col w-[90%] max-w-[1024px] mx-auto">
          <Tag className="bg-black/10 text-foreground mb-12 mt-45 mx-auto">Zasoby</Tag>
          <div className="flex flex-col items-center justify-center text-left mb-30">
            <p className="text-5xl md:text-6xl xl:text-7xl font-title mb-8">{article?.title}</p>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="flex flex-col items-center w-[90%] max-w-[1024px] mx-auto">
        <div className="rounded-4xl relative w-full overflow-hidden mt-[-75px]">
          <Image
            src={article.coverImage && typeof article.coverImage === 'object' ? article.coverImage.url || '' : ''}
            alt={article.coverImage && typeof article.coverImage === 'object' ? article.coverImage.alt || '' : ''}
            width={article.coverImage && typeof article.coverImage === 'object' ? article.coverImage.width || 0 : 0}
            height={article.coverImage && typeof article.coverImage === 'object' ? article.coverImage.height || 0 : 0}
            className="object-cover w-full h-auto"
          />
        </div>
      </section>

      {/* Article content */}
      <section className="bg-white items-left justify-top w-[90%] max-w-[1024px] py-16 mx-auto">
        <div className="flex flex-col">
          <div className="prose lg:prose-xl prose-headings:font-title prose-headings:text-(--foreground) text-left w-full">
            <ArticleContent data={article.content} />
          </div>
        </div>
      </section>

    </main>
  );
}