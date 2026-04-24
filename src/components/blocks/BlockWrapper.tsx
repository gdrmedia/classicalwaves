// src/components/blocks/BlockWrapper.tsx
import React from 'react'

type BackgroundData = {
  type?: 'none' | 'color' | 'image' | null
  color?: string | null
  image?: { url?: string | null } | number | null
} | null | undefined

type Props = {
  children: React.ReactNode
  anchor?: string | null
  padding?: 'sm' | 'md' | 'lg' | null
  background?: BackgroundData
  className?: string
}

const padMap: Record<string, string> = {
  sm: 'py-8',
  md: 'py-16',
  lg: 'py-24',
}

export function BlockWrapper({ children, anchor, padding, background, className = '' }: Props) {
  const padClass = padMap[padding ?? 'md'] ?? 'py-16'

  const style: React.CSSProperties = {}
  if (background?.type === 'color' && background.color) {
    style.backgroundColor = background.color
  } else if (background?.type === 'image' && typeof background.image === 'object' && background.image?.url) {
    style.backgroundImage = `url(${background.image.url})`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  }

  return (
    <section id={anchor ?? undefined} className={`${padClass} ${className}`} style={style}>
      {children}
    </section>
  )
}
