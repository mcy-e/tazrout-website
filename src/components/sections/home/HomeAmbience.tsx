'use client'

import { motion } from 'framer-motion'

/** Soft moving glows behind content so the home page feels alive without stealing focus */
export default function HomeAmbience() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -top-32 start-[-10%] h-[42vh] w-[42vh] rounded-full bg-brand-primary/[0.07] blur-[100px]"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 end-[-15%] h-[38vh] w-[38vh] rounded-full bg-emerald-500/[0.06] blur-[90px]"
        animate={{ opacity: [0.25, 0.45, 0.25], x: [0, -12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute bottom-0 start-[15%] h-[36vh] w-[48vh] rounded-full bg-brand-primary/[0.05] blur-[110px]"
        animate={{ opacity: [0.2, 0.4, 0.2], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  )
}
