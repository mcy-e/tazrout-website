'use client'

import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TooltipProps {
  content: string
  children: ReactNode
  className?: string
}

export default function Tooltip({ content, children, className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2',
              'whitespace-nowrap rounded-lg px-3 py-1.5',
              'bg-[var(--color-surface-elevated)] text-sm text-[var(--color-foreground)]',
              'border border-[var(--color-border-subtle)]',
              'shadow-[var(--shadow-card)]'
            )}
          >
            {content}
            <div
              className={cn(
                'absolute left-1/2 top-full -translate-x-1/2',
                'border-4 border-transparent border-t-[var(--color-surface-elevated)]'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
