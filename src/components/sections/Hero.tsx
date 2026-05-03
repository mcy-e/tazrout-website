'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import HeroScene from '@/components/three/HeroScene'
import { useTranslation, useLocale } from '@/lib/useTranslation'

export default function Hero() {
  const t = useTranslation()
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { scrollY } = useScroll()
  // Subtle parallax on story copy only — never fade CTAs (opacity scroll broke click targets).
  const yCopy = useTransform(scrollY, [0, 600], [0, 48])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-brand-deep pt-20"
    >
      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(76, 175, 80, 0.09), transparent 80%)`,
        }}
      />

      {/* Three.js particle scene */}
      <div className="absolute inset-0 z-[1]">
        <HeroScene />
      </div>

      {/* Vignette overlay — guarantees text readability over the 3D canvas */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 55%, rgba(20,28,22,0.5) 0%, rgba(20,28,22,0.82) 100%)',
        }}
      />

      {/* Hero content: copy parallax only; CTAs stay fixed opacity for reliable clicks */}
      <div
        className={cn(
          'section-container relative z-[10]',
          'mx-auto flex max-w-4xl flex-col items-start pt-10 sm:pt-20',
          'text-start md:items-center md:text-center'
        )}
      >
        <motion.div
          style={{ y: yCopy }}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-start md:items-center"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 w-full text-[var(--color-primary)] opacity-90 font-mono text-xs tracking-[0.35em] uppercase md:text-center"
          >
            {t.Hero.pitch_kicker}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mb-8 inline-flex rounded-full border border-brand-primary/35 bg-brand-primary/10 px-5 py-2 backdrop-blur-sm md:mx-auto"
          >
            <span className="font-mono text-sm font-bold tracking-wide text-brand-primary">{t.Hero.pitch_badge}</span>
          </motion.div>

          <div className="mb-8 flex items-center justify-start gap-3 rtl:justify-end md:justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Image
                src="/assets/amazigh/logo/Tazrout Logo-1.svg"
                alt="Tazrout Logo"
                width={64}
                height={64}
                className="h-12 w-auto sm:h-16"
                style={{ display: 'var(--logo-dark-display, block)' }}
                unoptimized
              />
              <Image
                src="/assets/amazigh/logo/Tazrout Logo.svg"
                alt="Tazrout Logo"
                width={64}
                height={64}
                className="h-12 w-auto sm:h-16"
                style={{ display: 'var(--logo-light-display, none)' }}
                unoptimized
              />
            </motion.div>
          </div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-5xl font-bold leading-[1.1] tracking-tight text-[var(--color-foreground)] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {t.Hero.title1} <br className="hidden md:block" />
            <span className="text-gradient">{t.Hero.title2}</span> <br />
            {t.Hero.title3}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)] sm:text-xl md:mx-auto md:text-center"
          >
            {t.Hero.description}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--color-body)] sm:text-lg md:mx-auto md:text-center"
          >
            {t.Hero.description_vp}
          </motion.p>
        </motion.div>

        {/* CTAs: no scroll-linked opacity — stable hit targets */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-20 mt-10 flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap md:justify-center"
        >
          <Link href={`/${locale}/system`} className="w-full sm:w-auto">
            <Button size="lg" magnetic className="w-full sm:w-auto">
              {t.Hero.cta_explore}
              <ArrowRight size={18} className="rtl:-scale-x-100" />
            </Button>
          </Link>
          <Link href={`/${locale}/help/contact`} className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" magnetic className="w-full sm:w-auto border-brand-primary/40">
              <Mail size={18} />
              {t.Hero.cta_contact}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-20 mt-8 flex w-full flex-wrap gap-x-10 gap-y-3 justify-start text-sm font-semibold md:justify-center"
        >
          <Link
            href={`/${locale}/features`}
            className="text-brand-primary hover:text-brand-accent transition-colors"
          >
            {t.Hero.cta_dashboard}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
          >
            {t.Hero.cta_story}
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-20 mt-16 flex flex-col items-center gap-2 text-[var(--color-subtle)]"
        >
          <span className="text-xs font-medium uppercase tracking-widest">{t.Hero.scroll_hint}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-6 w-px bg-gradient-to-b from-brand-primary/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
