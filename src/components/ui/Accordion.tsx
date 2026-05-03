'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { accordionContent, DURATION, EASE } from '@/lib/animations'

export interface AccordionItem {
  id: string
  question: string
  answer: string
  icon?: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export default function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  function toggleItem(id: string) {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id

        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden rounded-[var(--radius-md)] border transition-colors duration-300',
              isOpen
                ? 'border-brand-primary/30 bg-brand-primary/5'
                : 'border-[var(--color-border-subtle)] bg-brand-surface'
            )}
          >
            <button
              id={`accordion-trigger-${item.id}`}
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              className={cn(
                'flex w-full items-center gap-4 px-6 py-5 text-start',
                isOpen ? 'bg-brand-primary/5' : 'hover:bg-[var(--color-surface-hover)]'
              )}
            >
              {item.icon && (
                <span className="flex-shrink-0 text-brand-primary">{item.icon}</span>
              )}
              <span
                className={cn(
                  'flex-1 font-heading text-base font-semibold transition-colors duration-300',
                  isOpen ? 'text-brand-primary' : 'text-[var(--color-foreground)]'
                )}
              >
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: DURATION.normal, ease: EASE.out }}
                className="flex-shrink-0 text-[var(--color-muted)]"
              >
                <ChevronDown size={20} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  variants={accordionContent}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0 text-[var(--color-body)] leading-[1.8] whitespace-pre-line">
                    <div className={cn(item.icon ? 'ms-10' : '')}>
                      {item.answer}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
