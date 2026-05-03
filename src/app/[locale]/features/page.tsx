'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Database, Heart, Cloud, Flame, Smartphone, Shield, TrendingUp, Hand, Cpu, Volume2 } from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'
import { fadeUp, staggerContainer } from '@/lib/animations'
// Removed ParallaxBackground as it may contain the static diamond mentioned

const ICON_MAP = {
  Database: <Database className="text-brand-primary" size={24} />,
  Cloud: <Cloud className="text-brand-primary" size={24} />,
  Flame: <Flame className="text-brand-primary" size={24} />,
  Smartphone: <Smartphone className="text-brand-primary" size={24} />,
  Shield: <Shield className="text-brand-primary" size={24} />,
  Hand: <Hand className="text-brand-primary" size={24} />,
  Cpu: <Cpu className="text-brand-primary" size={24} />,
  Volume2: <Volume2 className="text-brand-primary" size={24} />,
  Heart: <Heart className="text-brand-primary" size={24} />,
}

// ============================================================
// FLOATING DECORATIVE SHAPES (consistent with About page)
// ============================================================
const DECORATIVE_SHAPES = [
  { src: '/assets/animations/shape_4.png', size: 180, top: '5%', left: '85%', delay: 0 },
  { src: '/assets/animations/shape_5.png', size: 140, top: '15%', left: '5%', delay: 0.5 },
  { src: '/assets/animations/shape_6.png', size: 200, top: '25%', left: '80%', delay: 1 },
  { src: '/assets/animations/shape_7.png', size: 160, top: '35%', left: '10%', delay: 0.2 },
  { src: '/assets/animations/shape_4.png', size: 150, top: '45%', left: '90%', delay: 0.8 },
  { src: '/assets/animations/shape_5.png', size: 170, top: '55%', left: '8%', delay: 0.3 },
  { src: '/assets/animations/shape_6.png', size: 190, top: '65%', left: '85%', delay: 0.6 },
  { src: '/assets/animations/shape_7.png', size: 150, top: '75%', left: '5%', delay: 1.2 },
  { src: '/assets/animations/shape_4.png', size: 210, top: '85%', left: '88%', delay: 0.4 },
  { src: '/assets/animations/shape_5.png', size: 140, top: '95%', left: '12%', delay: 0.9 },
]

// Removed AMAZIGH_SHAPES array as requested

function FloatingShape({ src, size, delay }: { src: string; size: number; delay: number }) {
  return (
    <motion.div
      className="relative opacity-20 hover:opacity-40 transition-opacity duration-700"
      style={{ width: size, height: size }}
      animate={{ y: [0, -40, 0], rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 18 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <Image src={src} alt="Decorative shape" fill className="object-contain" unoptimized />
    </motion.div>
  )
}

function BackgroundElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Glow Orbs */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -start-20 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 120, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -end-20 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[140px]"
      />

      {/* About-style Floating Shapes */}
      {DECORATIVE_SHAPES.map((s, i) => (
        <div key={`deco-${i}`} className="absolute" style={{ top: s.top, left: s.left }}>
          <FloatingShape src={s.src} size={s.size} delay={s.delay} />
        </div>
      ))}

      {/* Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
          animate={{ y: ["-50px", "50px", "-50px"], rotate: [0, 360], scale: [1, 1.5, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-6 h-6 border border-brand-primary/20 rounded-sm"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        />
      ))}
    </div>
  )
}

export default function FutureFeaturesPage() {
  const t = useTranslation().FutureFeatures
  const { scrollYProgress } = useScroll()
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -400])

  return (
    <div className="relative min-h-screen bg-[var(--color-background)] overflow-hidden">
      {/* Removed ParallaxBackground to ensure the "static diamond" is gone */}
      <BackgroundElements />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
        <motion.div 
          style={{ y: yBg }}
          className="section-container relative z-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary text-xs font-mono uppercase tracking-[0.2em] mb-8 shadow-inner shadow-brand-primary/5"
          >
            <TrendingUp size={14} className="animate-pulse" />
            {t.subtitle}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl sm:text-8xl font-bold text-[var(--color-foreground)] mb-8 tracking-tight leading-[0.95]"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto max-w-3xl text-[var(--color-muted)] text-xl sm:text-2xl leading-relaxed font-medium"
          >
            {t.description}
          </motion.p>
        </motion.div>

        {/* Decorative central line */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: 180 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute left-1/2 bottom-0 w-px bg-gradient-to-b from-brand-primary/50 to-transparent"
        />
      </section>

      {/* Features Grid */}
      <section className="pb-40 relative z-10">
        <div className="section-container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {Object.entries(t.phases).map(([key, phase]: [string, any]) => (
              <motion.div
                key={key}
                variants={fadeUp}
                className="group relative rounded-[3rem] overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-surface)] transition-all duration-700 hover:border-brand-primary/40"
                whileHover={{
                  y: -25,
                  boxShadow: '0 0 120px rgba(76,175,80,0.2), 0 50px 120px rgba(0,0,0,0.7)',
                }}
              >
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                
                <div className="p-12 h-full flex flex-col items-stretch text-start relative z-10">
                  <motion.div 
                    whileHover={{ rotate: [0, -20, 20, 0], scale: 1.1 }}
                    className="w-16 h-16 self-start rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-10 group-hover:bg-brand-primary/20 transition-colors duration-500 relative"
                  >
                    {/* Icon Glow */}
                    <div className="absolute inset-0 bg-brand-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                    <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                      {ICON_MAP[phase.icon as keyof typeof ICON_MAP]}
                    </div>
                  </motion.div>
                  
                  <h3 className="font-heading text-3xl font-bold text-[var(--color-foreground)] mb-4 group-hover:text-brand-primary transition-colors duration-500 leading-tight">
                    {phase.title}
                  </h3>
                  
                  <p className="text-brand-primary text-[0.8rem] font-black mb-6 uppercase tracking-[0.4em] opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                    {phase.subtitle}
                  </p>
                  
                  <p className="text-[var(--color-muted)] leading-[1.8] text-[1.1rem] group-hover:text-[var(--color-body)] transition-colors duration-500">
                    {phase.description}
                  </p>

                  {/* Corner Accent TrendingUp Icon */}
                  <div className="absolute bottom-0 end-0 p-8 opacity-0 group-hover:opacity-30 transition-all duration-700 translate-x-8 translate-y-8 rtl:-translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0">
                     <TrendingUp size={100} className="text-brand-primary rotate-45" />
                  </div>
                </div>
                
                {/* Continuous Scan Light */}
                <motion.div 
                  initial={{ x: '-200%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-0 h-[4px] w-full bg-gradient-to-r from-transparent via-brand-primary/80 to-transparent"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
