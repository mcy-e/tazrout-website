import Hero from '@/components/sections/Hero'
import FeaturesGrid from '@/components/sections/FeaturesGrid'
import SystemPreview from '@/components/sections/SystemPreview'
import TeamSection from '@/components/sections/TeamSection'
import InstallationCTA from '@/components/sections/InstallationCTA'
import InnovationBlock from '@/components/sections/InnovationBlock'
import RoadmapSection from '@/components/sections/RoadmapSection'
import ParallaxBackground from '@/components/ui/ParallaxBackground'
import DecorativeShapes from '@/components/ui/DecorativeShapes'
import HomeAmbience from '@/components/sections/home/HomeAmbience'
import PitchEvidenceStrip from '@/components/sections/pitch/PitchEvidenceStrip'
import PitchFlowSection from '@/components/sections/pitch/PitchFlowSection'
import PitchValueAndMarket from '@/components/sections/pitch/PitchValueAndMarket'
import PitchArchitectureRibbon from '@/components/sections/pitch/PitchArchitectureRibbon'
import PitchCompetitiveStrip from '@/components/sections/pitch/PitchCompetitiveStrip'
import PitchClosingAsk from '@/components/sections/pitch/PitchClosingAsk'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--color-background)]">
      <ParallaxBackground />
      <DecorativeShapes layout="scattered" />
      <HomeAmbience />

      <div className="relative z-[2]">
      <Hero />
      <PitchEvidenceStrip />
      <InnovationBlock />
      <PitchFlowSection />
      <PitchValueAndMarket />
      <FeaturesGrid />
      <SystemPreview />
      <PitchArchitectureRibbon />
      <PitchCompetitiveStrip />
      <RoadmapSection />
      <TeamSection />
      <PitchClosingAsk />
      <InstallationCTA />
      </div>
    </div>
  )
}
