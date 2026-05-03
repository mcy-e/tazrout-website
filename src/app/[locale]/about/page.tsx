'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion'
import TeamSection from '@/components/sections/TeamSection'
import ParallaxBackground from '@/components/ui/ParallaxBackground'
import { useTranslation, useLocale } from '@/lib/useTranslation'

// ============================================================
// FLOATING DECORATIVE SHAPES (using the new assets)
// ============================================================
const SHAPES = [
  { src: '/assets/animations/shape_4.svg', size: 180, top: '5%', left: '85%', delay: 0 },
  { src: '/assets/animations/shape_5.svg', size: 140, top: '15%', left: '5%', delay: 0.5 },
  { src: '/assets/animations/shape_6.svg', size: 200, top: '25%', left: '80%', delay: 1 },
  { src: '/assets/animations/shape_7.svg', size: 160, top: '35%', left: '10%', delay: 0.2 },
  { src: '/assets/animations/shape_4.svg', size: 150, top: '45%', left: '90%', delay: 0.8 },
  { src: '/assets/animations/shape_5.svg', size: 170, top: '55%', left: '8%', delay: 0.3 },
  { src: '/assets/animations/shape_6.svg', size: 190, top: '65%', left: '85%', delay: 0.6 },
  { src: '/assets/animations/shape_7.svg', size: 150, top: '75%', left: '5%', delay: 1.2 },
  { src: '/assets/animations/shape_4.svg', size: 210, top: '85%', left: '88%', delay: 0.4 },
  { src: '/assets/animations/shape_5.svg', size: 140, top: '95%', left: '12%', delay: 0.9 },
]

function FloatingShape({ src, size, delay }: { src: string; size: number; delay: number }) {
  return (
    <motion.div
      className="relative opacity-20 hover:opacity-40 transition-opacity duration-700"
      style={{ width: size, height: size }}
      animate={{ y: [0, -30, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 15 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <Image src={src} alt="Decorative shape" fill className="object-contain" unoptimized />
    </motion.div>
  )
}

function DecorativeShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {SHAPES.map((s, i) => (
        <div key={i} className="absolute" style={{ top: s.top, left: s.left }}>
          <FloatingShape src={s.src} size={s.size} delay={s.delay} />
        </div>
      ))}
    </div>
  )
}

// ============================================================
// PARTICLE BURST
// ============================================================
function ParticleBurst({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * 360
        const dist = 35 + Math.random() * 45
        const rad = (angle * Math.PI) / 180
        return (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-brand-primary"
            style={{ left: '50%', top: '50%' }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 2 }}
            animate={{ x: Math.cos(rad) * dist, y: Math.sin(rad) * dist, opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 + Math.random() * 0.3, ease: 'easeOut' }}
          />
        )
      })}
    </div>
  )
}

