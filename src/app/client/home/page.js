import React from 'react'
import HeroSection from './HeroSection'
import OurActivities from './OurActivities'
import FoundersMessage from './FoundersMessage'
import ImpactStats from './ImpactStats'
import StorySection from './StorySection'
import VolunteerSection from './VolunteerSection'
import Donators from './Donators'

function HomePage() {
  return (
    <div>
      <HeroSection />
      <OurActivities />
      <FoundersMessage />
      <ImpactStats />
      <StorySection />
      <VolunteerSection />
      <Donators />
    </div>
  )
}

export default HomePage
