import type { Metadata } from 'next'
import HelpPageClient from './HelpPageClient'

export const metadata: Metadata = {
  title: 'Help & Support',
  description:
    'Get help with the Tazrout smart irrigation system. Browse FAQs, follow the quick start guide, or contact the team for support.',
}

export default function HelpPage() {
  return <HelpPageClient />
}
