'use client'

import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { getMembers } from '@/app/admin/members/action'
import { LanguageContext } from '@/lib/languageContext'
import { Skeleton } from '@/components/ui/skeleton' // import skeleton

export default function MembersPage() {
  const { language } = useContext(LanguageContext)
  const [members, setMembers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true) // loading state

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getMembers()

        if (res.status === 'success') {
          setMembers(res.data)
        } else {
          setError(res.message)
        }
      } catch (err) {
        setError('Something went wrong while fetching members.')
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  return (
    <div className="px-4 lg:px-20 py-10">
      <h1 className="text-3xl font-bold text-left mb-8 text-secondary-dark">
        {language === 'hi' ? 'हमारी टीम के सदस्य' : 'Our Team Members'}
      </h1>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 max-w-screen-xl mx-auto">
        {loading
          ? // Show 6 skeleton cards as placeholder
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex-1 min-w-[250px] max-w-sm bg-secondary-base/25 rounded-xl shadow-md p-4 flex flex-col items-center text-center"
              >
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-32" />
                <div className="flex gap-3 mt-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
              </div>
            ))
          : members.map((member, index) => (
              <div
                key={index}
                className="flex-1 min-w-[250px] max-w-sm bg-secondary-base/25 rounded-xl shadow-md p-4 flex flex-col items-center text-center"
              >
                <div className="rounded-full overflow-hidden mb-4">
                  <Image
                    src={member.image || '/images/placeholder.png'}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="object-cover aspect-square border-2 border-secondary-dark rounded-full"
                  />
                </div>
                <h3 className="font-semibold text-secondary-dark">
                  {member.name}
                </h3>
                <p className="text-primary-dark/80 text-sm mt-1">
                  {member.designation}
                </p>

                <div className="flex gap-3 mt-3">
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
            ))}
      </div>
    </div>
  )
}
