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
      ? 'मंडोर, जोधपुर में डॉ. भीमराव अंबेडकर अभिभावक समिति द्वारा संचालित एक आवासीय उच्च माध्यमिक विद्यालय।'
      : 'A residential higher secondary school in Mandore, Jodhpur, run by Dr. Bhimrao Ambedkar Abhibhavak Samiti.'

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
          <span className="pt-4 mt-4 bg-gradient-to-r from-accent-base via-primary-base to-accent-dark bg-clip-text text-transparent">
            {headingParts[1]}
          </span>
        </h1>
        <p className="text-lg md:text-2xl max-w-3xl bg-gradient-to-r from-primary-base via-secondary-base to-secondary-dark bg-clip-text text-transparent font-semibold">
          {paragraph}
        </p>
      </div>
    </section>
  )
}

export default HeroSection
