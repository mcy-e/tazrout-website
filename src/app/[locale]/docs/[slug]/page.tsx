import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getDocEntry, getAllDocSlugs } from '@/lib/docs/doc-registry'
import { loadDocMarkdown } from '@/lib/docs/load-doc'
import DocMarkdownBody from '@/components/docs/DocMarkdownBody'

type Props = {
  params: { locale: string; slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs()
  const locales = ['ar', 'en', 'fr'] as const
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getDocEntry(params.slug)
  if (!entry) {
    return { title: 'Documentation' }
  }
  return {
    title: entry.title,
    description: entry.description,
  }
}

export default async function DocSlugPage({ params }: Props) {
  const { locale, slug } = params
  const entry = getDocEntry(slug)
  if (!entry) {
    notFound()
  }

  const loaded = await loadDocMarkdown(slug)
  if (!loaded) {
    notFound()
  }

  const backLabel =
    locale === 'ar' ? 'العودة إلى مركز التوثيق' : locale === 'fr' ? 'Retour au centre de documentation' : 'Back to documentation hub'

  const sourceLabel = locale === 'ar' ? 'المصدر' : locale === 'fr' ? 'Source' : 'Source'

  return (
    <div className="relative min-h-screen bg-[var(--color-background)]">
      <div className="section-container max-w-4xl pb-24 pt-28 sm:pt-32">
        <Link
          href={`/${locale}/docs`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-brand-primary"
        >
          <ArrowLeft size={16} aria-hidden />
          {backLabel}
        </Link>

        <p className="mt-4 text-xs text-[var(--color-subtle)]">
          {sourceLabel}: <code className="text-brand-primary">{entry.file}</code>
        </p>

        <div className="mt-8">
          <DocMarkdownBody content={loaded.content} />
        </div>
      </div>
    </div>
  )
}
