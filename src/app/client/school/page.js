'use client'

import React, { useContext } from 'react'
import HeroSection from './HeroSection'
import { LanguageContext } from '@/lib/languageContext'
import Highlights from './Highlights'
import Latest from './Latest'
import TopStudents from './TopStudents'
import Faculty from './Faculty'

function SchoolPage() {
  const { language } = useContext(LanguageContext)

  return (
    <div>
      <HeroSection language={language} />
      <Highlights language={language} />
      <Latest language={language} />
      <Faculty language={language} />
      <TopStudents language={language} />
      {/* <div className="px-4 lg:px-20">
        SchoolPage
        <p>Comming Soon ...</p>
      </div> */}
    </div>
  )
}

export default SchoolPage
