'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HelpCircle, Thermometer, Wifi, WifiOff, AlertTriangle, Database, Clock, MapPin, Zap, Settings, Radio, Smartphone } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import Accordion, { type AccordionItem } from '@/components/ui/Accordion'

import { useTranslation } from '@/lib/useTranslation'

import DecorativeShapes from '@/components/ui/DecorativeShapes'

type CategoryId = 'getting-started' | 'system-sensors' | 'irrigation' | 'connectivity' | 'future'

export default function FaqPageClient() {
  const t = useTranslation().FAQ
  const [activeCategory, setActiveCategory] = useState<CategoryId>('getting-started')

  const FAQ_CATEGORIES: { id: CategoryId; label: string }[] = [
    { id: 'getting-started', label: t.categories['getting-started'] },
    { id: 'system-sensors', label: t.categories['system-sensors'] },
    { id: 'irrigation', label: t.categories['irrigation'] },
    { id: 'connectivity', label: t.categories['connectivity'] },
    { id: 'future', label: t.categories.future },
  ]

  const FAQ_DATA: Record<CategoryId, AccordionItem[]> = {
    'getting-started': [
      {
        id: 'sensors',
        question: t.questions.sensors.q,
        answer: t.questions.sensors.a,
        icon: <Thermometer size={20} />,
      },
      {
        id: 'ai_decision',
        question: t.questions.ai_decision.q,
        answer: t.questions.ai_decision.a,
        icon: <Zap size={20} />,
      },
    ],
    'system-sensors': [
      {
        id: 'sensors-detail',
        question: t.questions.sensors.q,
        answer: t.questions.sensors.a,
        icon: <Clock size={20} />,
      },
      {
        id: 'storage',
        question: t.questions.offline.q,
        answer: t.questions.offline.a,
        icon: <Database size={20} />,
      },
    ],
    irrigation: [
      {
        id: 'hybrid',
        question: t.questions.hybrid_control.q,
        answer: t.questions.hybrid_control.a,
        icon: <Settings size={20} />,
      },
      {
        id: 'ai-logic',
        question: t.questions.ai_decision.q,
        answer: t.questions.ai_decision.a,
        icon: <Zap size={20} />,
      },
    ],
    connectivity: [
      {
        id: 'offline-mode',
        question: t.questions.offline.q,
        answer: t.questions.offline.a,
        icon: <WifiOff size={20} />,
      },
      {
        id: 'power',
        question: t.questions.power_outage.q,
        answer: t.questions.power_outage.a,
        icon: <Wifi size={20} />,
      },
    ],
    future: [
      {
        id: 'national',
        question: t.questions.national_data.q,
        answer: t.questions.national_data.a,
        icon: <Database size={20} />,
      },
      {
        id: 'mobile',
        question: t.questions.mobile_app.q,
        answer: t.questions.mobile_app.a,
        icon: <Smartphone size={20} />,
      },
      {
        id: 'fire',
        question: t.questions.fire_detection.q,
        answer: t.questions.fire_detection.a,
        icon: <AlertTriangle size={20} />,
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-[var(--color-background)] overflow-hidden">
      <DecorativeShapes />

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden pt-32 sm:pt-40 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="section-container relative text-center z-10"
        >
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-2">
            <HelpCircle size={16} className="text-brand-primary" />
            <span className="text-sm font-medium text-brand-primary">{t.subtitle}</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-bold leading-tight text-[var(--color-foreground)] sm:text-5xl md:text-6xl"
          >
            {t.title.split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{t.title.split(' ').slice(-1)}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]"
          >
            {t.desc}
          </motion.p>
        </motion.div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="relative z-10 py-16 sm:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="section-container"
        >
          {/* Category Tabs */}
          <motion.div
            variants={fadeUp}
            className="mb-12 flex flex-wrap justify-center gap-2 sm:gap-4"
          >
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-brand-primary text-white shadow-[0_0_30px_rgba(76,175,80,0.3)] scale-105'
                    : 'bg-[var(--color-surface)] text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-foreground)] hover:scale-105 shadow-sm'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div variants={fadeUp} className="mx-auto max-w-3xl">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Accordion
                items={FAQ_DATA[activeCategory]}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
