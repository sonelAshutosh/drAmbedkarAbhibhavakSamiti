'use client'

import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '@/lib/languageContext'
import { getLatestCampaign } from '@/app/admin/campaigns/action'
import Link from 'next/link'
import _ from 'lodash'
import { Skeleton } from '@/components/ui/skeleton'

const OurPrograms = () => {
  const { language } = useContext(LanguageContext)
  const [latestCampaign, setLatestCampaign] = useState(null)

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await getLatestCampaign()

        if (res.status === 'success') {
          setLatestCampaign(res.data)
        }
      } catch (err) {
        console.error('Failed to fetch latest campaign:', err)
      }
    }

    fetchCampaign()
  }, [])

  if (!latestCampaign) {
    return (
      <div className="bg-[url('/images/pattern-bg.png')] py-12 px-4 lg:px-20">
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-secondary-dark text-2xl font-bold flex items-center gap-2">
              {language === 'hi' ? 'हमारे अभियान' : 'Our Campaigns'}
            </h2>
            <Link
              href="/client/campaigns"
              className="text-secondary-dark text-sm hover:underline hover:scale-105"
            >
              {language === 'hi' ? 'सभी देखें' : 'View All'}
            </Link>
          </div>

          <div className="grid gap-6">
            <div className="bg-secondary-base/20 flex flex-col lg:flex-row rounded-xl shadow-md overflow-hidden">
              <Skeleton className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96" />
              <div className="p-4 flex flex-col w-full lg:w-1/2 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const program = {
    title: {
      en: latestCampaign.name,
      hi: latestCampaign.name,
    },
    imageUrl: latestCampaign.image,
    description: {
      en: latestCampaign.description,
      hi: latestCampaign.description,
    },
    link: `/client/campaigns/${_.kebabCase(latestCampaign.name)}`,
  }

  return (
    <div className="bg-[url('/images/pattern-bg.png')] py-12 px-4 lg:px-20">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-secondary-dark text-2xl font-bold flex items-center gap-2">
            {language === 'hi' ? 'हमारे अभियान' : 'Our Campaigns'}
          </h2>
          <Link
            href="/client/campaigns"
            className="text-secondary-dark text-sm hover:underline hover:scale-105"
          >
            {language === 'hi' ? 'सभी देखें' : 'View All'}
          </Link>
        </div>

        <div className="grid gap-6">
          <div className="bg-secondary-base/20 flex flex-col lg:flex-row rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 relative">
              <Image
                src={program.imageUrl}
                alt={program.title.en}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-4 flex flex-col w-full lg:w-1/2">
              <h3 className="text-secondary-dark font-bold text-xl sm:text-2xl">
                {program.title[language]}
              </h3>
              <p className="text-secondary-dark/90 font-semibold text-sm sm:text-base mt-2">
                {program.description[language]}
              </p>
              <Link
                href={program.link}
                className="text-accent-base font-semibold mt-3 block hover:underline text-sm sm:text-base"
              >
                {language === 'hi' ? 'और पढ़ें' : 'Read More'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurPrograms
