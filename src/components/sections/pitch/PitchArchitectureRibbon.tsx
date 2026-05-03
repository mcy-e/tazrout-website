'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Cpu, Monitor, Radio, Server, Wifi } from 'lucide-react'
import { fadeUp, milestonePop, staggerContainer } from '@/lib/animations'
import { useTranslation, useLocale } from '@/lib/useTranslation'

const LAYER_ICONS = [Cpu, Radio, Wifi, Server, Monitor]

export default function PitchArchitectureRibbon() {
  const t = useTranslation()
  const locale = useLocale()

  const layers = [
    { title: t.Architecture.hardware_title, desc: t.Architecture.hardware_desc },
    { title: t.Architecture.gateway_title, desc: t.Architecture.gateway_desc },
    { title: t.Architecture.broker_title, desc: t.Architecture.broker_desc },
    { title: t.Architecture.backend_title, desc: t.Architecture.backend_desc },
    { title: t.Architecture.frontend_title, desc: t.Architecture.frontend_desc },
  ]

  return (
    <section className="relative z-10 py-16 sm:py-20">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10 text-center md:text-start"
        >
          <div className="max-w-xl mx-auto md:mx-0">
            <motion.p
              variants={fadeUp}
              className="text-[var(--color-primary)] opacity-90 font-mono text-xs tracking-[0.35em] uppercase mb-3"
            >
              {t.PitchDeck.arch_kicker}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl sm:text-4xl font-bold text-[var(--color-foreground)]"
            >
              {t.PitchDeck.arch_title}
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href={`/${locale}/system`}
              className="group/cta inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-5 py-2.5 text-sm font-semibold text-brand-primary transition-all duration-300 hover:border-brand-primary/60 hover:bg-brand-primary/20 hover:shadow-[0_12px_36px_rgba(76,175,80,0.22)]"
            >
              {t.PitchDeck.arch_cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover/cta:-translate-x-0.5" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Subtle data-flow shimmer behind layer cards (desktop) */}
          <div
            className="pointer-events-none absolute start-[8%] end-[8%] top-8 hidden h-[2px] overflow-hidden rounded-full bg-[var(--color-border-subtle)]/80 lg:block"
            aria-hidden
          >
            <motion.div
              className="absolute inset-y-0 w-[38%] rounded-full bg-gradient-to-r from-transparent via-brand-primary/55 to-transparent"
              initial={{ left: locale === 'ar' ? '120%' : '-25%' }}
              animate={{ left: locale === 'ar' ? ['120%', '-25%'] : ['-25%', '120%'] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'linear', repeatDelay: 0.2 }}
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
          >
            {layers.map((layer, i) => {
              const Icon = LAYER_ICONS[i]
              return (
                <motion.div
                  key={layer.title}
                  variants={milestonePop}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                  className="group relative overflow-hidden rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/95 p-5 flex flex-col gap-2 shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-300 hover:border-brand-primary/35 hover:shadow-[0_20px_44px_rgba(76,175,80,0.14)]"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  >
                    <div className="absolute -end-8 -top-10 h-28 w-28 rounded-full bg-brand-primary/12 blur-2xl" />
                  </div>
                  <div className="relative flex items-center gap-2 text-brand-primary">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary/25 to-brand-primary/5 ring-1 ring-brand-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:animate-icon-wiggle">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-[10px] opacity-70">L{i + 1}</span>
                  </div>
                  <h3 className="relative font-heading text-sm font-semibold text-[var(--color-foreground)] leading-snug transition-colors duration-300 group-hover:text-brand-primary/95">
                    {layer.title}
                  </h3>
                  <p className="relative text-xs text-[var(--color-muted)] leading-relaxed">{layer.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
