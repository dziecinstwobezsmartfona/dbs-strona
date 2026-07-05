import type { DefaultNodeTypes, SerializedUploadNode } from '@payloadcms/richtext-lexical';
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';
import type { Media } from '@/payload-types';
import Image from 'next/image';

type NodeTypes = DefaultNodeTypes;

// Mirror exactly the fields you added in UploadFeature
type ImageExtraFields = {
  width?: 'w-full' | 'w-3/4' | 'w-2/3' | 'w-1/2' | 'w-1/3' | 'w-1/4';
  alignment?: 'left' | 'center' | 'right';
  rounded?: boolean;
};

type MediaUploadNode = Omit<SerializedUploadNode, 'value' | 'fields'> & {
  value: Media;
  fields: ImageExtraFields;
};

// Lookup maps keep every class as a literal string in this source file,
// so Tailwind's compiler sees them and won't purge them from the bundle.
const widthClass: Record<NonNullable<ImageExtraFields['width']>, string> = {
  'w-full': 'w-full',
  'w-3/4': 'w-3/4',
  'w-2/3': 'w-2/3',
  'w-1/2': 'w-1/2',
  'w-1/3': 'w-1/3',
  'w-1/4': 'w-1/4',
};

const alignmentClass: Record<NonNullable<ImageExtraFields['alignment']>, string> = {
  left: 'float-left mr-6 mb-4',    // text wraps to the right
  right: 'float-right ml-6 mb-4',  // text wraps to the left
  center: 'mx-auto my-6 block',    // own line, centered, no wrap
};

const UploadConverter: React.FC<{ node: MediaUploadNode }> = ({ node }) => {
  if (node.relationTo !== 'media' || typeof node.value !== 'object') return null;

  const { url, alt, width: imgWidth, height: imgHeight } = node.value;

  const width = node.fields?.width ?? 'w-full';
  const alignment = node.fields?.alignment ?? 'left';
  const rounded = node.fields?.rounded ?? false;

  // A full-width image can't have text wrap around it, so render it as a block.
  const align = width === 'w-full' ? alignmentClass.center : alignmentClass[alignment];

  const figureClasses = `${widthClass[width]} ${align}`;
  const imgClasses = `w-full h-auto${rounded ? ' rounded-2xl' : ''}`;

  return (
    <figure className={figureClasses}>
      <Image
        src={url ?? ''}
        alt={alt ?? ''}
        width={imgWidth ?? 0}
        height={imgHeight ?? 0}
        className={imgClasses}
        sizes="(max-width: 768px) 100vw, 75vw"
      />
    </figure>
  );
};

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1);
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) return parsed.pathname.split('/embed/')[1].split('/')[0];
      return parsed.searchParams.get('v');
    }
  } catch {
    // invalid URL
  }
  return null;
}

type YouTubeBlockFields = { blockType: 'youtube'; blockName: string; id: string; url: string };

const YouTubeConverter: React.FC<{ node: { fields: YouTubeBlockFields } }> = ({ node }) => {
  const videoId = extractYouTubeId(node.fields.url);
  if (!videoId) return null;
  const src = `https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1`;
  return (
    <div className="aspect-video w-full mx-auto overflow-hidden rounded-3xl my-8">
      <iframe
        className="w-full h-full"
        src={src}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => <UploadConverter node={node as unknown as MediaUploadNode} />,
  blocks: {
    youtube: ({ node }: { node: { fields: YouTubeBlockFields } }) => <YouTubeConverter node={node} />,
  },
});