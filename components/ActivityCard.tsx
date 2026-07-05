import Image from 'next/image';
import Link from 'next/link';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Activity, Media } from '@/payload-types';

type Props = {
  id: string;
  className?: string;
};

export default async function ActivityCard({ id, className = '' }: Props) {
  const payload = await getPayload({ config: configPromise });

  let activity: Activity;
  try {
    activity = await payload.findByID({
      collection: 'activities',
      id,
      depth: 1,
    }) as Activity;
  } catch {
    return null;
  }

  if (!activity || activity.visible === false) return null;

  const media =
    activity.image && typeof activity.image === 'object'
      ? (activity.image as Media)
      : null;

  const hasImage = !!media?.url;
  const href = activity.link ?? undefined;

  const inner = (
    <div
      className={`flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-8 bg-(--purple-light) rounded-3xl overflow-hidden p-6 ${className}`}
    >
      {hasImage && (
        <div className="relative w-[300px] max-w-[90%] h-[170px] rounded-3xl bg-black">
          <Image
            src={media!.url!}
            alt={media!.alt || activity.name}
            fill
            className="object-cover rounded-3xl"
          />
        </div>
      )}
      <div className={`flex flex-col gap-2 ${!hasImage ? 'items-center text-left w-full' : 'items-center text-left sm:items-start sm:text-left w-[90%] sm:w-2/3'}`}>
        <h3 className="text-4xl font-title text-foreground leading-tight">{activity.name}</h3>
        <p className="text-lg text-foreground">{activity.description}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:opacity-90 transition-opacity">
        {inner}
      </Link>
    );
  }

  return inner;
}
