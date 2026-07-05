import type { Block } from 'payload'

export const YouTubeBlock: Block = {
  slug: 'youtube',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'YouTube URL',
    },
  ],
}