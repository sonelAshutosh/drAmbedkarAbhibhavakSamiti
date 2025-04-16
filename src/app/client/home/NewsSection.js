'use client'

import { useContext } from 'react'
import { LanguageContext } from '@/lib/languageContext'

const newsUpdates = [
  {
    date: '02 Aug 2023',
    content: 'NGO registered on 02-08-2023.',
  },
  {
    date: '15 Sep 2023',
    content: 'Upcoming Sports Day—stay tuned!',
  },
]

const NewsSection = () => {
  const { language } = useContext(LanguageContext)

  return (
    <div className="bg-primary-base py-8 px-4 lg:px-20">
      <div className="mx-auto flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-secondary-dark flex items-center gap-2">
              {language === 'hi' ? 'समाचार एवं अपडेट्स' : 'News & Updates'}
            </h2>
            <a href="#" className="text-secondary-dark text-sm hover:underline">
              {language === 'hi' ? 'सभी देखें' : 'View All'}
            </a>
          </div>
          <div className="mt-4 space-y-4">
            {newsUpdates.map((update, index) => (
              <div
                key={index}
                className="border border-secondary-dark bg-secondary-dark/15 p-4 rounded-md relative bg-primary-base shadow-sm"
              >
                <p className="text-primary-dark text-sm">{update.content}</p>
                <div className="text-primary-dark/80 text-xs mt-2 flex justify-between items-center">
                  <span>📅 {update.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="border border-secondary-dark bg-secondary-dark/15 rounded-md p-6">
            <h2 className="text-xl font-bold text-secondary-dark mb-4">
              {language === 'hi'
                ? 'न्यूज़लेटर सब्सक्राइब करें'
                : 'Subscribe to our Newsletter'}
            </h2>
            <p className="text-secondary-dark/80 text-sm mb-4">
              {language === 'hi'
                ? 'ताज़ा खबरें और अपडेट पाने के लिए अपना ईमेल दर्ज करें।'
                : 'Enter your email to receive the latest news and updates.'}
            </p>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder={
                  language === 'hi' ? 'ईमेल दर्ज करें' : 'Enter your email'
                }
                className="border border-primary-dark/75 rounded px-4 py-2"
              />
              <button
                type="submit"
                className="bg-accent-base text-primary-base px-6 py-2 rounded-lg shadow hover:bg-accent-dark transition"
              >
                {language === 'hi' ? 'सब्सक्राइब करें' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsSection
