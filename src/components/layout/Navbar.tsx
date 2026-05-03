'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import MobileDrawer from './MobileDrawer'
import { useTranslation, useLocale } from '@/lib/useTranslation'

const NAV_LINKS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/system', key: 'system' },
  { href: '/features', key: 'features' },
  { href: '/docs', key: 'docs' },
  { href: '/faq', key: 'faq' },
  { href: '/help', key: 'help' },
] as const


export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)

  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Theme initialization
    const savedTheme = localStorage.getItem('tazrout-theme')
    const html = document.documentElement
    
    if (savedTheme === 'light') {
      html.classList.add('light')
      setIsDark(false)
    } else if (savedTheme === 'dark') {
      html.classList.remove('light')
      setIsDark(true)
    } else {
      // System default or fallback to current state
      setIsDark(!html.classList.contains('light'))
    }
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('light')
      localStorage.setItem('tazrout-theme', 'light')
      setIsDark(false)
    } else {
      html.classList.remove('light')
      localStorage.setItem('tazrout-theme', 'dark')
      setIsDark(true)
    }
  }

  function isActive(href: string): boolean {
    const localeHref = `/${locale}${href === '/' ? '' : href}`
    if (href === '/') return pathname === `/${locale}` || pathname === `/${locale}/`
    return pathname.startsWith(localeHref)
  }

  const switchLanguage = (newLocale: string) => {
    // pathname starts with /ar, /en, or /fr
    const segments = pathname.split('/')
    if (['ar', 'en', 'fr'].includes(segments[1])) {
      segments[1] = newLocale
      router.push(segments.join('/') || '/')
    } else {
      router.push(`/${newLocale}${pathname}`)
    }
    setIsLangOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300 border-b border-transparent',
          isScrolled 
            ? 'bg-[var(--color-background)]/90 backdrop-blur-md shadow-[var(--shadow-card)] border-[var(--color-border-subtle)]' 
            : 'bg-[var(--color-background)]/50 backdrop-blur-sm'
        )}
      >
        <div className="section-container flex h-16 items-center justify-between sm:h-20">
          <Link href={`/${locale}`} className="flex items-center gap-1.5 sm:gap-2 shrink-0" aria-label="Tazrout Home">
            <Image
              src={isDark ? "/assets/amazigh/logo/Tazrout Logo-1.svg" : "/assets/amazigh/logo/Tazrout Logo.svg"}
              alt="Tazrout Logo"
              width={28}
              height={28}
              className="h-7 w-auto transition-opacity hover:opacity-90 sm:h-10"
              unoptimized
            />
            <span className="font-heading text-base font-bold text-[var(--color-foreground)] sm:text-xl whitespace-nowrap">
              {locale === 'ar' ? 'تازروت' : 'Tazrout'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href === '/' ? '' : link.href}`}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
                  isActive(link.href)
                    ? 'text-brand-primary'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
                )}
              >
                {t.Navbar[link.key as keyof typeof t.Navbar] || link.key}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-brand-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="ml-4 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-background)] p-2 text-[var(--color-muted)] transition-colors hover:text-brand-primary"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>
            <div className="relative ml-4">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-background)] px-3 py-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-brand-primary"
              >
                <Globe size={16} />
                <span className="uppercase">{locale}</span>
              </button>
              {isLangOpen && (
                <div className="absolute end-0 top-full mt-2 flex w-24 flex-col overflow-hidden rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
                  {['ar', 'en', 'fr'].map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLanguage(l)}
                      className={cn(
                        'px-4 py-2 text-sm text-start transition-colors hover:bg-[var(--color-surface-hover)]',
                        locale === l ? 'bg-brand-primary/10 text-brand-primary font-bold' : 'text-[var(--color-body)]'
                      )}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center gap-1 sm:gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full p-1.5 text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-brand-primary"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center justify-center rounded-lg p-1.5 text-[var(--color-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-foreground)]"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        links={NAV_LINKS}
        currentPath={pathname}
      />
    </>
  )
}
