'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation' // Import usePathname for current route detection
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

const navItems = [
  { name: 'Home', path: '/client/home' },
  { name: 'Gallery', path: '/client/gallery' },
  { name: 'Certificates', path: '/client/certificates' },
  { name: 'School', path: '/client/school' },
  { name: 'About Us', path: '/client/about-us' },
  { name: 'Contact', path: '/client/contact-us' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname() // Get current route

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 lg:px-20 bg-secondary-dark bg-opacity-30 backdrop-blur-lg">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link
          href={'/client/home'}
          className="text-xl font-bold text-primary-base"
        >
          {/* //TODO: Add a logo here */}
          Logo
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-primary-base font-semibold transition relative ${
                pathname === item.path
                  ? 'text-secondary-dark'
                  : 'hover:text-secondary-dark'
              }`}
            >
              {item.name}
              {pathname === item.path && (
                <span className="absolute left-0 bottom-[-2px] w-full h-[2px] bg-secondary-dark"></span>
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-base"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 h-screen w-screen bg-primary-base dark:bg-primary-dark transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ease-in-out duration-300 flex flex-col items-center justify-center space-y-6 md:hidden`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 p-3 rounded-md bg-accent-base dark:bg-accent-dark text-primary-base"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>

        {/* Menu Items (Mobile) */}
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`text-2xl font-semibold transition relative ${
              pathname === item.path
                ? 'text-secondary-dark dark:text-secondary-base'
                : 'text-secondary-dark dark:text-primary-base hover:text-accent-base'
            }`}
            onClick={() => setIsOpen(false)}
          >
            {item.name}
            {pathname === item.path && (
              <span className="absolute left-0 bottom-[-4px] w-full h-[3px] bg-secondary-dark dark:bg-secondary-base"></span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
