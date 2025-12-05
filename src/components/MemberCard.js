'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

/**
 * Shared MemberCard component for consistent member display
 * Used across Members page, About page, and Home page
 */
export default function MemberCard({ member }) {
  return (
    <div className="flex-1 min-w-[250px] max-w-sm bg-secondary-base/25 rounded-xl shadow-md p-4 flex flex-col items-center text-center transition-transform hover:scale-105">
      <div className="rounded-full overflow-hidden mb-4">
        <Image
          src={member.image || '/images/placeholder.png'}
          alt={member.name}
          width={96}
          height={96}
          className="object-cover aspect-square border-2 border-secondary-dark rounded-full"
        />
      </div>
      <h3 className="font-semibold text-secondary-dark">{member.name}</h3>
      <p className="text-primary-dark/80 text-sm mt-1">{member.designation}</p>

      <div className="flex gap-3 mt-4">
        <Link
          href={member.fbURL || 'https://www.facebook.com/'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className="w-6 h-6 text-blue-600 hover:scale-110 transition-all ease-in-out" />
        </Link>
        <Link
          href={member.instaURL || 'https://www.instagram.com/'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="w-6 h-6 text-pink-500 hover:scale-110 transition-all ease-in-out" />
        </Link>
        <Link
          href={member.twitterURL || 'https://www.twitter.com/'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="w-6 h-6 text-sky-500 hover:scale-110 transition-all ease-in-out" />
        </Link>
        <Link
          href={member.linkedinURL || 'https://www.linkedin.com/'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="w-6 h-6 text-blue-700 hover:scale-110 transition-all ease-in-out" />
        </Link>
      </div>
    </div>
  )
}
