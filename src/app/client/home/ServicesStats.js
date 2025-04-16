'use client'

import {
  Smartphone,
  ClipboardList,
  Network,
  Store,
  User,
  Globe2,
} from 'lucide-react'
import { useContext } from 'react'
import { LanguageContext } from '@/lib/languageContext.js'

const icons = [Store, Smartphone, User, ClipboardList, Network]
const translations = {
  en: {
    stats: [
      { label: 'Enrolled Students', count: '210' },
      { label: 'Classes Conducted', count: '480' },
      { label: 'Volunteers', count: '25' },
      { label: 'Schemes Covered', count: '8' },
      { label: 'Villages Reached', count: '12' },
    ],
    title: 'At a Glance',
    infoCards: [
      { label: 'Established Year', value: '2023' },
      { label: 'Head Office', value: 'Mandore, Jodhpur' },
      { label: 'District', value: 'Jodhpur' },
      { label: 'Education Type', value: 'Primary Education' },
      { label: 'Focus Group', value: 'Underprivileged Children' },
      {
        label: 'Recognition',
        value: 'Rajasthan Societies Registration Act, 1958',
      },
      { label: 'Contact Hours', value: '10 AM – 5 PM' },
    ],
  },
  hi: {
    stats: [
      { label: 'नामांकित छात्र', count: '210' },
      { label: 'कक्षाएँ आयोजित', count: '480' },
      { label: 'स्वयंसेवक', count: '25' },
      { label: 'योजनाएँ शामिल', count: '8' },
      { label: 'गाँवों तक पहुँचा', count: '12' },
    ],
    title: 'एक नजर में',
    infoCards: [
      { label: 'स्थापना वर्ष', value: '2023' },
      { label: 'मुख्यालय', value: 'मंडोर, जोधपुर' },
      { label: 'ज़िला', value: 'जोधपुर' },
      { label: 'शिक्षा प्रकार', value: 'प्राथमिक शिक्षा' },
      { label: 'लक्षित समूह', value: 'वंचित बच्चे' },
      { label: 'मान्यता', value: 'राजस्थान सोसाइटीज पंजीकरण अधिनियम, 1958' },
      { label: 'संपर्क समय', value: 'सुबह 10 बजे – शाम 5 बजे' },
    ],
  },
}

const ServicesStats = () => {
  const { language } = useContext(LanguageContext)
  const { stats, title, infoCards } = translations[language]

  return (
    <div className="w-full bg-primary-base">
      {/* Stats Section */}
      <div className="w-screen flex flex-wrap lg:flex-nowrap justify-center lg:justify-between bg-gradient-to-br from-secondary-dark via-accent-base to-primary-dark lg:bg-gradient-to-r lg:from-secondary-dark lg:via-accent-base lg:to-secondary-dark px-6 lg:px-20">
        {stats.map((stat, index) => {
          const Icon = icons[index]
          return (
            <div
              key={index}
              className="flex-1 min-w-[200px] flex justify-center gap-2 px-4 py-8 text-primary-base hover:bg-secondary-dark/40 cursor-pointer transition duration-300 ease-in-out"
            >
              <span className="text-xl">
                <Icon size={50} />
              </span>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{stat.count}</span>
                <span className="text-sm">{stat.label}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Title */}
      <div className="flex items-center justify-center gap-2 my-6">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      {/* Info Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4 lg:px-20">
        {infoCards.map((info, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-primary-dark/5 rounded-lg px-4 py-3 shadow-md relative"
          >
            <span
              className={
                index % 2 === 0 ? 'text-accent-base' : 'text-secondary-base'
              }
            >
              <Globe2 size={25} />
            </span>
            <span className="text-secondary-dark">
              {info.label}: <span className="font-bold">{info.value}</span>
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary-dark rounded-b-lg"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesStats
