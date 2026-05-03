'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useTranslation } from '@/lib/useTranslation'

export default function PitchCompetitiveStrip() {
  const t = useTranslation()
  const rows = t.PitchDeck.competitive_rows as { who: string; them: string; us: string }[]

  return (
    <section className="relative z-10 py-16 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/15 to-transparent" />
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="mx-auto max-w-3xl text-center mb-12"
        >
          <motion.p
            variants={fadeUp}
            className="text-[var(--color-primary)] opacity-90 font-mono text-xs tracking-[0.35em] uppercase mb-4"
          >
            {t.PitchDeck.competitive_kicker}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl sm:text-4xl font-bold text-[var(--color-foreground)]"
          >
            {t.PitchDeck.competitive_title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-[var(--color-muted)]">
            {t.PitchDeck.competitive_subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] overflow-hidden shadow-[var(--shadow-elevated)]"
        >
          <div className="hidden md:grid md:grid-cols-[1fr_1.2fr_1.2fr] gap-px bg-[var(--color-border-subtle)]">
            <div className="bg-[var(--color-surface)] p-4 text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]" />
            <div className="bg-[var(--color-surface)] p-4 text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
              {t.PitchDeck.competitive_col_limit}
            </div>
            <div className="bg-[var(--color-surface)] p-4 text-xs font-mono uppercase tracking-wider text-brand-primary">
              {t.PitchDeck.competitive_col_answer}
            </div>
          </div>
          {rows.map((row) => (
            <motion.div
              key={row.who}
              variants={fadeUp}
              className="grid md:grid-cols-[1fr_1.2fr_1.2fr] gap-4 md:gap-px border-t border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)]"
            >
              <div className="bg-[var(--color-surface)] p-5 md:p-6 font-heading font-semibold text-[var(--color-foreground)]">
                {row.who}
              </div>
              <div className="bg-[var(--color-surface)] p-5 md:p-6 text-sm text-[var(--color-muted)] leading-relaxed">
                <span className="md:hidden font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted)] block mb-2">
                  {t.PitchDeck.competitive_col_limit}
                </span>
                {row.them}
              </div>
              <div className="bg-brand-primary/[0.06] p-5 md:p-6 text-sm text-[var(--color-body)] leading-relaxed border-t md:border-t-0 border-[var(--color-border-subtle)]">
                <span className="md:hidden font-mono text-[10px] uppercase tracking-wider text-brand-primary block mb-2">
                  {t.PitchDeck.competitive_col_answer}
                </span>
                {row.us}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
