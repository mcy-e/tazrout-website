'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  HelpCircle,
  AlertTriangle,
  MapPin,
  Settings,
  Droplets,
  Monitor,
  Wifi,
  ArrowRight,
  Mail,
  Phone,
  Wrench,
  Radio
} from 'lucide-react'
import { fadeUp, staggerContainer, staggerContainerSlow } from '@/lib/animations'
import Card from '@/components/ui/Card'
import Accordion, { type AccordionItem } from '@/components/ui/Accordion'
import { useTranslation, useLocale } from '@/lib/useTranslation'



import DecorativeShapes from '@/components/ui/DecorativeShapes'

export default function HelpPageClient() {
  const t = useTranslation()
  const locale = useLocale()

  const TROUBLESHOOTING_DATA: AccordionItem[] = [
    {
      id: 'valve-stuck',
      question: t.Help.q1,
      answer: t.Help.a1,
      icon: <Wrench size={20} />,
    },
    {
      id: 'sensor-offline',
      question: t.Help.q2,
      answer: t.Help.a2,
      icon: <Radio size={20} />,
    },
    {
      id: 'low-pressure',
      question: t.Help.q3,
      answer: t.Help.a3,
      icon: <Droplets size={20} />,
    },
    {
      id: 'dashboard-error',
      question: t.Help.q4,
      answer: t.Help.a4,
      icon: <Monitor size={20} />,
    },
    {
      id: 'ai-behavior',
      question: t.Help.q5,
      answer: t.Help.a5,
      icon: <Settings size={20} />,
    },
    {
      id: 'fire-safety',
      question: t.Help.q6,
      answer: t.Help.a6,
      icon: <AlertTriangle size={20} />,
    }
  ]

  const QUICK_START_STEPS = [
    {
      step: 1,
      title: t.Help.step1_title,
      description: t.Help.step1_desc,
      icon: <Monitor size={24} />,
    },
    {
      step: 2,
      title: t.Help.step2_title,
      description: t.Help.step2_desc,
      icon: <MapPin size={24} />,
    },
    {
      step: 3,
      title: t.Help.step3_title,
      description: t.Help.step3_desc,
      icon: <Droplets size={24} />,
    },
    {
      step: 4,
      title: t.Help.step4_title,
      description: t.Help.step4_desc,
      icon: <AlertTriangle size={24} />,
    },
  ] as const

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
            <span className="text-sm font-medium text-brand-primary">{t.Help.banner_tag}</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-bold leading-tight text-[var(--color-foreground)] sm:text-5xl md:text-6xl"
          >
            {t.Help.banner_title1} <span className="text-gradient">{t.Help.banner_title2}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]"
          >
            {t.Help.banner_desc}
          </motion.p>
        </motion.div>
      </section>

      {/* ── Troubleshooting Section ── */}
      <section id="troubleshooting" className="relative z-10 py-16 sm:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="section-container"
        >
          <motion.div variants={fadeUp}>
            <div className="mb-12 text-center">
              <h2 className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
                {t.Help.trouble_title}
              </h2>
              <p className="mt-4 text-[var(--color-muted)]">
                {t.Help.trouble_desc}
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="mx-auto max-w-3xl">
            <Accordion items={TROUBLESHOOTING_DATA} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Quick Start Guide ── */}
      <section id="quickstart" className="relative z-10 py-16 sm:py-20 bg-[var(--color-surface)]/50 backdrop-blur-sm border-y border-[var(--color-border-subtle)]">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="section-container"
        >
          <motion.div variants={fadeUp} className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold text-[var(--color-foreground)] sm:text-4xl">
              {t.Help.quick_title}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t.Help.quick_desc}
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl px-4 sm:px-0">
            {QUICK_START_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="group relative flex gap-6 pb-16 last:pb-0"
              >
                {i < QUICK_START_STEPS.length - 1 && (
                  <div className="absolute left-[27px] top-14 h-[calc(100%-48px)] w-px bg-gradient-to-b from-brand-primary/40 to-transparent" />
                )}

                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-brand-primary/30 bg-brand-primary/10 text-brand-primary transition-all duration-500 group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-[0_0_40px_rgba(76,175,80,0.4)] group-hover:scale-110">
                  {step.icon}
                </div>

                <div className="flex-1 pt-1">
                  <div className="mb-1 flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-primary opacity-80">
                      Step {step.step}
                    </span>
                    {i < QUICK_START_STEPS.length - 1 && (
                      <ArrowRight size={14} className="text-[var(--color-subtle)] opacity-40" />
                    )}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[var(--color-foreground)] transition-colors duration-300 group-hover:text-brand-primary">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[var(--color-body)] leading-relaxed text-[0.95rem]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Contact & Support Card ── */}
      <section id="contact" className="relative z-10 py-16 sm:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="section-container"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-[var(--color-foreground)] sm:text-4xl">
              {t.Help.contact_title}
            </h2>
            <p className="mt-3 text-[var(--color-muted)]">
              {t.Help.contact_desc}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mx-auto max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card glow className="p-8 group opacity-60 grayscale-[0.5] cursor-not-allowed">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-border-subtle)] text-[var(--color-muted)] transition-transform duration-500">
                    <Phone size={28} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[var(--color-muted)]">{t.Help.onsite_title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-muted)] flex-grow leading-relaxed">
                    {t.Help.onsite_desc}
                  </p>
                  <div className="mt-8 w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-6 py-4 font-mono text-sm font-bold text-[var(--color-muted)] shadow-inner">
                    {t.Help.phone_beta}
                  </div>
                </div>
              </Card>

              <Card hover glow className="p-8 group">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    <Mail size={28} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[var(--color-foreground)]">{t.Help.email_title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-muted)] flex-grow leading-relaxed">
                    {t.Help.email_desc}
                  </p>
                  <a 
                    href={`/${locale}/help/contact`}
                    className="mt-8 w-full inline-flex items-center justify-center rounded-xl bg-brand-primary px-6 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(76,175,80,0.3)] transition-all hover:scale-105 hover:bg-brand-primary-dark active:scale-95"
                  >
                    {t.Help.email_btn}
                  </a>
                </div>
              </Card>

              <Card hover glow className="p-8 group sm:col-span-2 lg:col-span-1">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Radio size={28} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[var(--color-foreground)]">{t.Help.tech_specs_title}</h3>
                  <p className="mt-3 text-sm text-[var(--color-muted)] flex-grow leading-relaxed">
                    {t.Help.tech_specs_desc}
                  </p>
                  <Link
                    href={`/${locale}/system`}
                    className="mt-8 w-full inline-flex items-center justify-center rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-6 py-4 text-sm font-bold text-[var(--color-foreground)] transition-all hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 active:scale-95"
                  >
                    {t.Help.tech_specs_cta}
                  </Link>
                </div>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
