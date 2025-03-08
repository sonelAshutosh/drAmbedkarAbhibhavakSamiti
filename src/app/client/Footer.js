import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Footer = () => {
  // Footer Links Data
  const quickLinks = [
    { name: 'Home', href: '/client/home' },
    { name: 'Services', href: '/client/services' },
    { name: 'Blog', href: '/client/blog' },
    { name: 'Contact', href: '/client/contact' },
  ]

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'Facebook', href: 'https://facebook.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
  ]

  return (
    <footer className="bg-secondary-base dark:bg-secondary-dark text-primary-dark dark:text-primary-base py-6 px-4 lg:px-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-sm mt-2">
              We are committed to providing high-quality services and content.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-1">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-secondary-dark dark:hover:text-accent-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Social Links */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <ul className="mt-2 space-y-1">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    hover:text-secondary-dark dark:hover:text-accent-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm mt-2">
              Subscribe to our newsletter for updates.
            </p>
            <form className="mt-3 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none text-secondary-dark"
              />
              <button className="bg-accent-base hover:bg-accent-dark text-primary-base px-4 py-2 rounded-r-md hover:opacity-80">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-400 mt-6 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} Your Website Name. All rights
          reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
