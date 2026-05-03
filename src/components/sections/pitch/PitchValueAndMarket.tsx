'use client'

import { motion } from 'framer-motion'
import { Target, TrendingUp } from 'lucide-react'
import { fadeUp, milestonePop, staggerContainer, staggerContainerSlow } from '@/lib/animations'
import { useTranslation } from '@/lib/useTranslation'

export default function PitchValueAndMarket() {
  const t = useTranslation()

  return (
    <section className="relative z-10 py-16 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start"
        >
          {/* Positioning matrix */}
          <motion.div
            variants={milestonePop}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="rounded-[2rem] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 sm:p-10 shadow-[var(--shadow-card)] relative overflow-hidden group/card"
          >
            <div className="absolute -end-16 -top-16 h-48 w-48 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none transition-[opacity,transform] duration-500 group-hover/card:opacity-80 group-hover/card:scale-110" />
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-brand-primary mb-6 shadow-[0_0_24px_rgba(76,175,80,0.12)]"
              >
                <motion.span
                  animate={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                >
                  <Target size={14} />
                </motion.span>
                {t.PitchDeck.matrix_kicker}
              </motion.div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--color-foreground)] leading-tight mb-4">
                {t.PitchDeck.matrix_title}
              </h2>
              <p className="text-[var(--color-muted)] leading-relaxed mb-8">{t.PitchDeck.matrix_subtitle}</p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-20px' }}
                variants={staggerContainerSlow}
                className="grid grid-cols-2 gap-3 text-center text-xs sm:text-sm"
              >
                <motion.div
                  variants={fadeUp}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-background)]/40 p-4 text-[var(--color-muted)] cursor-default transition-colors duration-300 hover:border-brand-primary/35"
                >
                  <span className="text-[var(--color-foreground)] font-medium leading-snug">{t.PitchDeck.matrix_cell_a}</span>
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-background)]/40 p-4 text-[var(--color-muted)] cursor-default transition-colors duration-300 hover:border-brand-primary/35"
                >
                  <span className="text-[var(--color-foreground)] font-medium leading-snug">{t.PitchDeck.matrix_cell_b}</span>
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  whileHover={{ scale: 1.015 }}
                  className="col-span-2 rounded-xl border-2 border-brand-primary/50 bg-brand-primary/10 p-5 shadow-[0_0_30px_rgba(76,175,80,0.15)] relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/12 to-transparent pointer-events-none"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                  />
                  <span className="relative font-heading text-lg font-bold text-brand-primary block mb-1">TAZROUT</span>
                  <span className="relative text-[var(--color-body)] text-sm leading-relaxed">{t.PitchDeck.matrix_note}</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Market narrative */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainerSlow}
            className="space-y-6 text-start"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--color-muted)]"
            >
              <motion.span
                className="text-brand-primary"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <TrendingUp size={14} />
              </motion.span>
              {t.PitchDeck.market_kicker}
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-2xl sm:text-3xl font-bold text-[var(--color-foreground)] leading-tight"
            >
              {t.PitchDeck.market_title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--color-muted)] leading-relaxed text-lg">
              {t.PitchDeck.market_p1}
            </motion.p>
            <motion.p variants={fadeUp} className="text-[var(--color-muted)] leading-relaxed">
              {t.PitchDeck.market_p2}
            </motion.p>
            <motion.blockquote
              variants={fadeUp}
              whileHover={{ scale: 1.008 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="group/quote relative rounded-2xl border-s-4 border-brand-primary bg-brand-primary/5 px-5 py-4 text-[var(--color-body)] italic leading-relaxed overflow-hidden"
            >
              <motion.span
                className="pointer-events-none absolute -start-6 top-0 h-full w-28 bg-gradient-to-r from-brand-primary/18 to-transparent opacity-0 transition-opacity duration-300 group-hover/quote:opacity-100"
                aria-hidden
              />
              {t.PitchDeck.market_highlight}
            </motion.blockquote>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
