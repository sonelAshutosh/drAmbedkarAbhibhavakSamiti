'use client'

import Image from 'next/image'
import { useContext } from 'react'
import Link from 'next/link'
import { LanguageContext } from '@/lib/languageContext'

const keyMembers = [
  {
    name: { en: 'Suraj Mal', hi: 'सूरज माल' },
    position: { en: 'President', hi: 'अध्यक्ष' },
    imageUrl: '/images/placeholder.png',
  },
  {
    name: { en: 'Abdul Halim Raj Belim', hi: 'अब्दुल हलीम राज बेलिम' },
    position: { en: 'Vice President', hi: 'उपाध्यक्ष' },
    imageUrl: '/images/placeholder.png',
  },
  {
    name: { en: 'Bhawani Shankar', hi: 'भावानी शंकर' },
    position: { en: 'Secretary', hi: 'सचिव' },
    imageUrl: '/images/placeholder.png',
  },
  {
    name: { en: 'Prema Ram', hi: 'प्रेमा राम' },
    position: { en: 'Treasurer', hi: 'कोषाध्यक्ष' },
    imageUrl: '/images/placeholder.png',
  },
]

const ExecutiveCommitteeMembers = () => {
  const { language } = useContext(LanguageContext)

  return (
    <div className="bg-primary-base py-12 px-4 lg:px-20">
      <div className="mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-secondary-dark">
            {language === 'hi' ? 'कार्यकारी समिति' : 'Executive Committee'}
          </h2>
          <p className="mt-4 text-lg text-secondary-dark/80">
            {language === 'hi'
              ? 'हमारे मिशन का नेतृत्व करने वाली समर्पित टीम से मिलिए।'
              : 'Meet the dedicated team leading our mission.'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {keyMembers.map((member, index) => (
            <div
              key={index}
              className="bg-secondary-base/25 rounded-xl shadow-md p-4 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src={member.imageUrl}
                  alt={member.name.en}
                  width={96}
                  height={96}
                  className="object-cover border-2 border-secondary-dark rounded-full"
                />
              </div>
              <h3 className="font-semibold text-secondary-dark">
                {member.name[language]}
              </h3>
              <p className="text-primary-dark/80 text-sm mt-1">
                {member.position[language]}
              </p>
            </div>
          ))}
        </div>

        {/* Link to all members */}
        <div className="mt-8 justify-self-end">
          <Link
            href="/executive-committee/members"
            className="text-secondary-dark font-bold px-4 py-2 hover:underline transition"
          >
            {language === 'hi' ? 'सभी देखें' : 'View All'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveCommitteeMembers
