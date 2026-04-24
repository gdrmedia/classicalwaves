// src/components/layout/Header.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getGlobal } from '@/lib/payload.server'

export async function Header() {
  const header = await getGlobal('header')

  return (
    <>
      {header.announcementBar?.enabled && header.announcementBar.text && (
        <div className="bg-stone-800 text-white text-center py-2 px-4 text-sm">
          {header.announcementBar.link ? (
            <a href={header.announcementBar.link} className="hover:underline">
              {header.announcementBar.text}
            </a>
          ) : (
            header.announcementBar.text
          )}
        </div>
      )}
      <header className="bg-white border-b border-stone-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg tracking-wide">
            {header.logo && typeof header.logo === 'object' && 'url' in header.logo && header.logo.url ? (
              <Image
                src={header.logo.url}
                alt="Classical Waves"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />
            ) : (
              'Classical Waves'
            )}
          </Link>
          {header.navLinks && header.navLinks.length > 0 && (
            <nav className="hidden md:flex items-center gap-8">
              {header.navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  className="text-sm text-stone-700 hover:text-stone-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
          <Link href="/cart" className="text-sm text-stone-700 hover:text-stone-900">
            Cart
          </Link>
        </div>
      </header>
    </>
  )
}
