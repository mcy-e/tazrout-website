'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

interface StatProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ value, label, prefix = '', suffix = '' }: StatProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const duration = 2000 // 2 seconds

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      if (progress < duration) {
        const percentage = Math.min(progress / duration, 1)
        // Ease out quad
        const easeOut = 1 - (1 - percentage) * (1 - percentage)
        setCount(Math.floor(easeOut * value))
        requestAnimationFrame(animateCount)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animateCount)
  }, [isInView, value])

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <span 
        ref={ref} 
        className="font-heading text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl"
      >
        {prefix}{count}{suffix}
      </span>
      <span className="mt-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)]">
        {label}
      </span>
    </div>
  )
}

interface StatsData {
  regions: number
  terrains: number
  waterSaved: number
}

export default function StatsBar() {
  return (
    <section className="relative z-20 mx-auto max-w-6xl px-6">
      <motion.div 
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="glass-surface py-8 min-h-[120px] rounded-2xl shadow-[var(--shadow-elevated)] flex items-center justify-center"
      >
        <div className="p-8 text-center">
          <p className="text-lg font-medium text-[var(--color-foreground)]">
            Statistics aren't ready for beta. We will update when ready.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
