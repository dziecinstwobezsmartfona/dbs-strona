import Link from 'next/link';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ArticleCard from './ArticleCard';
import { Article, Media } from '@/payload-types';

type Props = {
  slugs?: string[];
  title?: string;
  seeAllHref?: string;
  seeAllLabel?: string;
  className?: string;
};

type CardArticle = {
  id: string;
  visible: boolean;
  title: string;
  slug: string;
  coverImage: {
    id: string;
    url: string;
    alt?: string;
    filename: string;
    width?: number;
    height?: number;
  } | null;
};

function toCardArticle(article: Article): CardArticle {
  const media =
    article.coverImage && typeof article.coverImage === 'object'
      ? (article.coverImage as Media)
      : null;

  return {
    id: article.id,
    visible: article.visible ?? false,
    title: article.title,
    slug: article.slug,
    coverImage: media
      ? {
          id: media.id,
          url: media.url ?? '',
          alt: media.alt,
          filename: media.filename ?? '',
          width: media.width ?? undefined,
          height: media.height ?? undefined,
        }
      : null,
  };
}

export default async function ArticleShowcase({
  slugs = [],
  title = 'Odkrywaj DBS',
  seeAllHref = '/wiedza-i-materialy',
  seeAllLabel = 'Wszystkie materiały',
  className = '',
}: Props) {
  const payload = await getPayload({ config: configPromise });

  const providedSlugs = slugs.slice(0, 5);

  let specifiedArticles: Article[] = [];
  if (providedSlugs.length > 0) {
    const result = await payload.find({
      collection: 'articles',
      where: {
        and: [
          { visible: { equals: true } },
          { slug: { in: providedSlugs } },
        ],
      },
      depth: 1,
      limit: 5,
    });
    specifiedArticles = result.docs as Article[];
  }

  const specifiedIds = specifiedArticles.map((a) => a.id);
  const needed = 5 - specifiedArticles.length;

  let fillerArticles: Article[] = [];
  if (needed > 0) {
    const andClauses: { [key: string]: unknown }[] = [
      { visible: { equals: true } },
    ];
    if (specifiedIds.length > 0) {
      andClauses.push({ id: { not_in: specifiedIds } });
    }

    const result = await payload.find({
      collection: 'articles',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      where: { and: andClauses } as any,
      depth: 1,
      sort: '-createdAt',
      limit: 50,
    });

    fillerArticles = [...result.docs]
      .sort(() => Math.random() - 0.5)
      .slice(0, needed) as Article[];
  }

  const articles = [...specifiedArticles, ...fillerArticles].slice(0, 5);
  if (articles.length === 0) return null;

  const cards = articles.map(toCardArticle);
  const [featured, ...rest] = cards;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between pb-6 mb-4 border-b border-(--main-accent)">
        <h2 className="text-4xl lg:text-6xl font-title text-foreground">{title}</h2>
        <Link
          href={seeAllHref}
          className="hidden xl:flex items-center bg-(--main-accent) rounded-3xl px-6 py-4 text-xl lg:text-2xl font-title text-(--foreground) hover:bg-(--secondary-accent) transition-colors"
        >
          {seeAllLabel}
        </Link>
      </div>

      {/*
        Narrow  (<md):  1-column stack
        Medium (md–xl): 2-column grid  →  2 + 2 + 1
        Wide    (xl+):  4-column / 2-row grid; featured card spans cols 1–2, rows 1–2
      */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 xl:gap-12">
        <div className="xl:col-span-2 xl:row-span-2">
          <ArticleCard article={featured} className="xl:!h-full" titleClassName="xl:text-4xl"/>
        </div>
        {rest.map((card) => (
          <ArticleCard key={card.id} article={card} />
        ))}
      </div>

      <div className="xl:hidden mt-4">
        <Link
          href={seeAllHref}
          className="flex items-center justify-center bg-(--main-accent) rounded-full w-full px-6 py-4 text-xl lg:text-2xl font-title text-(--foreground) hover:bg-(--secondary-accent) transition-colors"
        >
          {seeAllLabel}
        </Link>
      </div>
    </div>
  );
}
