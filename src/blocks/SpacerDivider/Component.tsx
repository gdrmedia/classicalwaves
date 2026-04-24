// src/blocks/SpacerDivider/Component.tsx
import type { SpacerDividerBlock } from '@/payload-types'

const sizeMap: Record<string, string> = {
  sm: 'h-8',
  md: 'h-16',
  lg: 'h-32',
}

export function SpacerDividerComponent({ type, size, anchor }: SpacerDividerBlock) {
  if (type === 'divider') {
    return (
      <div id={anchor ?? undefined} className="max-w-6xl mx-auto px-6 py-4">
        <hr className="border-stone-200" />
      </div>
    )
  }
  return <div id={anchor ?? undefined} className={sizeMap[size ?? 'md'] ?? 'h-16'} />
}
