// tests/blocks.test.ts
import { describe, it, expect } from 'vitest'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/config'
import { RichTextBlock } from '@/blocks/RichText/config'
import { ImageTextSplitBlock } from '@/blocks/ImageTextSplit/config'
import { ImageGridBlock } from '@/blocks/ImageGrid/config'
import { FeaturedProductsBlock } from '@/blocks/FeaturedProducts/config'
import { LookbookGalleryBlock } from '@/blocks/LookbookGallery/config'
import { EditorialQuoteBlock } from '@/blocks/EditorialQuote/config'
import { PressStripBlock } from '@/blocks/PressStrip/config'
import { TestimonialSliderBlock } from '@/blocks/TestimonialSlider/config'
import { FAQAccordionBlock } from '@/blocks/FAQAccordion/config'
import { NewsletterSignupBlock } from '@/blocks/NewsletterSignup/config'
import { ContactFormBlock } from '@/blocks/ContactForm/config'
import { CTABannerBlock } from '@/blocks/CTABanner/config'
import { VideoEmbedBlock } from '@/blocks/VideoEmbed/config'
import { NumberedCardSliderBlock } from '@/blocks/NumberedCardSlider/config'
import { SpacerDividerBlock } from '@/blocks/SpacerDivider/config'

const allBlocks = [
  HeroHeaderBlock, RichTextBlock, ImageTextSplitBlock, ImageGridBlock,
  FeaturedProductsBlock, LookbookGalleryBlock, EditorialQuoteBlock,
  PressStripBlock, TestimonialSliderBlock, FAQAccordionBlock,
  NewsletterSignupBlock, ContactFormBlock, CTABannerBlock,
  VideoEmbedBlock, NumberedCardSliderBlock, SpacerDividerBlock,
]

describe('block configs', () => {
  it('exports exactly 16 blocks', () => {
    expect(allBlocks).toHaveLength(16)
  })

  it.each(allBlocks.map((b) => [b.slug, b]))(
    '%s has a slug and at least one field',
    (_, block) => {
      expect(typeof block.slug).toBe('string')
      expect(block.slug.length).toBeGreaterThan(0)
      expect(Array.isArray(block.fields)).toBe(true)
      expect(block.fields.length).toBeGreaterThan(0)
    },
  )

  it('all slugs are unique', () => {
    const slugs = allBlocks.map((b) => b.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it.each(allBlocks.map((b) => [b.slug, b]))(
    '%s includes the shared anchor field',
    (_, block) => {
      const hasAnchor = block.fields.some(
        (f) => 'name' in f && f.name === 'anchor',
      )
      expect(hasAnchor).toBe(true)
    },
  )
})
