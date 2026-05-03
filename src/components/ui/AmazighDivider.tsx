'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeIn } from '@/lib/animations'

const PATTERN_MAP = {
  dots: '/assets/amazigh/patterns/pattern_01_dots_line.svg',
  diamonds: '/assets/amazigh/patterns/pattern_02_diamonds_chain.svg',
  cross: '/assets/amazigh/patterns/pattern_03_cross_diamond_grid.svg',
  zigzag: '/assets/amazigh/patterns/pattern_04_zigzag_bold.svg',
  triangles: '/assets/amazigh/patterns/pattern_07_triangle_wave.svg',
  snowflake: '/assets/amazigh/patterns/pattern_08_snowflake_row.svg',
  chevron: '/assets/amazigh/patterns/pattern_11_arrow_chevron_row.svg',
  medallion: '/assets/amazigh/patterns/pattern_12_circle_medallion_row.svg',
  greek: '/assets/amazigh/patterns/pattern_14_greek_key.svg',
} as const

interface AmazighDividerProps {
  pattern?: keyof typeof PATTERN_MAP
  className?: string
  animated?: boolean
}

export default function AmazighDivider({
  pattern = 'diamonds',
  className,
  animated = true,
}: AmazighDividerProps) {
  const src = PATTERN_MAP[pattern]

  const content = (
    <div
      className={cn(
        'relative mx-auto my-16 flex w-full max-w-4xl items-center justify-center',
        'opacity-50 transition-all duration-700 hover:opacity-100 hover:scale-105',
        className
      )}
    >
      <div className="absolute inset-0 bg-brand-primary/20 blur-[50px] rounded-full scale-y-50 pointer-events-none" />
      <Image
        src={src}
        alt="Amazigh decorative pattern"
        width={800}
        height={48}
        className="h-8 w-full object-contain sm:h-12 drop-shadow-[0_0_12px_rgba(76,175,80,0.4)]"
        unoptimized
      />
    </div>
  )

  if (!animated) return content

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {content}
    </motion.div>
  )
}
