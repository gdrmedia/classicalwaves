// src/blocks/HeroHeader/Component.tsx
import type { HeroHeaderBlock, Media } from '@/payload-types'
import Image from 'next/image'

const overlayMap: Record<string, string> = {
  none: 'bg-transparent',
  light: 'bg-black/20',
  medium: 'bg-black/40',
  dark: 'bg-black/60',
}

export function HeroHeaderComponent({
  image, heading, subheading, ctaText, ctaUrl, overlayOpacity, anchor,
}: HeroHeaderBlock) {
  const img = typeof image === 'object' ? (image as Media) : null
  const overlay = overlayMap[overlayOpacity ?? 'medium'] ?? 'bg-black/40'

  return (
    <section
      id={anchor ?? undefined}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {img?.url && (
        <Image
          src={img.url}
          alt={img.alt ?? heading}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">{heading}</h1>
        {subheading && (
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl mx-auto">{subheading}</p>
        )}
        {ctaUrl && ctaText && (
          <a
            href={ctaUrl}
            className="inline-block bg-white text-stone-900 px-8 py-3 text-sm font-medium hover:bg-stone-100 transition-colors"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
