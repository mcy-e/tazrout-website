import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const BADGE_VARIANTS = {
  default: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
  success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20',
  warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20',
  error: 'bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]/20',
  info: 'bg-[var(--color-info)]/10 text-[var(--color-info)] border-[var(--color-info)]/20',
} as const

interface BadgeProps {
  variant?: keyof typeof BADGE_VARIANTS
  children: ReactNode
  className?: string
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-3 py-1',
        'text-xs font-semibold uppercase tracking-wider',
        BADGE_VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
