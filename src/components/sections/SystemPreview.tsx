'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { useTranslation } from '@/lib/useTranslation'

export default function SystemPreview() {
  const t = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  // Subtle parallax effect on the image
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.0, 0.95])

  const SCREENS = [
    { src: '/assets/images/FARM-1.jpg', alt: t.Preview.alt1, offset: 'md:translate-y-0' },
    { src: '/assets/images/FARM-2.jpg', alt: t.Preview.alt2, offset: 'md:translate-y-12' },
    { src: '/assets/images/FARM-3.jpg', alt: t.Preview.alt3, offset: 'md:translate-y-24' },
  ]

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-brand-mid py-20 sm:py-32">
      
      <div className="section-container relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center mb-16 md:mb-24"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
            {t.Preview.title}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-muted)]">
            {t.Preview.description}
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-7xl">
          {/* Decorative glow behind the screens */}
          <div className="absolute inset-0 bg-brand-primary/20 blur-[120px] rounded-full transform -translate-y-10 scale-90" />
          
          <motion.div 
            style={{ y, scale }}
            className="grid gap-6 md:grid-cols-3 relative z-10"
          >
            {SCREENS.map((screen, idx) => (
              <div 
                key={idx} 
                className={`relative rounded-2xl border border-brand-primary/20 shadow-[var(--shadow-elevated)] bg-brand-deep overflow-hidden aspect-[10/16] md:aspect-[4/5] lg:aspect-[10/16] ${screen.offset} transition-transform duration-500 hover:-translate-y-2`}
              >
                <Image 
                  src={screen.src} 
                  alt={screen.alt} 
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
    </section>
  )
}
