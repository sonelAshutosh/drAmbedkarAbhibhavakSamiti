import React from 'react'
import HeroSection from './HeroSection'
import ServicesStats from './ServicesStats'
import InfoCards from './InfoCards'
import NewsSection from './NewsSection'
import MissionSection from './MissionSection'
import OurPrograms from './OurPrograms'
import ImpactStories from './ImpactStories'
import ExecutiveCommitteeMembers from './ExecutiveCommitteeMembers'
import GetInvolved from './GetInvolved'

function HomePage() {
  return (
    <div>
      <HeroSection />
      <ServicesStats />
      <InfoCards />
      <MissionSection />
      <OurPrograms />
      <ImpactStories />
      <ExecutiveCommitteeMembers />
      <GetInvolved />
      <NewsSection />
    </div>
  )
}

export default HomePage
