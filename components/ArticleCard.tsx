// app/components/ArticleCard.tsx
// or wherever you prefer to put reusable components

import { getPayload } from 'payload';           // or your import path
import configPromise from '@payload-config';     // ← most common in recent Payload v3+
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Article = {
  id: string;
  visible: boolean;
  title: string;
  slug: string
  coverImage: {
    id: string;
    url: string;
    alt?: string;
    filename: string;
    width?: number;
    height?: number;
  } | null;   // relationship field populated
};

type Props = {
  articleId: string;
  // Optional: you can also pass width/height/className etc. if you want to customize per usage
  className?: string;
};

export default async function ArticleCard({ articleId, className = '' }: Props) {
  const payload = await getPayload({ config: configPromise });

  let article: Article | null = null;

  try {
    article = await payload.findByID({
      collection: 'articles',
      id: articleId,
      depth: 1,           // important → populates the 'image' relationship
    }) as Article | null;
  } catch (err) {
    console.error('Failed to fetch article:', err);
  }

  if (!article || !article.visible) {
    // You can also return null / skeleton / fallback card
    // For strict behavior → notFound()
    notFound();
    // or: return null;
  }

  const imageUrl = article.coverImage?.url;
  if (!imageUrl) {
    // fallback image or skip rendering
    return null;
  }

  return (
    <Link href={`/zasoby/${article.slug}`}>
      <div className={`flex flex-col justify-between overflow-hidden h-[400px] bg-gray-100 rounded-3xl shadow-md transition-transform hover:scale-[1.05] focus:outline-none ${className}`}>
        <div className="h-1/2 relative">
          <Image
            src={imageUrl}
            alt={article.coverImage?.alt || article.title}
            fill={true}
            sizes="50vw"
            className="object-cover"
            priority={false} // ← set true only if above the fold
            loading="eager"
          />
        </div>

        <div className="h-1/2 flex flex-col justify-between">
          <div className="p-4 flex flex-col justify-begin">
            <h3 className="text-lg font-semibold leading-tight mb-auto">
              {article.title}
            </h3>
          </div>

          <div className="p-4 flex flex-row h-[20%] justify-end items-center">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

      </div>
    </Link>
  );
}