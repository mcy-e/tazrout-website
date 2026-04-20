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
          primary:   '#4CAF50',   // Chateau Green
          accent:    '#258439',   // Deep Accent
          deep:      '#141C16',   // Darkest bg
          mid:       '#182319',   // Mid dark bg
          surface:   '#243128',   // Card surface
          error:     '#E94E31',   // Alert red
          blue:      '#549DF6',   // Chart blue
          amber:     '#FFB74D',   // Chart amber
        },
        // ── Semantic aliases ──
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted:      'var(--color-muted)',
        border:     'var(--color-border)',
      },
      fontFamily: {
        sans:    ['Inter', 'var(--font-inter)', 'sans-serif'],
        heading: ['Poppins', 'var(--font-poppins)', 'sans-serif'],
      },
      // Extend with design system spacing/radius when _references are added
      borderRadius: {
        'tazrout': '12px',  // default card radius — update from design system
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float':     'float 6s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
}

export default config