// ============================================================
// TIMELINE NODE
// ============================================================
function TimelineNode({ date, side }: { date: string; side: 'left' | 'right' }) {
  const ref = useRef(null)
  // once: false so it re-triggers when scrolling back up
  const isInView = useInView(ref, { once: false, margin: '-45% 0px -45% 0px' })
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    if (isInView) {
      setBurst(true)
      const t = setTimeout(() => setBurst(false), 1000)
      return () => clearTimeout(t)
    }
  }, [isInView])

  // In StoryCard, `side === 'left'` uses flex-row (Spacer Inline-Start, Card Inline-End).
  // `side === 'right'` uses flex-row-reverse (Spacer Inline-End, Card Inline-Start).
  const isCardAtStart = side === 'right'
  
  const dateClasses = isCardAtStart 
    ? 'start-full ms-8 md:ms-12 justify-start' // Card at Start -> Date at End
    : 'end-full me-8 md:me-12 justify-end' // Card at End -> Date at Start

  return (
    <div ref={ref} className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-20">
      <motion.div
        className="relative w-6 h-6 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-surface)]"
        animate={
          isInView
            ? {
                scale: [1, 2, 1.3],
                borderColor: ['rgba(76,175,80,0.5)', 'rgba(76,175,80,1)', 'rgba(76,175,80,0.8)'],
                boxShadow: [
                  '0 0 0px rgba(76,175,80,0)',
                  '0 0 40px rgba(76,175,80,1)',
                  '0 0 18px rgba(76,175,80,0.7)',
                ],
              }
            : {
                scale: 1,
                boxShadow: '0 0 0px rgba(76,175,80,0)',
              }
        }
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-[3px] rounded-full bg-brand-primary"
          animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />
      </motion.div>

      <ParticleBurst active={burst} />

      {/* BIG GLOWING DATE on the opposite side */}
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 hidden md:flex min-w-[300px] ${dateClasses}`}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.6 }
        }
        transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        <span
          className="font-mono text-2xl uppercase tracking-[0.2em] font-bold whitespace-nowrap"
          style={{
            color: '#4CAF50',
            textShadow: '0 0 20px rgba(76,175,80,0.9), 0 0 40px rgba(76,175,80,0.5), 0 0 60px rgba(76,175,80,0.2)',
          }}
        >
          {date}
        </span>
      </motion.div>
    </div>
  )
}

type EventData = { date: string; title: string; side: 'left'|'right'; image: string; text: string }

function StoryCard({ event, index }: { event: EventData; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15%' })
  const isLeft = event.side === 'left'
  const locale = useLocale()
  const isRtl = locale === 'ar'

  const slideOffset = isRtl ? (isLeft ? 70 : -70) : (isLeft ? -70 : 70)

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-start w-full mb-40 ${isLeft ? '' : 'md:flex-row-reverse'}`}
    >
      {/* Spacer */}
      <div className="hidden md:block w-1/2" />

      {/* Timeline node (with big date on opposite side) */}
      <TimelineNode date={event.date} side={event.side} />

      {/* Card */}
      <motion.div
        className={`w-full md:w-[40%] ${isLeft ? 'md:pe-4 ps-14 md:ps-0 md:me-auto md:ms-16' : 'md:ps-4 ps-14 md:ms-auto md:me-16'}`}
        initial={{ opacity: 0, x: slideOffset, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: slideOffset, y: 20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Mobile date */}
        <p
          className="md:hidden font-mono text-lg font-bold mb-3"
          style={{
            color: '#4CAF50',
            textShadow: '0 0 15px rgba(76,175,80,0.8)',
          }}
        >
          {event.date}
        </p>

        <motion.div
          className="group rounded-2xl overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-surface)] transition-all duration-500 hover:border-[var(--color-border)]"
          whileHover={{
            y: -8,
            boxShadow: '0 0 60px rgba(76,175,80,0.12), 0 25px 60px rgba(0,0,0,0.5)',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        >
          {/* Image */}
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-[var(--color-surface-hover)]">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-80" />
          </div>

          {/* Text */}
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[var(--color-foreground)] mb-4 group-hover:text-[var(--color-primary)] transition-colors duration-400">
              {event.title}
            </h3>
            <p className="text-[var(--color-muted)] leading-[1.85] text-[0.92rem] group-hover:text-[var(--color-body)] transition-colors duration-400">
              {event.text}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ============================================================
// TIMELINE CONTAINER
// ============================================================
function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslation().About

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 55%', 'end 45%'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 12,
    restDelta: 0.0005,
  })

  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  const events: EventData[] = [
    { date: t.events['0'].date, title: t.events['0'].title, text: t.events['0'].text, image: '/assets/images/story_1.png', side: 'right' },
    { date: t.events['1'].date, title: t.events['1'].title, text: t.events['1'].text, image: '/assets/images/story_2.png', side: 'left' },
    { date: t.events['2'].date, title: t.events['2'].title, text: t.events['2'].text, image: '/assets/images/story_3.png', side: 'right' },
    { date: t.events['3'].date, title: t.events['3'].title, text: t.events['3'].text, image: '/assets/images/story_4.png', side: 'left' },
    { date: t.events['4'].date, title: t.events['4'].title, text: t.events['4'].text, image: '/assets/images/story_5.png', side: 'right' },
    { date: t.events['5'].date, title: t.events['5'].title, text: t.events['5'].text, image: '/assets/images/story_6.png', side: 'left' },
    { date: t.events['6'].date, title: t.events['6'].title, text: t.events['6'].text, image: '/assets/images/story_7.png', side: 'right' },
    { date: t.events['7'].date, title: t.events['7'].title, text: t.events['7'].text, image: '/assets/images/story_8.png', side: 'left' },
    { date: t.events['8'].date, title: t.events['8'].title, text: t.events['8'].text, image: '/assets/images/story_9.png', side: 'right' },
  ]

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto px-4 sm:px-8 pt-20 pb-8">
      {/* Track background */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-primary/6 -translate-x-1/2" />

      {/* Glowing animated line */}
      <motion.div
        className="absolute left-4 md:left-1/2 top-0 w-[2px] -translate-x-1/2 rounded-full"
        style={{
          height: lineHeight,
          background: 'linear-gradient(to bottom, rgba(76,175,80,1), rgba(76,175,80,0.5))',
          boxShadow: '0 0 8px rgba(76,175,80,0.8), 0 0 20px rgba(76,175,80,0.4), 0 0 40px rgba(76,175,80,0.15)',
          filter: 'blur(0.3px)',
        }}
      />

      {/* Cards */}
      {events.map((event, i) => (
        <StoryCard key={i} event={event} index={i} />
      ))}
    </div>
  )
}

// ============================================================
// CLOSING — "Algeria Deserves to Be Green"
// ============================================================
function ClosingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-20%' })
  const t = useTranslation().About

  return (
    <div ref={ref} className="relative z-10 section-container py-32">
      {/* Green line flowing into the box */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-28 rounded-full"
        style={{
          background: 'linear-gradient(to bottom, rgba(76,175,80,0.6), rgba(76,175,80,0))',
          boxShadow: '0 0 12px rgba(76,175,80,0.5)',
        }}
      />

      <motion.div
        className="max-w-3xl mx-auto text-center space-y-8 p-12 sm:p-16 rounded-3xl border bg-[var(--color-surface)] relative overflow-hidden"
        animate={
          isInView
            ? {
                borderColor: ['rgba(76,175,80,0.08)', 'rgba(76,175,80,0.7)', 'rgba(76,175,80,0.25)'],
                boxShadow: [
                  '0 0 0px rgba(76,175,80,0)',
                  '0 0 100px rgba(76,175,80,0.35), inset 0 0 80px rgba(76,175,80,0.04)',
                  '0 0 40px rgba(76,175,80,0.12)',
                ],
              }
            : {
                borderColor: 'rgba(76,175,80,0.08)',
                boxShadow: '0 0 0px rgba(76,175,80,0)',
              }
        }
        transition={{ duration: 1.8, ease: 'easeOut' }}
      >
        {/* Flash pulse */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={isInView ? { backgroundColor: ['rgba(76,175,80,0)', 'rgba(76,175,80,0.08)', 'rgba(76,175,80,0.02)'] } : {}}
          transition={{ duration: 1.5 }}
        />

        <div className="relative z-10">
          <motion.p
            className="text-brand-primary font-mono text-xs tracking-[0.3em] uppercase"
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t.mission_label}
          </motion.p>

          <motion.h2
            className="text-4xl sm:text-5xl font-heading font-bold text-[var(--color-foreground)] leading-tight mt-4"
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t.mission_title_1}{' '}
            <motion.span
              className="text-brand-primary inline-block"
              animate={
                isInView
                  ? { textShadow: ['0 0 0px rgba(76,175,80,0)', '0 0 50px rgba(76,175,80,1)', '0 0 20px rgba(76,175,80,0.6)'] }
                  : {}
              }
              transition={{ delay: 0.9, duration: 1.2 }}
            >
              {t.mission_title_green}
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-[var(--color-body)] leading-relaxed text-lg max-w-2xl mx-auto mt-6"
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {t.mission_desc}
          </motion.p>

          <motion.p
            className="text-[var(--color-primary)] opacity-80 italic text-md font-serif mt-6"
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {t.mission_quote}
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function AboutPage() {
  const t = useTranslation().About

  return (
    <div className="relative min-h-screen bg-[var(--color-background)] overflow-hidden">
      <ParallaxBackground />
      <DecorativeShapes />

      {/* Hero */}
      <div className="relative z-10 pt-32 sm:pt-40 pb-24 text-center section-container">
        <motion.p
          className="text-[var(--color-primary)] opacity-80 font-mono text-xs tracking-[0.35em] uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {t.date_range}
        </motion.p>

        <motion.div
          className="inline-block px-5 py-1.5 mb-6 rounded-full border border-brand-primary/30 bg-brand-primary/5 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="font-mono text-brand-primary text-sm font-bold tracking-wider">
            {t.marketing_quote}
          </span>
        </motion.div>

        <motion.h1
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--color-foreground)] leading-[1.1] mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {t.title_story_of}{' '}
          <span
            className="text-brand-primary"
            style={{ textShadow: '0 0 30px rgba(76,175,80,0.35)' }}
          >
            {t.title_tazrout}
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto max-w-3xl text-[var(--color-muted)] text-lg sm:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {t.hero_desc}
        </motion.p>

        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-[var(--color-primary)] opacity-80 text-[10px] font-mono tracking-[0.4em] uppercase">{t.scroll_hint}</span>
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-primary)] to-transparent opacity-80"
            animate={{ scaleY: [1, 1.6, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative z-10">
        <Timeline />
      </div>

      {/* Closing */}
      <ClosingSection />

      {/* Team */}
      <div className="relative z-10 pb-24">
        <TeamSection />
      </div>
    </div>
  )
}
