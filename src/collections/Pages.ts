import type { CollectionConfig } from 'payload'
import { HeroHeaderBlock } from '../blocks/HeroHeader/config.ts'
import { RichTextBlock } from '../blocks/RichText/config.ts'
import { ImageTextSplitBlock } from '../blocks/ImageTextSplit/config.ts'
import { ImageGridBlock } from '../blocks/ImageGrid/config.ts'
import { FeaturedProductsBlock } from '../blocks/FeaturedProducts/config.ts'
import { LookbookGalleryBlock } from '../blocks/LookbookGallery/config.ts'
import { EditorialQuoteBlock } from '../blocks/EditorialQuote/config.ts'
import { PressStripBlock } from '../blocks/PressStrip/config.ts'
import { TestimonialSliderBlock } from '../blocks/TestimonialSlider/config.ts'
import { FAQAccordionBlock } from '../blocks/FAQAccordion/config.ts'
import { NewsletterSignupBlock } from '../blocks/NewsletterSignup/config.ts'
import { ContactFormBlock } from '../blocks/ContactForm/config.ts'
import { CTABannerBlock } from '../blocks/CTABanner/config.ts'
import { VideoEmbedBlock } from '../blocks/VideoEmbed/config.ts'
import { NumberedCardSliderBlock } from '../blocks/NumberedCardSlider/config.ts'
import { SpacerDividerBlock } from '../blocks/SpacerDivider/config.ts'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'THE WEBSITE',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const slug = data?.slug === 'home' ? '' : (data?.slug ?? '')
        return `/next/preview?path=/${slug}`
      },
    },
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
  versions: {
    drafts: { autosave: { interval: 2000 } },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL path. Use "home" for the homepage.' },
    },
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
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        HeroHeaderBlock, RichTextBlock, ImageTextSplitBlock, ImageGridBlock,
        FeaturedProductsBlock, LookbookGalleryBlock, EditorialQuoteBlock,
        PressStripBlock, TestimonialSliderBlock, FAQAccordionBlock,
        NewsletterSignupBlock, ContactFormBlock, CTABannerBlock,
        VideoEmbedBlock, NumberedCardSliderBlock, SpacerDividerBlock,
      ],
    },
  ],
}
