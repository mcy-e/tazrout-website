import type { Variants } from 'framer-motion'

export const DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  reveal: 0.6,
  stagger: 0.08,
} as const

export const EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE.out },
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE.out },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.reveal, ease: EASE.out },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.reveal, ease: EASE.out },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.reveal, ease: EASE.out },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.reveal, ease: EASE.out },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DURATION.stagger,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

/** Timeline dots: spring in with a slight pop */
export const milestonePop: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 22 },
  },
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: DURATION.fast, ease: EASE.smooth },
  },
}

export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: DURATION.normal, ease: EASE.smooth },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE.out },
  },
}

export const drawerSlide: Variants = {
  closed: {
    x: '100%',
    transition: { duration: DURATION.normal, ease: EASE.smooth },
  },
  open: {
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE.out },
  },
}

export const overlayFade: Variants = {
  closed: {
    opacity: 0,
    transition: { duration: DURATION.fast },
  },
  open: {
    opacity: 1,
    transition: { duration: DURATION.normal },
  },
}
