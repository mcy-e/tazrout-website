'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainerSlow } from '@/lib/animations'
import { useTranslation } from '@/lib/useTranslation'
import { cn } from '@/lib/utils'

export default function PitchFlowSection() {
  const t = useTranslation()
  const steps = t.PitchDeck.flow_steps as { name: string; body: string }[]

  return (
    <section className="relative z-10 py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/25 to-transparent" />
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
            {t.PitchDeck.flow_kicker}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] tracking-tight"
          >
            {t.PitchDeck.flow_title}
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[var(--color-muted)] leading-relaxed">
            {t.PitchDeck.flow_subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainerSlow}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1
            return (
              <motion.div
                key={step.name}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  transition: { type: 'spring', stiffness: 400, damping: 26 },
                }}
                className={cn(
                  'group rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 text-start shadow-[var(--shadow-card)] transition-shadow duration-300',
                  'hover:border-brand-primary/40 hover:shadow-[0_20px_50px_rgba(76,175,80,0.1)]',
                  isLast && 'lg:col-span-3'
                )}
              >
                <div
                  className={cn(
                    'flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5',
                    isLast && 'lg:mx-auto lg:max-w-3xl'
                  )}
                >
                  <span className="inline-flex w-fit shrink-0 rounded-lg border border-brand-primary/25 bg-brand-primary/10 px-3 py-1.5 font-mono text-[11px] font-bold tabular-nums text-brand-primary">
                    #{String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-foreground)] mb-2">
                      {step.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--color-muted)]">{step.body}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
