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
              'fixed end-0 top-0 z-50 h-full w-72 md:hidden',
              'bg-[var(--color-background)] border-l border-[var(--color-border-subtle)]',
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
                  initial={{ opacity: 0, x: 20 }}
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
            </nav>

            <div className="border-t border-[var(--color-border-subtle)] px-6 py-4">
              <p className="text-xs text-[var(--color-subtle)]">
                Tazrout — Smart Irrigation System
              </p>
              <p className="mt-1 text-xs text-[var(--color-subtle)]">
                NSCS Algeria · 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
