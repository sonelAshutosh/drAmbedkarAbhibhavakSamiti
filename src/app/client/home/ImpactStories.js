'use client'

import Image from 'next/image'
import { useContext } from 'react'
import { LanguageContext } from '@/lib/languageContext'
import Link from 'next/link'

const impactStoriesData = [
  {
    quote: {
      en: 'Thanks to the Samiti, my child received books and a chance to play sports.',
      hi: 'समिति की बदौलत, मेरे बच्चे को किताबें मिलीं और खेलने का अवसर मिला।',
    },
    name: 'Rahul Singh',
    image: '/images/beneficiary1.jpg',
    link: '#',
  },
  {
    quote: {
      en: 'The NGO’s efforts brought hope to our community with better educational resources.',
      hi: 'एनजीओ के प्रयासों ने हमारी समुदाय में बेहतर शैक्षणिक संसाधनों के साथ आशा की किरण लाई।',
    },
    name: 'Sunita Kumari',
    image: '/images/beneficiary2.jpg',
    link: '#',
  },
  // You can add more impact stories here
]

const ImpactStories = () => {
  const { language } = useContext(LanguageContext)

  return (
    <div className="bg-secondary-dark py-6 px-4 lg:px-20">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-accent-base text-2xl font-bold flex items-center gap-2">
          {language === 'hi' ? 'प्रभाव कहानियाँ' : 'Impact Stories'}
        </h2>
        {/* //TODO: Add the url for the page */}
        <Link href="#" className="text-accent-base text-sm hover:underline">
          {language === 'hi' ? 'सभी देखें' : 'View All'}
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {impactStoriesData.map((story, index) => (
          <Link
            key={index}
            href={story.link}
            className="relative bg-gradient-to-br from-primary-base via-accent-base to-primary-base p-[4px] rounded-xl max-w-sm transition hover:shadow-lg"
          >
            <div className="bg-secondary-dark/75 rounded-[10px] p-4 flex flex-col gap-4 shadow-md h-full">
              <div className="flex items-center gap-4">
                <Image
                  src={story.image}
                  alt={story.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <span className="font-semibold text-primary-base">
                  {story.name}
                </span>
              </div>
              <p className="text-primary-base muted italic">
                "{story.quote[language]}"
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ImpactStories
