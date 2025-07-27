'use client'

import Image from 'next/image'
import { useContext } from 'react'
import { LanguageContext } from '@/lib/languageContext'
import { BookOpen, DollarSign, Activity, AlertCircle, Flag } from 'lucide-react'

const missionStatement = {
  en: 'To promote quality education, support holistic child development, and raise awareness against social evils in Jodhpur.',
  hi: 'जोधपुर में गुणवत्तापूर्ण शिक्षा को बढ़ावा देना, संपूर्ण बाल विकास का समर्थन करना और सामाजिक बुराइयों के खिलाफ जागरूकता फैलाना।',
}

const objectives = [
  {
    objective: {
      en: 'Promote quality education in schools.',
      hi: 'स्कूलों में गुणवत्तापूर्ण शिक्षा को बढ़ावा देना।',
    },
    icon: BookOpen,
  },
  {
    objective: {
      en: 'Create a development fund for educational facilities.',
      hi: 'शैक्षिक सुविधाओं के लिए विकास कोष का निर्माण करना।',
    },
    icon: DollarSign,
  },
  {
    objective: {
      en: 'Provide sports resources for children.',
      hi: 'बच्चों के लिए खेल संसाधन प्रदान करना।',
    },
    icon: Activity,
  },
  {
    objective: {
      en: 'Raise awareness against social issues like child marriage and addiction.',
      hi: 'बाल विवाह और नशे जैसी सामाजिक समस्याओं के खिलाफ जागरूकता बढ़ाना।',
    },
    icon: AlertCircle,
  },
  {
    objective: {
      en: 'Foster patriotism and cooperation among students.',
      hi: 'छात्रों में देशभक्ति और सहयोग को प्रोत्साहित करना।',
    },
    icon: Flag,
  },
]

const MissionSection = () => {
  const { language } = useContext(LanguageContext)

  return (
    <div className="bg-primary-dark/5 py-12 bg-[url('https://www.transparenttextures.com/patterns/climpek.png')] shadow-lg">
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-secondary-dark">
            {language === 'hi'
              ? 'हमारा मिशन और उद्देश्य'
              : 'Our Mission & Objectives'}
          </h2>
          <p className="mt-4 text-lg text-secondary-dark">
            {missionStatement[language]}
          </p>
        </div>

        {/* Objectives List */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {objectives.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border border-primary-dark bg-primary-base rounded-xl shadow-sm hover:shadow-md transition"
              >
                <Icon className="w-8 h-8 text-accent-dark" />
                <p className="text-secondary-dark">
                  {item.objective[language]}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MissionSection
