import { Suspense } from 'react'
import HeroSection from './(client)/home/HeroSection'
import ServicesStats from './(client)/home/ServicesStats'
import InfoCards from './(client)/home/InfoCards'
import MissionSection from './(client)/home/MissionSection'
import OurPrograms from './(client)/home/OurPrograms'
import ImpactStories from './(client)/home/ImpactStories'
import ExecutiveCommitteeMembers from './(client)/home/ExecutiveCommitteeMembers'
import GetInvolved from './(client)/home/GetInvolved'
import NewsSection from './(client)/home/NewsSection'

// Loading component for sections
function SectionLoading() {
  return <div className="h-64 animate-pulse bg-secondary-base/10 rounded-lg" />
}

// Server Component
export default async function Home({ searchParams }) {
  const language = searchParams?.lang || 'en'

  return (
    <div>
      <HeroSection />
      <ServicesStats />
      <InfoCards />
      <MissionSection />
      <OurPrograms />
      <ImpactStories />

      <Suspense fallback={<SectionLoading />}>
        <ExecutiveCommitteeMembers language={language} />
      </Suspense>

      <GetInvolved />
      <NewsSection />
    </div>
  )
}
