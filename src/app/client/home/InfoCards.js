'use client'

import { useContext } from 'react'
import { LanguageContext } from '@/lib/languageContext'
import Link from 'next/link'

const cards = [
  {
    title: {
      en: 'School Details',
      hi: 'विद्यालय विवरण',
    },
    image: '/images/info_cards_bg_1.jpg',
    bgColor: 'bg-blue-500',
    link: '/client/school',
  },
  {
    title: {
      en: 'Join as a Volunteer',
      hi: 'स्वयंसेवक के रूप में जुड़ें',
    },
    image: '/images/info_cards_bg_2.jpg',
    bgColor: 'bg-green-600',
    link: '/client/volunteer',
  },
  {
    title: {
      en: 'Support Us',
      hi: 'हमें सहयोग दें',
    },
    image: '/images/info_cards_bg_3.jpg',
    bgColor: 'bg-rose-500',
    link: '/client/donate',
  },
  {
    title: {
      en: 'Gallery',
      hi: 'गैलरी',
    },
    image: '/images/info_cards_bg_3.jpg',
    bgColor: 'bg-fuchsia-600',
    link: '/client/gallery',
  },
  // {
  //   title: {
  //     en: 'Ongoing Initiatives',
  //     hi: 'चल रही पहल',
  //   },
  //   image: '/images/info_cards_bg_3.jpg',
  //   bgColor: 'bg-fuchsia-600',
  //   link: '/client/campaigns',
  // },
  {
    title: {
      en: 'Events & Campaigns',
      hi: 'कार्यक्रम और कार्यशालाएं',
    },
    image: '/images/info_cards_bg_1.jpg',
    bgColor: 'bg-yellow-600',
    link: '/client/campaigns',
  },
  {
    title: {
      en: 'Contact & Feedback',
      hi: 'संपर्क और सुझाव',
    },
    image: '/images/info_cards_bg_2.jpg',
    bgColor: 'bg-indigo-600',
    link: '/client/contact-us',
  },
]

const InfoCards = () => {
  const { language } = useContext(LanguageContext)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10 px-4 lg:px-20">
      {cards.map((card, index) => (
        <Link key={index} href={card.link}>
          <div
            className="relative rounded-xl p-6 text-primary-base shadow-lg transition-transform hover:scale-105 cursor-pointer"
            style={{
              backgroundImage: `url('${card.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className={`absolute inset-0 rounded-xl ${card.bgColor} opacity-75`}
            ></div>

            {/* Card content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
              <h3 className="text-lg lg:text-xl font-bold">
                {card.title[language]}
              </h3>
              <div className="flex justify-between items-center mt-4">
                <div className="h-12 w-12" />
                <div className="inline-flex items-center justify-center w-10 h-10 text-xl font-extrabold text-primary-base border-2 border-primary-base rounded-full transition-all hover:bg-primary-base hover:text-secondary-dark">
                  ↗
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default InfoCards
