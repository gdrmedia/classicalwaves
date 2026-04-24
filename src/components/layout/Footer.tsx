// src/components/layout/Footer.tsx
import Link from 'next/link'
import { getGlobal } from '@/lib/payload.server'

export async function Footer() {
  const footer = await getGlobal('footer')

  return (
    <footer className="bg-stone-50 border-t border-stone-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {footer.linkGroups && footer.linkGroups.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {footer.linkGroups.map((group) => (
              <div key={group.id}>
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">
                  {group.heading}
                </p>
                <ul className="space-y-2">
                  {group.links?.map((link) => (
                    <li key={link.id}>
                      <Link href={link.url} className="text-sm text-stone-600 hover:text-stone-900">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {footer.newsletterBlurb && (
          <p className="text-sm text-stone-500 mb-8 max-w-sm">{footer.newsletterBlurb}</p>
        )}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-stone-200">
          <p className="text-xs text-stone-400">
            {footer.copyright ?? `© ${new Date().getFullYear()} Classical Waves`}
          </p>
          {footer.socialLinks && footer.socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {footer.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-500 hover:text-stone-900 capitalize"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
