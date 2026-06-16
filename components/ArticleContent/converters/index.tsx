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

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => <UploadConverter node={node as unknown as MediaUploadNode} />,
});