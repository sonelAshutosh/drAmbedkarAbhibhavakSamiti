'use client'

import { LanguageContext } from '@/lib/languageContext'
import Link from 'next/link'
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { getTopThreeMembers } from '@/app/admin/members/action'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const translations = {
  en: {
    title: 'Dr. Ambedkar',
    subtitle: 'Abhibhavak Samiti',
    joinUs: 'Join Us',
    donate: 'Donate',
    ourLeaders: 'Our Leaders',
  },
  hi: {
    title: 'डॉ. अंबेडकर',
    subtitle: 'अभिभावक समिति',
    joinUs: 'हमसे जुड़ें',
    donate: 'दान करें',
    ourLeaders: 'हमारे नेता',
  },
}

const HeroSection = () => {
  const { language } = useContext(LanguageContext)
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true)
      const res = await getTopThreeMembers()
      if (res.status === 'success') {
        setMembers(res.data)
      }
      setLoading(false)
    }
    fetchMembers()
  }, [])

  return (
    <div
      className="relative w-full h-[90vh] flex items-center justify-center bg-cover bg-center px-6"
      style={{ backgroundImage: "url('/images/hero_section_1.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary-dark/40"></div>

      {/* Content */}
      <div className="relative text-center text-primary-base px-4 py-4 max-w-5xl">
        <h1 className="text-3xl md:text-5xl flex flex-col lg:flex-row align-bottom font-bold leading-normal overflow-visible">
          <span className="text-primary-base lg:py-2 px-4">
            {translations[language].title}
          </span>
          <span className="text-primary-base lg:py-2">
            {translations[language].subtitle}
          </span>
        </h1>

        {/* Buttons */}
        <div className="mt-6 flex justify-center items-center flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href={'/contact-us'}>
            <button className="w-full sm:w-auto min-w-[140px] bg-gradient-to-r from-accent-base to-secondary-base text-primary-dark px-6 md:px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all border-2 border-accent-base duration-300 hover:from-transparent hover:to-transparent hover:text-primary-base hover:border-accent-base">
              {translations[language].joinUs}
            </button>
          </Link>

          <Link href={'/donate'}>
            <button className="w-full sm:w-auto min-w-[140px] border-2 border-accent-base text-primary-base px-6 md:px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-accent-base hover:to-secondary-base hover:text-primary-dark">
              {translations[language].donate}
            </button>
          </Link>
        </div>

        {/* Members Carousel */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            {translations[language].ourLeaders}
          </h2>

          {loading ? (
            <div className="flex justify-center gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-4 bg-secondary-base/40 rounded-lg shadow-md"
                >
                  <Skeleton className="h-24 w-24 rounded-full mb-4" />
                  <Skeleton className="h-5 w-[120px] mb-2" />
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              ))}
            </div>
          ) : (
            <Carousel
              opts={{
                align: 'center',
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full max-w-xl mx-auto overflow-hidden" // ensure track doesn’t push page width
            >
              <CarouselContent className="gap-6">
                {members.map((member, idx) => (
                  <CarouselItem
                    key={idx}
                    className="basis-full flex justify-center" // one item per view
                  >
                    <div className="flex flex-col items-center py-16  bg-primary-base/60 rounded-xl shadow-lg max-w-sm w-full">
                      <Image
                        src={member.image || '/images/placeholder.png'}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="object-cover rounded-full  border-2 border-secondary-dark"
                      />
                      <h3 className="mt-4 text-xl font-semibold text-primary-dark">
                        {member.name}
                      </h3>
                      <p className="text-primary-dark/60 italic font-semibold">
                        {member.designation}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      </div>
    </div>
  )
}

export default HeroSection
