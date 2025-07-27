'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import HeroSection from './(client)/home/HeroSection'
import ServicesStats from './(client)/home/ServicesStats'
import InfoCards from './(client)/home/InfoCards'
import MissionSection from './(client)/home/MissionSection'
import OurPrograms from './(client)/home/OurPrograms'
import ImpactStories from './(client)/home/ImpactStories'
import ExecutiveCommitteeMembers from './(client)/home/ExecutiveCommitteeMembers'
import GetInvolved from './(client)/home/GetInvolved'
import NewsSection from './(client)/home/NewsSection'

export default function Home() {
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
