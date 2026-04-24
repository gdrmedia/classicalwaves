import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Classical Waves',
  description: 'Coastal lifestyle apparel.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
