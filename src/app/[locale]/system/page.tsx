import type { Metadata } from 'next'
import InteractiveArchitecture from '@/components/sections/InteractiveArchitecture'
import ArchitectureDiagram from '@/components/sections/ArchitectureDiagram'
import { getDictionary } from '@/lib/dictionary'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getDictionary(locale as any)
  return {
    title: t.System.banner_title,
    description: t.System.banner_desc,
  }
}

export default async function SystemPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale as any)
  const system = t.System

  return (
    <main className="bg-[var(--color-background)]">
      <div className="pt-20 sm:pt-28 pb-12 text-center section-container px-6">
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[var(--color-foreground)] mb-4">
          {system.banner_title}
        </h1>
        <p className="mx-auto max-w-xl text-[var(--color-muted)] text-base sm:text-lg">
          {system.banner_desc}
        </p>
      </div>

      <InteractiveArchitecture />

      {/* 2D Summary Diagram at the end */}
      <div className="relative z-20 bg-[var(--color-background)] py-16 sm:py-24 border-t border-brand-primary/20">
        <div className="text-center mb-12 sm:mb-16 section-container px-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-brand-primary mb-4">
            {system.summary_title}
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            {system.summary_desc}
          </p>
        </div>
        <ArchitectureDiagram />
      </div>
    </main>
  )
}
