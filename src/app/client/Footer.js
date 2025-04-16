'use client'

import { useContext } from 'react'
import {
  CornerDownRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'
import { LanguageContext } from '@/lib/languageContext.js'

const Footer = () => {
  const { language } = useContext(LanguageContext)
  const currentYear = new Date().getFullYear()

  // Translations based on language
  const footerContent = {
    en: {
      visitors: 'Website Visitors: 6,962,672',
      lastUpdate: 'Last Update: 10 Jan 2025, 12:18 PM',
      feedback: '📝 Feedback',
      quickLinks: 'Quick Links',
      contactEmail: 'Contact E-mail',
      contactEmailText: 'drambedkarabhibhavaksamiti@gmail.com',
      designedBy: 'Website designed and developed by',
      footerText: '© {year} Copyright. All Rights Reserved.',
      quickLinksItems: ['Home', 'About Us', 'Contact Us'], // Translated items for Quick Links
    },
    hi: {
      visitors: 'वेबसाइट विजिटर्स: 6,962,672',
      lastUpdate: 'अंतिम अपडेट: 10 जनवरी 2025, 12:18 बजे',
      feedback: '📝 प्रतिक्रिया',
      quickLinks: 'त्वरित लिंक',
      contactEmail: 'संपर्क ई-मेल',
      contactEmailText: 'drambedkarabhibhavaksamiti@gmail.com',
      designedBy: 'वेबसाइट डिज़ाइन और विकसित किया गया द्वारा',
      footerText: '© {year} कॉपीराइट। सर्वाधिकार सुरक्षित।',
      quickLinksItems: ['होम', 'हमारे बारे में', 'संपर्क करें'], // Translated items for Quick Links
    },
  }

  return (
    <footer className="relative text-primary-dark">
      {/* Background Image Section */}
      <div
        className="relative w-full min-h-[400px] bg-cover bg-center bg-no-repeat px-4 md:px-10 lg:px-20 flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: "url('/images/footer_bg.jpg')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content (Remains Bright) */}
        <div className="relative w-full flex flex-col md:flex-row md:justify-between items-center md:items-start gap-6 text-center md:text-left">
          {/* Left Section - Visitors & Feedback */}
          <div className="flex flex-col items-center md:items-start">
            <p className="font-semibold">{footerContent[language].visitors}</p>
            <p className="text-sm">{footerContent[language].lastUpdate}</p>
            <button className="mt-3 px-4 py-2 border border-white rounded-lg hover:bg-white/20">
              {footerContent[language].feedback}
            </button>
            {/* Social Media Icons */}
            <div className="mt-4 flex space-x-3">
              <Link href="/" className="hover:opacity-80">
                <Facebook />
              </Link>
              <Link href="/" className="hover:opacity-80">
                <Instagram />
              </Link>
              <Link href="/" className="hover:opacity-80">
                <Twitter />
              </Link>
              <Link href="/" className="hover:opacity-80">
                <Youtube />
              </Link>
            </div>
          </div>

          {/* Middle Section - Quick Links */}
          <div>
            <h3 className="font-bold text-lg">
              {footerContent[language].quickLinks}
            </h3>
            <ul className="mt-2 space-y-2 text-sm">
              {footerContent[language].quickLinksItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-center md:justify-start gap-2 font-semibold"
                >
                  <CornerDownRight />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="font-bold text-lg">
              {footerContent[language].contactEmail}
            </h3>
            <p className="text-sm">
              {footerContent[language].contactEmailText}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center text-sm px-4 py-6 bg-primary-dark/10">
        <p className="text-gray-600 py-1">
          {footerContent[language].designedBy}{' '}
          <Link
            href="https://ashutosh-portfolio-one.vercel.app/"
            className="hover:text-accent-base font-semibold"
          >
            @shutosh
          </Link>
        </p>
        <p className="py-1">
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
