import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function Card({ children, className, hover = false, glow = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-md)] border border-[var(--color-border-subtle)]',
        'bg-brand-surface p-6',
        'transition-all duration-300 ease-[var(--ease-out)]',
        hover && 'hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-[var(--shadow-elevated)]',
        glow && 'hover:shadow-[var(--shadow-glow)]',
        className
      )}
    >
      {children}
    </div>
  )
}
