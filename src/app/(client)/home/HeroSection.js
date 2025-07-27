'use client'

import { LanguageContext } from '@/lib/languageContext'
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'

const translations = {
  en: {
    title: 'Dr. Ambedkar',
    subtitle: 'Abhibhavak Samiti',
    joinUs: 'Join Us',
    donate: 'Donate',
  },
  hi: {
    title: 'डॉ. अंबेडकर',
    subtitle: 'अभिभावक समिति',
    joinUs: 'हमसे जुड़ें',
    donate: 'दान करें',
  },
}

const HeroSection = () => {
  const { language } = useContext(LanguageContext)

  return (
    <div
      className="relative w-full h-[90vh] flex items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: "url('/images/hero_section_1.jpg')" }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-secondary-dark/40"></div>

      {/* Content */}
      <div className="relative text-center text-primary-base px-4 py-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-normal overflow-visible">
          {translations[language].title}{' '}
          <span className="bg-gradient-to-r from-secondary-dark to-accent-dark bg-clip-text text-transparent py-2">
            {translations[language].subtitle}
          </span>
        </h1>

        {/* Buttons */}
        <div className="mt-6 flex justify-center items-center flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Join Us Button */}
          <Link href={'/client/contact-us'}>
            <button className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-accent-base to-secondary-base text-primary-dark px-6 md:px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all border-2 border-accent-base duration-300 hover:from-transparent hover:to-transparent hover:text-primary-base hover:border-accent-base hover:border-2">
              {translations[language].joinUs}
            </button>
          </Link>

          {/* Donate Button */}
          <Link href={'/client/donate'}>
            <button className="w-full sm:w-auto min-w-[140px] border-2 border-accent-base text-primary-base dark:text-primary-base px-6 md:px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-accent-base hover:to-secondary-base hover:text-primary-dark">
              {translations[language].donate}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
