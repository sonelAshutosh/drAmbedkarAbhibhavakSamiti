'use client'

import Image from 'next/image'
import { useContext } from 'react'
import { LanguageContext } from '@/lib/languageContext'

const programsData = [
  {
    title: {
      en: 'Educational Support',
      hi: 'शैक्षिक सहायता',
    },
    imageUrl: '/images/educational-support.jpg',
    description: {
      en: 'Workshops, student resources, and tutoring sessions to enhance quality education.',
      hi: 'कार्यशालाएं, छात्र संसाधन और ट्यूशन सत्र, गुणवत्तापूर्ण शिक्षा को बढ़ावा देने के लिए।',
    },
    link: '#',
  },
  {
    title: {
      en: 'Sports Initiatives',
      hi: 'खेल पहल',
    },
    imageUrl: '/images/sports-initiatives.jpg',
    description: {
      en: 'Providing equipment and organizing sporting events for holistic child development.',
      hi: 'बच्चों के संपूर्ण विकास के लिए उपकरण प्रदान करना और खेल आयोजनों का आयोजन करना।',
    },
    link: '#',
  },
  {
    title: {
      en: 'Awareness Campaigns',
      hi: 'जागरूकता अभियान',
    },
    imageUrl: '/images/awareness-campaigns.jpg',
    description: {
      en: 'Campaigns to combat child marriage, addiction, and promote social awareness.',
      hi: 'बाल विवाह, नशे के खिलाफ तथा सामाजिक जागरूकता बढ़ाने के लिए अभियान।',
    },
    link: '#',
  },
]

const OurPrograms = () => {
  const { language } = useContext(LanguageContext)

  return (
    <div className="bg-[url('/images/pattern-bg.png')] py-12 px-4 lg:px-20">
      <div className=" mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-secondary-dark text-2xl font-bold flex items-center gap-2">
            {language === 'hi' ? 'हमारे कार्यक्रम' : 'Our Programs'}
          </h2>
          <a
            href="#"
            className="text-secondary-dark text-sm hover:underline hover:scale-105"
          >
            {language === 'hi' ? 'सभी देखें' : 'View All'}
          </a>
        </div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {programsData.map((program, index) => (
            <div
              key={index}
              className="bg-secondary-base/20 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <Image
                className="w-full h-56 object-cover"
                src={program.imageUrl}
                alt={program.title.en}
                width={200}
                height={200}
              />
              <div className="p-4">
                <h3 className="text-secondary-dark font-bold text-lg">
                  {program.title[language]}
                </h3>
                <p className="text-secondary-dark/90 font-semibold text-sm mt-2">
                  {program.description[language]}
                </p>
                <a
                  href={program.link}
                  className="text-accent-base font-semibold mt-3 block hover:underline"
                >
                  {language === 'hi' ? 'और पढ़ें' : 'Read More'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurPrograms
