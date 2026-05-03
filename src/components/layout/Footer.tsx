'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { useTranslation, useLocale } from '@/lib/useTranslation'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslation()
  const locale = useLocale()

  const FOOTER_LINKS = {
    explore: [
      { href: '/', label: t.Footer.explore, key: 'home' },
      { href: '/system', label: t.Navbar.system, key: 'system' },
      { href: '/features', label: t.Navbar.features, key: 'features' },
    ],
    resources: [
      { href: '/docs', label: t.Navbar.docs, key: 'docs' },
      { href: '/faq', label: t.Navbar.faq, key: 'faq' },
      { href: '/help', label: t.Navbar.help, key: 'help' },
      { href: '/about', label: t.Footer.about, key: 'about' },
    ],
  } as const

  return (
    <footer className="relative mt-auto border-t border-[var(--color-border-subtle)] bg-brand-deep">
      <div className="section-container pb-8 pt-4">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/amazigh/logo/Tazrout Logo-1.svg"
                alt="Tazrout Logo"
                width={28}
                height={28}
                className="opacity-90"
                style={{ display: 'var(--logo-dark-display, block)' }}
                unoptimized
              />
              <Image
                src="/assets/amazigh/logo/Tazrout Logo.svg"
                alt="Tazrout Logo"
                width={28}
                height={28}
                className="opacity-90"
                style={{ display: 'var(--logo-light-display, none)' }}
                unoptimized
              />
              <span className="font-heading text-xl font-bold text-[var(--color-foreground)]">
                {locale === 'ar' ? 'تازروت' : 'Tazrout'}
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
              {t.Footer.description}
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-subtle)]">
              {t.Footer.explore}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href === '/' ? '' : link.href}`}
                    className="text-sm text-[var(--color-body)] transition-colors hover:text-brand-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-subtle)]">
              {t.Footer.resources}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-[var(--color-body)] transition-colors hover:text-brand-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border-subtle)] pt-6 sm:flex-row">
          <p className="text-xs text-[var(--color-subtle)]">
            &copy; {currentYear} {locale === 'ar' ? 'تازروت · المدرسة الوطنية العليا للأمن السيبراني · الجزائر' : 'Tazrout · National School of Cyber Security · Algeria'}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.enscs.edu.dz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[var(--color-muted)] transition-colors hover:text-brand-primary"
            >
              NSCS <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
