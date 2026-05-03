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
      <div className="pt-24 pb-12 text-center section-container">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[var(--color-foreground)] mb-4">
          {system.banner_title}
        </h1>
        <p className="mx-auto max-w-xl text-[var(--color-muted)] text-lg">
          {system.banner_desc}
        </p>
      </div>

      <InteractiveArchitecture />

      {/* 2D Summary Diagram at the end */}
      <div className="relative z-20 bg-[var(--color-background)] py-24 border-t border-brand-primary/20">
        <div className="text-center mb-16 section-container">
          <h2 className="text-4xl font-heading font-bold text-brand-primary mb-4">
            {system.summary_title}
          </h2>
          <p className="text-[var(--color-muted)] max-w-2xl mx-auto">
            {system.summary_desc}
          </p>
        </div>
        <ArchitectureDiagram />
      </div>
    </main>
  )
}
