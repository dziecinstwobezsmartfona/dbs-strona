import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Article from '@/components/Article';

export const dynamic = 'force-dynamic';

export default async function ZasobyArtykul({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const payload = await getPayload({ config: configPromise });

    // Fetch first 20 visible articles
    const articlesResult = await payload.find({
        collection: 'articles',
        where: {
            visible: { equals: true }
        },
        // limit: 20, // When the number of articles becomes too large to hanle on one page, consider implementing pagination
        depth: 1, // Populate image relationship
    });

    const articles = articlesResult.docs;

    return (
        <Article slug={slug} />
    );
}
