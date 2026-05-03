'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { drawerSlide, overlayFade } from '@/lib/animations'
import { useTranslation, useLocale } from '@/lib/useTranslation'

interface NavLink {
  readonly href: string
  readonly key: string
}

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  links: readonly NavLink[]
  currentPath: string
}

export default function MobileDrawer({ isOpen, onClose, links, currentPath }: MobileDrawerProps) {
  const t = useTranslation()
  const locale = useLocale()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  function isActive(href: string): boolean {
    const localeHref = `/${locale}${href === '/' ? '' : href}`
    if (href === '/') return currentPath === `/${locale}` || currentPath === `/${locale}/`
    return currentPath.startsWith(localeHref)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayFade}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerSlide}
            initial="closed"
            animate="open"
            exit="closed"
            className={cn(
              'fixed right-0 top-0 z-50 h-full w-72 md:hidden',
              'bg-[var(--color-background)] border-s border-[var(--color-border-subtle)]',
              'flex flex-col shadow-[var(--shadow-elevated)]'
            )}
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-6 py-5">
              <span className="font-heading text-lg font-bold text-[var(--color-foreground)]">
                {t.Common.menu}
              </span>
              <button
                id="mobile-menu-close"
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-foreground)]"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 px-4 py-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={`/${locale}${link.href === '/' ? '' : link.href}`}
                    onClick={onClose}
                    className={cn(
                      'flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-200',
                      isActive(link.href)
                        ? 'bg-brand-primary/10 text-brand-primary'
                        : 'text-[var(--color-body)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-foreground)]'
                    )}
                  >
                    {t.Navbar[link.key as keyof typeof t.Navbar] || link.key}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Language Switcher */}
              <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-6 px-4">
                <p className="text-xs font-mono uppercase tracking-widest text-[var(--color-subtle)] mb-4">
                  {t.Common.language}
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'ar', label: 'العربية' },
                    { id: 'en', label: 'English' },
                    { id: 'fr', label: 'Français' }
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        const segments = currentPath.split('/')
                        if (['ar', 'en', 'fr'].includes(segments[1])) {
                          segments[1] = l.id
                          window.location.href = segments.join('/') || '/'
                        } else {
                          window.location.href = `/${l.id}${currentPath}`
                        }
                      }}
                      className={cn(
                        'flex items-center justify-between rounded-lg px-4 py-2 text-sm transition-all',
                        locale === l.id 
                          ? 'bg-brand-primary text-white font-bold' 
                          : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)]'
                      )}
                    >
                      {l.label}
                      {locale === l.id && (
                        <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            <div className="border-t border-[var(--color-border-subtle)] px-6 py-4 bg-[var(--color-surface)]">
              <p className="text-[10px] font-mono text-[var(--color-subtle)] uppercase tracking-wider">
                Tazrout — Smart Irrigation System
              </p>
              <p className="mt-1 text-[10px] font-mono text-[var(--color-subtle)] uppercase tracking-wider">
                NSCS Algeria · 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
