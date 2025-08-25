'use client'

import React, { useContext } from 'react'
import { LanguageContext } from '@/lib/languageContext'

function HeroSection() {
  const { language } = useContext(LanguageContext)

  const headingParts =
    language === 'hi'
      ? ['डॉ. भीमराव अंबेडकर', 'राजकीय आवासीय उच्च माध्यमिक विद्यालय']
      : ['Dr. Bhimrao Ambedkar', 'Rajkiya Avasiya Uchch Madhyamik Vidyalaya']

  const paragraph =
    language === 'hi'
      ? 'सामाजिक न्याय एंव अधिकारिता विभाग द्वारा संचालित विद्यालय'
      : 'School run by the Department of Social Justice and Empowerment'

  return (
    <section className="px-4 lg:px-20 relative h-[70vh] md:h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/images/school_hero.png')",
        }}
      ></div>
      <div className="absolute inset-0 bg-primary-dark/50 backdrop-blur-sm"></div>

      <div className="relative z-10 h-full w-full flex flex-col justify-center items-start text-left text-primary-base px-4">
        <h1 className="max-w-6xl text-4xl md:text-6xl font-bold mb-8 leading-tight">
          {headingParts[0]}{' '}
          <span className="pt-4 mt-4 text-primary-base">{headingParts[1]}</span>
        </h1>
        <p className="text-lg md:text-2xl max-w-3xl text-primary-basefont-semibold">
          {paragraph}
        </p>
      </div>
    </section>
  )
}

export default HeroSection
