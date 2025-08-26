'use client'

import { useContext } from 'react'
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CornerDownRight,
} from 'lucide-react'
import Link from 'next/link'
import { LanguageContext } from '@/lib/languageContext'

const Footer = () => {
  const { language } = useContext(LanguageContext)
  const currentYear = new Date().getFullYear()

  const footerContent = {
    en: {
      visitors: 'Website Visitors: 1354',
      lastUpdate: 'Last Update: 10 Jan 2025, 12:18 PM',
      feedback: '📝 Feedback',
      quickLinks: 'Quick Links',
      contactEmail: 'Contact E-mail',
      contactEmailText: 'drambedkarabhibhavaksamiti@gmail.com',
      designedBy: 'Website designed and developed by',
      footerText: '© {year} Copyright. All Rights Reserved.',
      quickLinksItems: [
        { name: 'Home', url: '/' },
        { name: 'About Us', url: 'about-us' },
        { name: 'Contact Us', url: 'contact-us' },
        { name: 'Campaigns', url: 'campaigns' },
        { name: 'Certificates', url: 'certificates' },
        { name: 'Volunteers', url: 'volunteers' },
        { name: 'Gallery', url: 'gallery' },
        { name: 'Letters', url: 'letters' },
        { name: 'Press', url: 'press' },
      ],
    },
    hi: {
      visitors: 'वेबसाइट विजिटर्स: 1354',
      lastUpdate: 'अंतिम अपडेट: 10 जनवरी 2025, 12:18 बजे',
      feedback: '📝 प्रतिक्रिया',
      quickLinks: 'त्वरित लिंक',
      contactEmail: 'संपर्क ई-मेल',
      contactEmailText: 'drambedkarabhibhavaksamiti@gmail.com',
      designedBy: 'वेबसाइट डिज़ाइन और विकसित किया गया द्वारा',
      footerText: '© {year} कॉपीराइट। सर्वाधिकार सुरक्षित।',
      quickLinksItems: [
        { name: 'होम', url: '/' },
        { name: 'हमारे बारे में', url: 'about-us' },
        { name: 'संपर्क करें', url: 'contact-us' },
        { name: 'अभियान', url: 'campaigns' },
        { name: 'प्रमाण पत्र', url: 'certificates' },
        { name: 'स्वयंसेवक', url: 'volunteers' },
        { name: 'गेलरी', url: 'gallery' },
        { name: 'पत्र', url: 'letters' },
        { name: 'प्रेस', url: 'press' },
      ],
    },
  }

  return (
    <footer className="text-primary-dark">
      <div
        className="relative flex items-center justify-between lg:h-[60vh] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/footer_bg.jpg')" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 px-4 md:px-10 lg:px-20 py-14 text-primary-base w-full">
          <div className="flex flex-col md:flex-row justify-around gap-10">
            {/* Left Column */}
            <div className="flex flex-col gap-3 w-full md:w-1/3">
              <p className="font-semibold">
                {footerContent[language].visitors}
              </p>
              <p className="text-sm">{footerContent[language].lastUpdate}</p>
              <Link href={'/client/contact-us'}>
                <button className="mt-3 w-fit px-4 py-2 border border-primary-base rounded-lg hover:bg-primary-base/20 transition">
                  {footerContent[language].feedback}
                </button>
              </Link>

              <div className="mt-5 flex gap-4">
                <Link href="/" className="hover:text-accent-base transition">
                  <Facebook className="w-8 h-8" />
                </Link>
                <Link href="/" className="hover:text-accent-base transition">
                  <Instagram className="w-8 h-8" />
                </Link>
                <Link href="/" className="hover:text-accent-base transition">
                  <Twitter className="w-8 h-8" />
                </Link>
                <Link href="/" className="hover:text-accent-base transition">
                  <Youtube className="w-8 h-8" />
                </Link>
              </div>
            </div>

            {/* Middle Column */}
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-bold mb-4 border-b border-primary-base/30 pb-1 w-fit">
                {footerContent[language].quickLinks}
              </h3>
              <ul className="space-y-3 text-sm font-semibold tracking-wider">
                {footerContent[language].quickLinksItems.map((item, key) => (
                  <li key={key}>
                    <Link href={item.url}>
                      <div className="flex items-center gap-2 hover:text-accent-base transition cursor-pointer">
                        <CornerDownRight size={16} /> {item.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/3 text-left md:text-right">
              <h3 className="text-lg font-bold mb-2">
                {footerContent[language].contactEmail}
              </h3>
              <p className="text-sm break-words">
                <Link
                  href={`mailto:${footerContent[language].contactEmailText}`}
                  className="hover:text-accent-base transition underline"
                >
                  {footerContent[language].contactEmailText}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-primary-dark/10 px-4 py-6 text-center text-sm text-gray-600">
        <p className="mb-1">
          {footerContent[language].designedBy}{' '}
          <Link
            href="https://ashutosh-portfolio-one.vercel.app/"
            className="font-semibold hover:text-accent-base transition"
          >
            @shutosh
          </Link>
        </p>
        <p>
          {footerContent[language].footerText.replace(
            '{year}',
            currentYear.toString()
          )}
        </p>
      </div>
    </footer>
  )
}

export default Footer
