'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import Card from '@/components/ui/Card'
import { Github, Linkedin, ArrowRight } from 'lucide-react'
import { useTranslation, useLocale } from '@/lib/useTranslation'

export default function TeamSection() {
  const t = useTranslation()

  const locale = useLocale()
  const getName = (en: string, ar: string) => locale === 'ar' ? ar : en

  const TEAM_MEMBERS = [
    {
      id: 'chouaib',
      name: getName('Reffas Chouaib', 'رفاس شعيب'),
      role: t.Team.frontend_role,
      photo: '/assets/team/Chouaib.png',
      github: 'https://github.com/mcy-e',
      linkedin: 'https://www.linkedin.com/in/chouaibreffas/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BVyZa6UrSSOWKNidKZsWyKw%3D%3D',
    },
    {
      id: 'fehis',
      name: getName('Fehis Mohamed Essadek', 'فحيص محمد الصادق'),
      role: t.Team.backend_role,
      photo: '/assets/team/Mohammed.png',
      github: 'https://github.com/M071m2d',
      linkedin: 'https://www.linkedin.com/in/fehis-mohamed-essadek-43aa2337a/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BC%2Fdkq%2B0%2BRxCT86RmebjHtA%3D%3D',
    },
    {
      id: 'salah',
      name: getName('Sellah Abdelhak', 'صلاّح عبد الحق'),
      role: t.Team.ai_role,
      photo: '/assets/team/Abdelhak.png',
      github: '#',
      linkedin: 'https://www.linkedin.com/in/abdelhak-sellah-2a82a9324?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    },
    {
      id: 'lhacani',
      name: getName('Lahacani Reda', 'لحساني رضا'),
      role: t.Team.network_role,
      photo: '/assets/team/Reda.png',
      github: 'https://github.com/Naiderr',
      linkedin: 'https://www.linkedin.com/in/reda-lahacani-4a262833b/',
    },
    {
      id: 'khanfri',
      name: getName('Khanfri Moussa', 'خنفري موسى'),
      role: t.Team.hardware_role,
      photo: '/assets/team/Mousa.jpg',
      github: 'https://github.com/moussakh189/',
      linkedin: 'https://www.linkedin.com/in/moussa-khenfri-b24481320?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    },
  ]

  return (
    <section className="py-20 sm:py-32">
      <div className="section-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end mb-16"
        >
          <div className="max-w-2xl">
            <motion.h2 
              variants={fadeUp}
              className="font-heading text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl"
            >
              {t.Team.title}
            </motion.h2>
            <motion.p 
              variants={fadeUp}
              className="mt-4 text-lg text-[var(--color-muted)]"
            >
              {t.Team.description}
            </motion.p>
          </div>
          
          <motion.div variants={fadeUp} className="shrink-0">
            <Link 
              href={`/${locale}/about`} 
              className="inline-flex items-center gap-2 font-heading font-semibold text-brand-primary transition-colors hover:text-brand-light"
            >
              {t.Team.cta}
              <ArrowRight size={18} className="rtl:-scale-x-100" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TEAM_MEMBERS.map((member) => (
            <motion.div key={member.id} variants={fadeUp}>
              <Card hover className="overflow-hidden p-0">
                <div className="aspect-[4/3] w-full bg-[var(--color-surface-hover)] relative">
                  {member.photo ? (
                    <Image 
                      src={member.photo} 
                      alt={member.name} 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--color-subtle)]">
                      <span className="font-heading text-sm font-semibold uppercase tracking-widest text-center">
                        {t.Team.photo_missing}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-[var(--color-foreground)]">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-brand-primary mt-1">
                    {member.role}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-4 border-t border-[var(--color-border-subtle)] pt-6">
                    <a href={member.github} className="text-[var(--color-muted)] hover:text-brand-primary transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={member.linkedin} className="text-[var(--color-muted)] hover:text-brand-primary transition-colors">
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
