'use client'

import { Search, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useContext } from 'react'
import { LanguageContext } from '@/lib/languageContext.js'
import { usePathname } from 'next/navigation'

const navItems = {
  en: [
    { name: 'Home', link: '/' },
    { name: 'Campaigns', link: '/campaigns' },
    { name: 'Gallery', link: '/gallery' },
    { name: 'Certificates', link: '/certificates' },
    { name: 'School', link: '/school' },
    { name: 'Letters', link: '/letters' },
    { name: 'About Us', link: '/about-us' },
    { name: 'Contact Us', link: '/contact-us' },
  ],
  hi: [
    { name: 'मुखपृष्ठ', link: '/' },
    { name: 'अभियान', link: '/campaigns' },
    { name: 'गैलरी', link: '/gallery' },
    { name: 'प्रमाण पत्र', link: '/certificates' },
    { name: 'विद्यालय', link: '/school' },
    { name: 'पत्र', link: '/letters' },
    { name: 'हमारे बारे में', link: '/about' },
    { name: 'संपर्क करें', link: '/contact-us' },
  ],
}

const fontSizeOptions = {
  en: { increase: 'A+', decrease: 'A-', reset: 'A' },
  hi: { increase: 'ब+', decrease: 'ब-', reset: 'ब' },
}

const Navbar = () => {
  const { language, changeLanguage } = useContext(LanguageContext)
  const pathname = usePathname()

  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav>
      {/* Top Navbar */}
      <div className="flex justify-end items-center space-x-4 p-1 text-sm text-primary-base bg-gradient-to-r from-secondary-dark via-accent-base to-secondary-dark px-4 lg:px-20">
        <div
          className={`cursor-pointer ${
            language === 'en'
              ? 'bg-primary-dark/50 px-1 rounded-sm'
              : 'hover:bg-primary-dark/50 px-1 rounded-sm'
          }`}
          onClick={() => changeLanguage('en')}
        >
          English
        </div>
        <div
          className={`cursor-pointer ${
            language === 'hi'
              ? 'bg-primary-dark/50 px-1 rounded-sm'
              : 'hover:bg-primary-dark/50 px-1 rounded-sm'
          }`}
          onClick={() => changeLanguage('hi')}
        >
          हिन्दी
        </div>
        <div className="hover:bg-primary-dark/50 px-1 rounded-sm cursor-pointer">
          {fontSizeOptions[language].increase}
        </div>
        <div className="hover:bg-primary-dark/50 px-1 rounded-sm cursor-pointer">
          {fontSizeOptions[language].reset}
        </div>
        <div className="hover:bg-primary-dark/50 px-1 rounded-sm cursor-pointer">
          {fontSizeOptions[language].decrease}
        </div>

        <div className="relative hidden lg:block">
          <input
            type="search"
            className="pl-10 pr-2 bg-primary-base/20 rounded-md outline-none focus:bg-primary-base/30"
            placeholder="Search..."
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-primary-base w-4 h-4" />
        </div>
      </div>

      {/* Lower Navbar */}
      <div className="bg-primary-base bg-[url('https://www.transparenttextures.com/patterns/climpek.png')] bg-repeat bg-center text-primary-dark py-2 flex items-center justify-between shadow-md px-4 lg:px-20">
        {/* Logo */}
        <div className="h-16 w-16 rounded-full">
          <Link href={'/'}>
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={200}
              height={200}
              objectFit="cover"
              className="rounded-full border border-secondary-dark hover:scale-110 transition-transform"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6">
          {navItems[language].map((item, index) => (
            <li
              key={index}
              className={`font-semibold cursor-pointer ${
                pathname === item.link ||
                (item.link === '/' && pathname === '/client/home')
                  ? 'underline decoration-2 text-secondary-dark'
                  : 'hover:underline'
              }`}
            >
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
          <Menu className="w-8 h-8 text-primary-dark" />
        </button>
      </div>

      {/* Mobile Sidebar with Background Texture */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-r from-accent-dark to-secondary-dark bg-repeat bg-center shadow-lg transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4"
          onClick={() => setMenuOpen(false)}
        >
          <X className="w-8 h-8 text-primary-base" />
        </button>

        {/* Mobile Menu */}
        <ul className="mt-16 space-y-6 px-6 text-primary-base">
          {navItems[language].map((item, index) => (
            <li
              key={index}
              className="hover:underline cursor-pointer"
              onClick={() => setMenuOpen(false)}
            >
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay (closes menu on click) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  )
}

export default Navbar
