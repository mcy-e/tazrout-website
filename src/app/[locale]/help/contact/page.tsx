'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation, useLocale } from '@/lib/useTranslation'
import Card from '@/components/ui/Card'
import ParallaxBackground from '@/components/ui/ParallaxBackground'

const DESC_MIN = 30

function req(label: string) {
  return (
    <>
      {label}{' '}
      <span className="text-brand-primary" aria-hidden>
        *
      </span>
    </>
  )
}

export default function SupportFormPage() {
  const t = useTranslation()
  const ts = t.Support
  const locale = useLocale()
  const router = useRouter()

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formError, setFormError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    farmSite: '',
    zoneId: '',
    category: '' as '' | 'hardware' | 'software' | 'ai' | 'other',
    severity: '' as '' | 'low' | 'medium' | 'high',
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!formData.category) {
      setFormError(ts.validation_category)
      return
    }
    if (!formData.severity) {
      setFormError(ts.validation_severity)
      return
    }
    if (formData.description.trim().length < DESC_MIN) {
      setFormError(ts.validation_description_min)
      return
    }
    setStatus('submitting')
    window.setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  if (status === 'success') {
    return (
      <div className="relative min-h-screen bg-[var(--color-background)] flex items-center justify-center p-6 overflow-hidden">
        <ParallaxBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-md w-full text-center"
        >
          <Card className="p-12 border-brand-primary/30 bg-brand-primary/5 backdrop-blur-sm">
            <div className="flex justify-center mb-6 text-brand-primary">
              <CheckCircle2 size={64} />
            </div>
            <h1 className="text-3xl font-heading font-bold text-[var(--color-foreground)] mb-4">{ts.submitted_title}</h1>
            <p className="text-[var(--color-muted)] mb-8">{ts.submitted_desc}</p>
            <button
              type="button"
              onClick={() => router.push(`/${locale}/help`)}
              className="w-full inline-flex items-center justify-center rounded-xl bg-brand-primary px-6 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(76,175,80,0.3)] transition-all hover:scale-105"
            >
              {ts.back_to_help}
            </button>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[var(--color-background)] pt-32 pb-20 overflow-hidden">
      <ParallaxBackground />

      <div className="section-container relative z-10 max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-brand-primary transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">{t.Common.back}</span>
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 px-5 py-4 text-sm">
            <p className="text-[var(--color-muted)] mb-3">{ts.desc}</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-[var(--color-foreground)] font-medium">{ts.project_form_hint}</span>
              <Link
                href={`/${locale}#installation-cta`}
                className="inline-flex items-center justify-center rounded-lg border border-brand-primary/35 bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary hover:bg-brand-primary/20 transition-colors"
              >
                {ts.project_form_link}
              </Link>
            </div>
          </div>

          <div className="flex items-baseline justify-between gap-4 mb-4 flex-wrap">
            <h1 className="text-4xl font-heading font-bold text-[var(--color-foreground)]">{ts.title}</h1>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">{ts.required_short}</span>
          </div>

          <Card className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {formError && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
                  <AlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700 dark:text-amber-400">{formError}</p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--color-foreground)] opacity-90">{req(ts.full_name)}</label>
                  <input
                    required
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={ts.full_name_placeholder}
                    className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-5 py-4 text-[var(--color-foreground)] focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--color-foreground)] opacity-90">{req(ts.email)}</label>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={ts.email_placeholder}
                    className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-5 py-4 text-[var(--color-foreground)] focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--color-foreground)] opacity-90">{ts.farm_site_optional}</label>
                  <input
                    type="text"
                    value={formData.farmSite}
                    onChange={(e) => setFormData({ ...formData, farmSite: e.target.value })}
                    placeholder={ts.farm_site_placeholder}
                    className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-5 py-4 text-[var(--color-foreground)] focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--color-foreground)] opacity-90">{ts.zone_id_optional}</label>
                  <input
                    type="text"
                    value={formData.zoneId}
                    onChange={(e) => setFormData({ ...formData, zoneId: e.target.value })}
                    placeholder={ts.zone_id_placeholder}
                    className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-5 py-4 text-[var(--color-foreground)] focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--color-foreground)] opacity-90">{req(ts.category)}</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as typeof formData.category,
                      })
                    }
                    className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-5 py-4 text-[var(--color-foreground)] focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none appearance-none"
                  >
                    <option value="">{ts.category_placeholder}</option>
                    <option value="hardware">{ts.category_hardware}</option>
                    <option value="software">{ts.category_software}</option>
                    <option value="ai">{ts.category_ai}</option>
                    <option value="other">{ts.category_other}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--color-foreground)] opacity-90">{req(ts.severity)}</label>
                  <select
                    required
                    value={formData.severity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        severity: e.target.value as typeof formData.severity,
                      })
                    }
                    className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-5 py-4 text-[var(--color-foreground)] focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none appearance-none"
                  >
                    <option value="">{ts.severity_placeholder}</option>
                    <option value="low">{ts.severity_low}</option>
                    <option value="medium">{ts.severity_medium}</option>
                    <option value="high">{ts.severity_high}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--color-foreground)] opacity-90">{req(ts.description)}</label>
                <textarea
                  required
                  minLength={DESC_MIN}
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={ts.description_placeholder}
                  className="w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-5 py-4 text-[var(--color-foreground)] focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all outline-none resize-none"
                />
                <p className="text-xs text-[var(--color-muted)]">
                  {formData.description.trim().length}/{DESC_MIN}+
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-brand-primary px-6 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(76,175,80,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait"
                >
                  {status === 'submitting' ? ts.submitting : ts.submit}
                  <Send size={18} />
                </button>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <AlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-500/90 leading-relaxed">{ts.beta_note}</p>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
