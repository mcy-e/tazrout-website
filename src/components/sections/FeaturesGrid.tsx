'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import Card from '@/components/ui/Card'
import { Eye, BrainCircuit, AlertTriangle, Layers, WifiOff, Hexagon } from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'

export default function FeaturesGrid() {
  const t = useTranslation()
  
  const FEATURES = [
    {
      id: 'monitoring',
      title: t.Features.monitoring_title,
      description: t.Features.monitoring_desc,
      pattern: '/assets/amazigh/symbols/Eye.svg',
      icon: Eye,
    },
    {
      id: 'ai-engine',
      title: t.Features.ai_title,
      description: t.Features.ai_desc,
      pattern: '/assets/amazigh/symbols/Wisdom.svg',
      icon: BrainCircuit,
    },
    {
      id: 'emergency',
      title: t.Features.alerts_title,
      description: t.Features.alerts_desc,
      pattern: '/assets/amazigh/symbols/icon_diamond_sun.svg',
      icon: AlertTriangle,
    },
    {
      id: 'multi-zone',
      title: t.Features.zones_title,
      description: t.Features.zones_desc,
      pattern: '/assets/amazigh/symbols/Balance.svg',
      icon: Layers,
    },
    {
      id: 'offline',
      title: t.Features.lan_title,
      description: t.Features.lan_desc,
      pattern: '/assets/amazigh/symbols/Unity.svg',
      icon: WifiOff,
    },
    {
      id: 'amazigh',
      title: t.Features.ui_title,
      description: t.Features.ui_desc,
      pattern: '/assets/amazigh/symbols/Life.svg',
      icon: Hexagon,
    },
  ]

  return (
    <section className="relative py-20 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-primary/[0.06] to-transparent" aria-hidden />
      <div className="section-container relative">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.h2 
            variants={fadeUp}
            className="font-heading text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl"
          >
            {t.Features.title}
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]"
          >
            {t.Features.subtitle}
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            >
              <Card className="group relative h-full flex flex-col items-start text-start p-8 overflow-hidden rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface)]/90 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:border-brand-primary/30 hover:shadow-[0_24px_48px_rgba(76,175,80,0.12)]">
                {/* Decorative Pattern */}
                <div className="absolute -end-12 -bottom-12 opacity-[0.08] transition-all duration-700 group-hover:opacity-[0.18] group-hover:rotate-[14deg] group-hover:scale-110 dark:opacity-[0.1] dark:group-hover:opacity-[0.22]">
                  <Image 
                    src={feature.pattern} 
                    alt="" 
                    width={200} 
                    height={200} 
                    className="h-48 w-48 text-brand-primary drop-shadow-[0_0_15px_rgba(76,175,80,0.5)]" 
                    unoptimized
                  />
                </div>
                
                <motion.div
                  className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 relative z-10 ring-1 ring-brand-primary/20"
                  whileHover={{ scale: 1.08, rotate: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <feature.icon className="h-6 w-6 text-brand-primary" />
                </motion.div>
                <h3 className="mb-3 font-heading text-xl font-semibold text-[var(--color-foreground)] relative z-10">
                  {feature.title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
