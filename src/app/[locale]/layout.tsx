import type { Metadata } from 'next'
import { inter, lora } from '@/lib/fonts'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Script from 'next/script'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Tazrout — Smart Irrigation System',
    template: '%s · Tazrout',
  },
  description:
    'Tazrout is a smart irrigation system built by students at the National School of Cyber Security, Algeria. Ancient roots, modern intelligence.',
  metadataBase: new URL('https://tazrout.vercel.app'),
  openGraph: {
    title: 'Tazrout — Smart Irrigation System',
    description:
      'AI-powered smart irrigation with real-time monitoring, LoRa connectivity, and Amazigh heritage design.',
    siteName: 'Tazrout',
    type: 'website',
  },
}

import { LocaleProvider } from '@/components/LocaleProvider'

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  
  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${lora.variable}`} data-scroll-behavior="smooth">
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('tazrout-theme');
                  const html = document.documentElement;
                  if (savedTheme === 'light') {
                    html.classList.add('light');
                  } else {
                    html.classList.remove('light');
                  }
                  
                  // Silence THREE.Clock deprecation warning
                  const originalWarn = console.warn;
                  console.warn = function(...args) {
                    if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
                    originalWarn.apply(console, args);
                  };
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="flex min-h-screen flex-col bg-[var(--color-background)]">
        <LocaleProvider locale={locale as 'ar' | 'en' | 'fr'}>
          <Navbar />
          <main className="flex-1 pt-16 sm:pt-20">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  )
}
