// src/components/blocks/BlockRenderer.tsx
import type { Page } from '@/payload-types'
import { HeroHeaderComponent } from '@/blocks/HeroHeader/Component'
import { RichTextComponent } from '@/blocks/RichText/Component'
import { ImageTextSplitComponent } from '@/blocks/ImageTextSplit/Component'
import { ImageGridComponent } from '@/blocks/ImageGrid/Component'
import { FeaturedProductsComponent } from '@/blocks/FeaturedProducts/Component'
import { LookbookGalleryComponent } from '@/blocks/LookbookGallery/Component'
import { EditorialQuoteComponent } from '@/blocks/EditorialQuote/Component'
import { PressStripComponent } from '@/blocks/PressStrip/Component'
import { TestimonialSliderComponent } from '@/blocks/TestimonialSlider/Component'
import { FAQAccordionComponent } from '@/blocks/FAQAccordion/Component'
import { NewsletterSignupComponent } from '@/blocks/NewsletterSignup/Component'
import { ContactFormComponent } from '@/blocks/ContactForm/Component'
import { CTABannerComponent } from '@/blocks/CTABanner/Component'
import { VideoEmbedComponent } from '@/blocks/VideoEmbed/Component'
import { NumberedCardSliderComponent } from '@/blocks/NumberedCardSlider/Component'
import { SpacerDividerComponent } from '@/blocks/SpacerDivider/Component'

type Block = NonNullable<Page['blocks']>[number]

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.blockType) {
          case 'hero-header':        return <HeroHeaderComponent key={i} {...block} />
          case 'rich-text':          return <RichTextComponent key={i} {...block} />
          case 'image-text-split':   return <ImageTextSplitComponent key={i} {...block} />
          case 'image-grid':         return <ImageGridComponent key={i} {...block} />
          case 'featured-products':  return <FeaturedProductsComponent key={i} {...block} />
          case 'lookbook-gallery':   return <LookbookGalleryComponent key={i} {...block} />
          case 'editorial-quote':    return <EditorialQuoteComponent key={i} {...block} />
          case 'press-strip':        return <PressStripComponent key={i} {...block} />
          case 'testimonial-slider': return <TestimonialSliderComponent key={i} {...block} />
          case 'faq-accordion':      return <FAQAccordionComponent key={i} {...block} />
          case 'newsletter-signup':  return <NewsletterSignupComponent key={i} {...block} />
          case 'contact-form':       return <ContactFormComponent key={i} {...block} />
          case 'cta-banner':         return <CTABannerComponent key={i} {...block} />
          case 'video-embed':        return <VideoEmbedComponent key={i} {...block} />
          case 'numbered-card-slider': return <NumberedCardSliderComponent key={i} {...block} />
          case 'spacer-divider':     return <SpacerDividerComponent key={i} {...block} />
          default:                   return null
        }
      })}
    </>
  )
}
