'use client'

import React, { useState } from 'react'
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

  return (
    <nav className="bg-primary-base dark:bg-secondary-dark text-secondary-dark dark:text-secondary-base sticky px-4 lg:px-20 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href={'/client/home'} className="text-xl font-bold">
          {/* //TODO: ADD a logo here */}
          Logo
        </Link>

        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="hover:text-accent-base transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-base"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-primary-base dark:bg-primary-dark transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ease-in-out duration-300 flex flex-col items-center justify-center space-y-6 md:hidden`}
      >
        <button
          className="absolute top-4 right-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-base"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="text-2xl hover:text-accent-base transition"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
