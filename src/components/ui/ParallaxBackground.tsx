'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxBackground() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // We create different parallax speeds for different shapes
  // shape 1 moves up slightly faster
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-200%'])
  // shape 2 moves up slowly
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])
  // shape 3 moves up very fast
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-300%'])
  // shape 4 rotates and moves
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '-150%'])
  const rotate4 = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <div 
      ref={containerRef} 
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Top Right Shape — idle “breathing” + scroll parallax */}
      <motion.div 
        className="absolute top-[10%] end-[5%] opacity-10 dark:opacity-20"
        style={{ y: y1 }}
        animate={{ opacity: [0.06, 0.13, 0.06] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image 
          src="/assets/animations/shape_1.svg" 
          alt="" 
          width={150} 
          height={150} 
          unoptimized
        />
      </motion.div>

      {/* Middle Left Shape */}
      <motion.div 
        className="absolute top-[40%] start-[5%] opacity-10 dark:opacity-20"
        style={{ y: y2 }}
        animate={{ opacity: [0.07, 0.16, 0.07], rotate: [0, -6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <Image 
          src="/assets/animations/shape_2.svg" 
          alt="" 
          width={250} 
          height={250} 
          unoptimized
        />
      </motion.div>

      {/* Bottom Right Shape */}
      <motion.div 
        className="absolute top-[70%] end-[10%] opacity-10 dark:opacity-20"
        style={{ y: y3 }}
        animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <Image 
          src="/assets/animations/shape_3.svg" 
          alt="" 
          width={120} 
          height={120} 
          unoptimized
        />
      </motion.div>

      {/* Bottom Left — scroll rotation + gentle pulse */}
      <motion.div 
        className="absolute top-[85%] start-[10%] opacity-10 dark:opacity-20"
        style={{ y: y4, rotate: rotate4 }}
        animate={{ opacity: [0.06, 0.13, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image 
          src="/assets/animations/shape_1.svg" 
          alt="" 
          width={180} 
          height={180} 
          unoptimized
        />
      </motion.div>
    </div>
  )
}
