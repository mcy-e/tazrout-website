'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Headphones,
  CheckCircle2,
  AlertCircle,
  Package,
  Banknote,
  ChevronDown,
  ArrowUpRight,
} from 'lucide-react'
import { EASE, fadeUp, milestonePop, staggerContainer } from '@/lib/animations'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useLocale, useTranslation } from '@/lib/useTranslation'
import { cn } from '@/lib/utils'

const DETAILS_MIN = 40

type TemplateId = '' | 'pilot' | 'small' | 'farm' | 'custom'
type TimelineId = '' | 'asap' | '1_3m' | '3_6m' | 'exploring'

function req(label: string) {
  return (
    <>
      {label}{' '}
      <span className="text-amber-500/90" aria-hidden>
        *
      </span>
    </>
  )
}

const inputClass =
  'w-full min-h-[2.75rem] rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] px-4 py-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-subtle)] focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all'

const labelClass = 'text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary/85 ms-0.5'

export default function InstallationCTA() {
  const t = useTranslation()
  const locale = useLocale()
  const ti = t.Install

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [wilaya, setWilaya] = useState('')
  const [farmSize, setFarmSize] = useState('')
  const [template, setTemplate] = useState<TemplateId>('')
  const [timeline, setTimeline] = useState<TimelineId>('')
  const [zones, setZones] = useState('')
  const [phone, setPhone] = useState('')
  const [details, setDetails] = useState('')

  const pricingLine = useMemo(() => {
    switch (template) {
      case 'pilot':
        return ti.pricing_pilot
      case 'small':
        return ti.pricing_small
      case 'farm':
        return ti.pricing_farm
      case 'custom':
        return ti.pricing_custom
      default:
        return ti.pricing_disclaimer
    }
  }, [template, ti])

  const reset = () => {
    setStatus('idle')
    setError(null)
    setName('')
    setEmail('')
    setWilaya('')
    setFarmSize('')
    setTemplate('')
    setTimeline('')
    setZones('')
    setPhone('')
    setDetails('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!template) {
      setError(ti.validation_select_template)
      return
    }
    if (!timeline) {
      setError(ti.validation_select_timeline)
      return
    }
    if (details.trim().length < DETAILS_MIN) {
      setError(ti.validation_details_min)
      return
    }
    setStatus('submitting')
    window.setTimeout(() => {
      setStatus('success')
    }, 1200)
  }

  return (
    <section id="installation-cta" className="relative scroll-mt-24 py-16 sm:py-24 lg:py-32 bg-[var(--color-background)]">
      <div className="section-container relative z-10 px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mb-8 flex justify-center sm:mb-10">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary shadow-[0_8px_30px_rgba(76,175,80,0.12)] sm:h-16 sm:w-16">
              <Mail size={28} className="sm:w-8 sm:h-8" />
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-center font-heading text-2xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-3xl lg:text-4xl"
          >
            {ti.title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
          >
            {ti.description}
            <span className="mt-3 block text-sm sm:text-base">
              <strong className="text-brand-primary">Beta:</strong> {ti.beta}
            </span>
          </motion.p>

          {/* Support first on small screens (quick path); project lead column on lg */}
          <motion.div
            variants={fadeUp}
            className="mt-10 grid grid-cols-1 gap-6 sm:gap-8 lg:mt-14 lg:grid-cols-2 lg:items-start"
          >
            {/* Project form — second on mobile, first column desktop */}
            <Card
              className={cn(
                'order-2 overflow-hidden rounded-3xl border border-brand-primary/20 bg-[var(--color-surface)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-8',
                'lg:order-1'
              )}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="inline-flex rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    {ti.badge_project}
                  </span>
                  <h3 className="mt-3 flex items-start gap-3 text-xl font-heading font-bold text-[var(--color-foreground)] sm:text-2xl">
                    <Mail className="mt-0.5 h-6 w-6 shrink-0 text-brand-primary" strokeWidth={2} />
                    {ti.email_title}
                  </h3>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-[var(--color-muted)]">{ti.email_desc}</p>
                </div>
              </div>

              <Link
                href={`/${locale}/help/contact`}
                className="mt-5 flex items-center gap-2 rounded-2xl border border-brand-primary/20 bg-brand-primary/[0.07] px-4 py-3 text-sm text-[var(--color-body)] transition-colors hover:border-brand-primary/35 hover:bg-brand-primary/10"
              >
                <span className="text-[var(--color-muted)]">{ti.email_other_form_hint}</span>
                <ArrowUpRight className="ms-auto h-4 w-4 shrink-0 text-brand-primary rtl:-scale-x-100" />
              </Link>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: EASE.out }}
                  className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-background)]/60 p-4 transition-shadow hover:shadow-[0_12px_40px_rgba(76,175,80,0.08)]"
                >
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary">
                    <Package className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <h4 className="font-heading text-sm font-semibold text-[var(--color-foreground)]">{ti.business_title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-muted)] sm:text-sm">{ti.business_body}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.06, ease: EASE.out }}
                  className="rounded-2xl border border-brand-primary/25 bg-gradient-to-br from-brand-primary/12 to-brand-primary/5 p-4 transition-shadow hover:shadow-[0_12px_40px_rgba(76,175,80,0.12)]"
                >
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary/20 text-brand-primary">
                    <Banknote className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <h4 className="font-heading text-sm font-semibold text-brand-primary">{ti.pricing_title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-body)] sm:text-sm">{pricingLine}</p>
                  <p className="mt-2 border-t border-brand-primary/20 pt-2 text-[10px] leading-relaxed text-[var(--color-muted)]">
                    {ti.pricing_disclaimer}
                  </p>
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-8 text-center"
                  >
                    <div className="mb-4 flex justify-center text-brand-primary">
                      <CheckCircle2 size={52} />
                    </div>
                    <h4 className="font-heading text-xl font-bold text-[var(--color-foreground)]">{ti.inline_success_title}</h4>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">{ti.inline_success_body}</p>
                    <Button type="button" variant="secondary" className="mt-6 w-full py-3.5" onClick={reset}>
                      {ti.send_another}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit}
                  >
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-start gap-2 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400"
                        role="alert"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        {error}
                      </motion.div>
                    )}

                    <div className="space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">{ti.form_section_contact}</p>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className={labelClass}>{req(ti.form_name)}</label>
                          <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name"
                            placeholder={ti.form_name_placeholder}
                            className={inputClass}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>{req(ti.form_email)}</label>
                          <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            placeholder={ti.form_email_placeholder}
                            className={inputClass}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>{req(ti.form_wilaya)}</label>
                          <input
                            required
                            type="text"
                            value={wilaya}
                            onChange={(e) => setWilaya(e.target.value)}
                            placeholder={ti.form_wilaya_placeholder}
                            className={inputClass}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>{req(ti.form_farm_size)}</label>
                          <input
                            required
                            type="text"
                            value={farmSize}
                            onChange={(e) => setFarmSize(e.target.value)}
                            placeholder={ti.form_farm_size_placeholder}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[var(--color-border-subtle)] pt-6 space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">{ti.form_section_scope}</p>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className={labelClass}>{req(ti.form_template)}</label>
                          <div className="relative">
                            <select
                              required
                              value={template}
                              onChange={(e) => setTemplate(e.target.value as TemplateId)}
                              className={cn(inputClass, 'cursor-pointer appearance-none pe-10')}
                            >
                              <option value="">{ti.form_template_placeholder}</option>
                              <option value="pilot">{ti.form_template_pilot}</option>
                              <option value="small">{ti.form_template_small}</option>
                              <option value="farm">{ti.form_template_farm}</option>
                              <option value="custom">{ti.form_template_custom}</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" aria-hidden />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>{req(ti.form_timeline)}</label>
                          <div className="relative">
                            <select
                              required
                              value={timeline}
                              onChange={(e) => setTimeline(e.target.value as TimelineId)}
                              className={cn(inputClass, 'cursor-pointer appearance-none pe-10')}
                            >
                              <option value="">{ti.form_timeline_placeholder}</option>
                              <option value="asap">{ti.form_timeline_asap}</option>
                              <option value="1_3m">{ti.form_timeline_1_3m}</option>
                              <option value="3_6m">{ti.form_timeline_3_6m}</option>
                              <option value="exploring">{ti.form_timeline_exploring}</option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" aria-hidden />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={cn(labelClass, 'text-brand-primary/55')}>{ti.form_zones}</label>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={zones}
                            onChange={(e) => setZones(e.target.value)}
                            placeholder={ti.form_zones_placeholder}
                            className={inputClass}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={cn(labelClass, 'text-brand-primary/55')}>{ti.form_phone}</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={ti.form_phone_placeholder}
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className={labelClass}>{req(ti.form_details)}</label>
                      <textarea
                        required
                        minLength={DETAILS_MIN}
                        rows={5}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder={ti.form_details_placeholder}
                        className={cn(inputClass, 'min-h-[8rem] resize-y py-3.5')}
                      />
                      <p className="text-[11px] text-[var(--color-muted)]">
                        {details.trim().length}/{DETAILS_MIN}+
                      </p>
                    </div>

                    <Button type="submit" variant="primary" className="w-full py-3.5 text-base shadow-[0_12px_36px_rgba(76,175,80,0.25)]" disabled={status === 'submitting'}>
                      {status === 'submitting' ? ti.submitting : ti.submit_request}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>

            {/* Support — first on mobile */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-20px' }}
              variants={milestonePop}
              className={cn('order-1 lg:order-2 lg:sticky lg:top-28 lg:self-start')}
            >
              <Card className="flex flex-col gap-6 rounded-3xl border border-amber-500/20 bg-[var(--color-surface)] p-6 shadow-lg sm:p-8">
                <div className="flex flex-col items-center text-center sm:items-start sm:text-start">
                  <span className="inline-flex rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                    {ti.badge_support}
                  </span>
                  <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Headphones className="h-8 w-8" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-lg font-heading font-bold text-[var(--color-foreground)] sm:text-xl">{ti.call_title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">{ti.call_desc}</p>
                </div>

                <div className="flex justify-center sm:justify-start">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                    {t.Help.phone_beta}
                  </div>
                </div>

                <Link
                  href={`/${locale}/help/contact`}
                  className="flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-xl border-2 border-amber-500/35 bg-amber-500/10 px-5 py-3.5 text-sm font-bold text-amber-700 transition-all hover:border-amber-500/50 hover:bg-amber-500/15 dark:text-amber-400"
                >
                  {ti.call_cta_support}
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
