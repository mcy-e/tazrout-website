'use client'

import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const VARIANT_CLASSES = {
  primary:
    'bg-brand-primary text-white hover:bg-brand-accent shadow-[0_0_20px_rgba(76,175,80,0.2)] hover:shadow-[0_0_30px_rgba(76,175,80,0.35)]',
  secondary:
    'bg-transparent text-brand-primary border border-brand-primary/40 hover:bg-brand-primary/10 hover:border-brand-primary',
  ghost:
    'bg-transparent text-[var(--color-body)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-foreground)]',
} as const

const SIZE_CLASSES = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
} as const

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT_CLASSES
  size?: keyof typeof SIZE_CLASSES
  magnetic?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (!magnetic || !buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    buttonRef.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }

  function handleMouseLeave() {
    if (!magnetic || !buttonRef.current) return
    buttonRef.current.style.transform = 'translate(0, 0)'
  }

  return (
    <button
      ref={buttonRef}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 font-heading font-semibold',
        'transition-all duration-300 ease-[var(--ease-out)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  )
}
