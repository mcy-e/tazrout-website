'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Lightbulb, Zap, ShieldCheck, Globe } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { useTranslation } from '@/lib/useTranslation'
import Card from '@/components/ui/Card'

export default function InnovationBlock() {
  const t = useTranslation()

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
        >
          {/* Problem Side */}
          <motion.div variants={fadeUp} className="space-y-8 text-start">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 border border-red-500/20 px-4 py-2 text-[10px] font-bold text-red-500 uppercase tracking-widest">
              <AlertTriangle size={14} />
              {t.Pitch.problem_title}
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--color-foreground)] leading-tight">
              {t.Pitch.problem_headline}
            </h2>
            
            <p className="text-lg text-[var(--color-muted)] leading-relaxed">
              {t.Pitch.problem_desc}
            </p>
            <p className="text-base text-[var(--color-muted)] leading-relaxed border-s-2 border-red-500/30 ps-4">
              {t.Pitch.problem_sub}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)]">
                <div className="text-3xl font-bold text-red-500 mb-1">30%</div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] font-bold">{t.Pitch.stat_water_waste}</div>
              </div>
              <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)]">
                <div className="text-3xl font-bold text-red-500 mb-1">100%</div>
                <div className="text-xs uppercase tracking-wider text-[var(--color-muted)] font-bold">{t.Pitch.stat_manual_error}</div>
              </div>
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div variants={fadeUp} className="relative">
            <div className="absolute -inset-4 bg-brand-primary/10 blur-3xl rounded-full opacity-30" />
            
            <Card className="p-8 sm:p-12 border-brand-primary/20 bg-brand-deep/50 backdrop-blur-xl relative overflow-hidden">
              {/* Bottom-corner watermark — avoids overlapping RTL/LTR headlines */}
              <div className="pointer-events-none absolute bottom-0 end-0 p-5 pt-20 ps-12 text-brand-primary/[0.07] select-none">
                <Lightbulb size={96} strokeWidth={1} className="opacity-80" aria-hidden />
              </div>

              <div className="relative z-10 space-y-8 text-start">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 px-4 py-2 text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                  <Zap size={14} />
                  {t.Pitch.solution_title}
                </div>

                <h3 className="text-3xl font-heading font-bold text-[var(--color-foreground)]">
                  {t.Pitch.solution_headline}
                </h3>

                <p className="text-[var(--color-muted)] leading-relaxed">
                  {t.Pitch.solution_desc}
                </p>

                <ul className="space-y-5">
                  {[
                    { icon: ShieldCheck, title: t.Pitch.value_offline_title, desc: t.Pitch.value_offline_desc },
                    { icon: Zap, title: t.Pitch.value_ai_title, desc: t.Pitch.value_ai_desc },
                    { icon: Globe, title: t.Pitch.value_local_title, desc: t.Pitch.value_local_desc }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-start">
                      <div className="h-8 w-8 shrink-0 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mt-0.5">
                        <item.icon size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--color-foreground)]">{item.title}</p>
                        <p className="text-xs text-[var(--color-muted)] leading-relaxed mt-1">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
