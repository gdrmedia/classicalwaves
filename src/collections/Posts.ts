import type { CollectionConfig } from 'payload'
import { HeroHeaderBlock } from '../blocks/HeroHeader/config.ts'
import { RichTextBlock } from '../blocks/RichText/config.ts'
import { ImageTextSplitBlock } from '../blocks/ImageTextSplit/config.ts'
import { ImageGridBlock } from '../blocks/ImageGrid/config.ts'
import { LookbookGalleryBlock } from '../blocks/LookbookGallery/config.ts'
import { EditorialQuoteBlock } from '../blocks/EditorialQuote/config.ts'
import { TestimonialSliderBlock } from '../blocks/TestimonialSlider/config.ts'
import { CTABannerBlock } from '../blocks/CTABanner/config.ts'
import { VideoEmbedBlock } from '../blocks/VideoEmbed/config.ts'
import { SpacerDividerBlock } from '../blocks/SpacerDivider/config.ts'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'publishedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    { name: 'excerpt', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'publishedAt', type: 'date' },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'blocks',
      type: 'blocks',
      admin: { description: 'Optional sections appended after the main content.' },
      blocks: [
        HeroHeaderBlock, RichTextBlock, ImageTextSplitBlock, ImageGridBlock,
        LookbookGalleryBlock, EditorialQuoteBlock, TestimonialSliderBlock,
        CTABannerBlock, VideoEmbedBlock, SpacerDividerBlock,
      ],
    },
  ],
}
