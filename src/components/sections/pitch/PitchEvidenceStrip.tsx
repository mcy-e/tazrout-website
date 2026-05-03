'use client'

import { motion } from 'framer-motion'
import { Activity, Layers, Radio, Sparkles } from 'lucide-react'
import { fadeUp, milestonePop, staggerContainerSlow } from '@/lib/animations'
import { useTranslation } from '@/lib/useTranslation'

const ICONS = [Sparkles, Layers, Radio, Activity]

export default function PitchEvidenceStrip() {
  const t = useTranslation()
  const items = t.PitchDeck.evidence_items as { title: string; body: string }[]

  return (
    <section className="relative z-10 py-16 sm:py-20">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainerSlow}
          className="mx-auto max-w-3xl text-center mb-12 sm:mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="text-[var(--color-primary)] opacity-90 font-mono text-xs tracking-[0.35em] uppercase mb-4"
          >
            {t.PitchDeck.evidence_kicker}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] tracking-tight"
          >
            {t.PitchDeck.evidence_title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-[var(--color-muted)] leading-relaxed">
            {t.PitchDeck.evidence_subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainerSlow}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={item.title}
                variants={milestonePop}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 26 }}
                className="group relative overflow-hidden rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/95 p-6 sm:p-7 text-start shadow-[var(--shadow-card)] transition-shadow duration-300 hover:border-brand-primary/35 hover:shadow-[0_20px_45px_rgba(76,175,80,0.16)]"
              >
                <div className="pointer-events-none absolute -end-10 -top-10 h-32 w-32 rounded-full bg-brand-primary/8 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/25 to-brand-primary/5 text-brand-primary ring-1 ring-brand-primary/15 transition-transform duration-300 group-hover:scale-110">
                  <motion.span
                    whileHover={{ rotate: [0, -6, 6, 0] }}
                    transition={{ duration: 0.45 }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </motion.span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-[var(--color-foreground)] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
