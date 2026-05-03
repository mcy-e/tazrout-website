'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/** Corner-only placements — avoids the vertical band where hero CTAs and headings sit */
const SHAPES_CORNERS = [
  { src: '/assets/animations/shape_4.svg', size: 120, top: '5%', insetInlineEnd: '4%', delay: 0 },
  { src: '/assets/animations/shape_6.svg', size: 100, top: '8%', insetInlineStart: '5%', delay: 0.4 },
  { src: '/assets/animations/shape_7.svg', size: 140, bottom: '10%', insetInlineEnd: '6%', delay: 0.8 },
]

/** Same density / motion language as the About page — scattered down the scroll */
const SHAPES_SCATTERED = [
  { src: '/assets/animations/shape_4.svg', size: 180, top: '5%', left: '85%', delay: 0 },
  { src: '/assets/animations/shape_5.svg', size: 140, top: '15%', left: '5%', delay: 0.5 },
  { src: '/assets/animations/shape_6.svg', size: 200, top: '25%', left: '80%', delay: 1 },
  { src: '/assets/animations/shape_7.svg', size: 160, top: '35%', left: '10%', delay: 0.2 },
  { src: '/assets/animations/shape_4.svg', size: 150, top: '45%', left: '90%', delay: 0.8 },
  { src: '/assets/animations/shape_5.svg', size: 170, top: '55%', left: '8%', delay: 0.3 },
  { src: '/assets/animations/shape_6.svg', size: 190, top: '65%', left: '85%', delay: 0.6 },
  { src: '/assets/animations/shape_7.svg', size: 150, top: '75%', left: '5%', delay: 1.2 },
  { src: '/assets/animations/shape_4.svg', size: 210, top: '85%', left: '88%', delay: 0.4 },
  { src: '/assets/animations/shape_5.svg', size: 140, top: '92%', left: '12%', delay: 0.9 },
]

function FloatingShapeCorners({
  src,
  size,
  delay,
}: {
  src: string
  size: number
  delay: number
}) {
  return (
    <motion.div
      className="relative opacity-[0.06] dark:opacity-[0.09]"
      style={{ width: size, height: size }}
      animate={{
        y: [0, -14, 0],
        rotate: [0, 6, -4, 0],
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: 14 + delay * 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <Image src={src} alt="" fill className="object-contain" unoptimized />
    </motion.div>
  )
}

function FloatingShapeScattered({
  src,
  size,
  delay,
}: {
  src: string
  size: number
  delay: number
}) {
  return (
    <motion.div
      className="relative opacity-[0.14] dark:opacity-[0.20]"
      style={{ width: size, height: size }}
      animate={{ y: [0, -30, 0], rotate: [0, 5, -5, 0], scale: [1, 1.03, 1] }}
      transition={{ duration: 15 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <Image src={src} alt="" fill className="object-contain" unoptimized />
    </motion.div>
  )
}

type DecorativeShapesProps = {
  /** `corners` = light hero-safe accents; `scattered` = About-style density + float */
  layout?: 'corners' | 'scattered'
}

export default function DecorativeShapes({ layout = 'corners' }: DecorativeShapesProps) {
  if (layout === 'scattered') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {SHAPES_SCATTERED.map((s, i) => (
          <div key={i} className="absolute" style={{ top: s.top, left: s.left }}>
            <FloatingShapeScattered src={s.src} size={s.size} delay={s.delay} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {SHAPES_CORNERS.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: s.top,
            bottom: s.bottom,
            insetInlineStart: s.insetInlineStart,
            insetInlineEnd: s.insetInlineEnd,
          }}
        >
          <FloatingShapeCorners src={s.src} size={s.size} delay={s.delay} />
        </div>
      ))}
    </div>
  )
}
