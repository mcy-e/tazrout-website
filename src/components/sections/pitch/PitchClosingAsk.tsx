'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ClipboardList, FileText } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import Button from '@/components/ui/Button'
import { useTranslation, useLocale } from '@/lib/useTranslation'

export default function PitchClosingAsk() {
  const t = useTranslation()
  const locale = useLocale()

  return (
    <section className="relative z-10 py-20 sm:py-28">
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="relative max-w-4xl mx-auto rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-10 sm:p-14 overflow-hidden shadow-[var(--shadow-elevated)] transition-shadow duration-500 hover:border-brand-primary/25 hover:shadow-[0_0_60px_rgba(76,175,80,0.08)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.06] via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 text-center space-y-8">
            <motion.p
              variants={fadeUp}
              className="text-brand-primary font-mono text-xs tracking-[0.35em] uppercase"
            >
              {t.PitchDeck.closing_kicker}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-foreground)] leading-tight"
            >
              {t.PitchDeck.closing_title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-[var(--color-body)] leading-relaxed max-w-2xl mx-auto">
              {t.PitchDeck.closing_body}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-[var(--color-primary)] opacity-90 italic font-serif text-lg max-w-2xl mx-auto"
            >
              {t.PitchDeck.closing_quote}
            </motion.p>

            {/* Primary → installation block (form + phone), secondary → docs — avoids duplicating a second “email us” */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href={`/${locale}#installation-cta`}>
                <Button size="lg" magnetic className="min-w-[240px] gap-2">
                  <ClipboardList size={18} />
                  {t.PitchDeck.closing_cta_primary}
                </Button>
              </Link>
              <Link href={`/${locale}/docs`}>
                <Button variant="secondary" size="lg" className="min-w-[240px] gap-2">
                  <FileText size={18} />
                  {t.PitchDeck.closing_cta_secondary}
                </Button>
              </Link>
            </motion.div>

            <motion.p variants={fadeUp} className="text-xs text-[var(--color-muted)] max-w-md mx-auto pt-2">
              {t.PitchDeck.closing_hint}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
