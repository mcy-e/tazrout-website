'use client'

import { motion } from 'framer-motion'
import { fadeUp, milestonePop, staggerContainer, staggerContainerSlow } from '@/lib/animations'
import { useLocale, useTranslation } from '@/lib/useTranslation'
import { CheckCircle2, Circle } from 'lucide-react'

export default function RoadmapSection() {
  const t = useTranslation()
  const locale = useLocale()
  const lineOrigin = locale === 'ar' ? 'right' : 'left'

  const milestones = [
    { date: t.Roadmap.m1_date, title: t.Roadmap.m1_title, completed: true },
    { date: t.Roadmap.m2_date, title: t.Roadmap.m2_title, completed: true },
    { date: t.Roadmap.m3_date, title: t.Roadmap.m3_title, completed: true },
    { date: t.Roadmap.m4_date, title: t.Roadmap.m4_title, completed: false },
    { date: t.Roadmap.m5_date, title: t.Roadmap.m5_title, completed: false },
  ]

  return (
    <section className="relative py-24 sm:py-32 bg-brand-deep/50 overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.p
            variants={fadeUp}
            className="text-[var(--color-primary)] opacity-90 font-mono text-xs tracking-[0.35em] uppercase mb-4"
          >
            {t.PitchDeck.roadmap_kicker}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-4xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-5xl mb-6"
          >
            {t.Roadmap.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            {t.Roadmap.subtitle}
          </motion.p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-2">
          {/* Timeline track + progress fill (aligned to circle centers) */}
          <div
            className="pointer-events-none absolute start-0 end-0 top-6 hidden h-0.5 md:block"
            aria-hidden
          >
            <div className="absolute inset-0 rounded-full bg-[var(--color-border-subtle)]/80" />
            <motion.div
              className="absolute inset-y-0 start-0 w-full rounded-full bg-gradient-to-e from-brand-primary via-brand-primary/85 to-brand-primary/35 shadow-[0_0_20px_rgba(76,175,80,0.35)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              style={{ transformOrigin: lineOrigin }}
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainerSlow}
            className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4"
          >
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                variants={milestonePop}
                className="relative flex flex-col items-center group"
              >
                <motion.div
                  className={`relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-brand-deep transition-shadow duration-300 ${
                    milestone.completed
                      ? 'bg-brand-primary text-brand-deep shadow-[0_0_24px_rgba(76,175,80,0.45)]'
                      : 'bg-white/5 text-[var(--color-muted)] ring-2 ring-white/10 ring-offset-2 ring-offset-brand-deep/50'
                  }`}
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                >
                  {milestone.completed ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 500, damping: 22, delay: 0.15 + i * 0.06 }}
                    >
                      <CheckCircle2 size={24} />
                    </motion.span>
                  ) : (
                    <motion.span
                      animate={{ opacity: [0.35, 0.9, 0.35] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <Circle size={24} className="opacity-40" />
                    </motion.span>
                  )}
                </motion.div>

                <div className="text-center">
                  <div
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${
                      milestone.completed ? 'text-brand-primary' : 'text-[var(--color-muted)]'
                    }`}
                  >
                    {milestone.date}
                  </div>
                  <h3 className="text-sm font-heading font-semibold text-[var(--color-foreground)] transition-colors duration-300 group-hover:text-brand-primary">
                    {milestone.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
