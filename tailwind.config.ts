import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Tazrout Brand Colors (from design system) ──
        brand: {
          primary:   'var(--color-primary)',   // Chateau Green
          accent:    'var(--color-primary-dark)',   // Deep Accent
          deep:      'var(--color-background)',   // Darkest bg
          mid:       'var(--color-background-mid)',   // Mid dark bg
          surface:   'var(--color-surface)',   // Card surface
          error:     'var(--color-error)',   // Alert red
          blue:      'var(--color-series-blue)',   // Chart blue
          amber:     'var(--color-series-amber)',   // Chart amber
        },
        // ── Semantic aliases ──
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted:      'var(--color-muted)',
        border:     'var(--color-border)',
      },
      fontFamily: {
        sans:    ['Inter', 'var(--font-inter)', 'sans-serif'],
        heading: ['Lora', 'var(--font-lora)', 'serif'],
      },
      // Extend with design system spacing/radius when _references are added
      borderRadius: {
        'tazrout': '12px',  // default card radius — update from design system
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float':     'float 6s ease-in-out infinite',
        'icon-wiggle': 'iconWiggle 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        iconWiggle: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%':      { transform: 'rotate(-4deg) scale(1.05)' },
          '75%':      { transform: 'rotate(4deg) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
