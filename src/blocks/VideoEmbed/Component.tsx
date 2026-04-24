// src/blocks/VideoEmbed/Component.tsx
import type { VideoEmbedBlock } from '@/payload-types'
import { BlockWrapper } from '@/components/blocks/BlockWrapper'

function toEmbedUrl(url: string): string {
  // YouTube: https://www.youtube.com/watch?v=ID → https://www.youtube.com/embed/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  // Vimeo: https://vimeo.com/ID → https://player.vimeo.com/video/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  // Anything else (MP4, etc.) returned as-is
  return url
}

function isMp4(url: string): boolean {
  return url.endsWith('.mp4') || url.includes('.mp4?')
}

export function VideoEmbedComponent({ url, caption, anchor, padding, background }: VideoEmbedBlock) {
  const embedUrl = toEmbedUrl(url)

  return (
    <BlockWrapper anchor={anchor} padding={padding} background={background}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="aspect-video relative bg-stone-100 overflow-hidden">
          {isMp4(url) ? (
            <video src={url} controls className="w-full h-full object-cover" />
          ) : (
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={caption ?? 'Embedded video'}
            />
          )}
        </div>
        {caption && (
          <p className="mt-3 text-sm text-stone-500 text-center">{caption}</p>
        )}
      </div>
    </BlockWrapper>
  )
}
