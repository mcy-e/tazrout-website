import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Preview the Tazrout Flutter desktop dashboard — real-time monitoring with Amazigh heritage design.',
}

const DASHBOARD_SCREENS = [
  { src: '/assets/dashboard/dark/Home-Dark.svg', title: 'Home Overview' },
  { src: '/assets/dashboard/dark/Analytics-Dark.svg', title: 'Analytics & Trends' },
  { src: '/assets/dashboard/dark/Zones-Dark.svg', title: 'Zone Management' },
  { src: '/assets/dashboard/dark/Settings-Dark.svg', title: 'System Settings' },
  { src: '/assets/dashboard/dark/Help-Dark.svg', title: 'Help & Documentation' },
  { src: '/assets/dashboard/dark/Manual-Dark.svg', title: 'Manual Controls' },
  { src: '/assets/dashboard/dark/Emergency-Dark.svg', title: 'Emergency Alerts' },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center py-20 sm:py-32 bg-[var(--color-surface)]">
      <div className="section-container space-y-12">
        <div className="text-center space-y-4">
          <h1 className="font-heading text-4xl font-bold text-[var(--color-foreground)]">
            Dashboard Preview
          </h1>
          <p className="mx-auto max-w-lg text-[var(--color-muted)]">
            Screenshot gallery and feature walkthrough of the Flutter desktop application.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {DASHBOARD_SCREENS.map((screen, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-4">
              <h2 className="font-heading text-2xl font-semibold text-brand-primary">
                {screen.title}
              </h2>
              <div className="w-full max-w-6xl overflow-hidden rounded-xl border border-brand-primary/20 shadow-[0_0_40px_rgba(76,175,80,0.15)]">
                <Image
                  src={screen.src}
                  alt={screen.title}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
