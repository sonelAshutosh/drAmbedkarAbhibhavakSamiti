'use client'

import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { LanguageContext } from '@/lib/languageContext'
import { getTopThreeMembers } from '@/app/admin/members/action'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton' // import skeleton

const ExecutiveCommitteeMembers = () => {
  const { language } = useContext(LanguageContext)
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true) // loading state

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const res = await getTopThreeMembers()

      if (res.status === 'success') {
        setMembers(res.data)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="bg-primary-base py-12 px-4 lg:px-20">
      <div className="mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-secondary-dark">
            {language === 'hi' ? 'कार्यकारी समिति' : 'Executive Committee'}
          </h2>
          <p className="mt-4 text-lg text-secondary-dark/80">
            {language === 'hi'
              ? 'हमारे मिशन का नेतृत्व करने वाली समर्पित टीम से मिलिए।'
              : 'Meet the dedicated team leading our mission.'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 max-w-screen-xl mx-auto">
          {loading
            ? // Show 3 skeletons while loading
              [1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex-1 min-w-[250px] max-w-sm bg-secondary-base/25 rounded-xl shadow-md p-4 flex flex-col items-center text-center"
                >
                  <Skeleton className="h-24 w-24 rounded-full mb-4" />
                  <Skeleton className="h-5 w-[150px] mb-2" />
                  <Skeleton className="h-4 w-[100px]" />
                  <div className="flex gap-3 mt-6">
                    {/* Smaller circle skeletons for social icons */}
                    {[1, 2, 3, 4].map((icon) => (
                      <Skeleton key={icon} className="h-6 w-6 rounded-full" />
                    ))}
                  </div>
                </div>
              ))
            : // Show actual members
              members.map((member, index) => (
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

                  <div className="flex gap-3 mt-6">
                    <Link
                      href={member.fbURL || 'https://www.facebook.com/'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-600 hover:scale-110 transition-all ease-in-out" />
                    </Link>
                    <Link
                      href={member.instaURL || 'https://www.instagram.com/'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-700 hover:scale-110 transition-all ease-in-out" />
                    </Link>
                    <Link
                      href={member.twitterURL || 'https://www.twitter.com/'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-6 h-6 text-sky-500 hover:text-sky-700 hover:scale-110 transition-all ease-in-out" />
                    </Link>
                    <Link
                      href={member.linkedinURL || 'https://www.linkedin.com/'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-6 h-6 text-blue-700 hover:text-blue-900 hover:scale-110 transition-all ease-in-out" />
                    </Link>
                  </div>
                </div>
              ))}
        </div>

        <div className="mt-8 justify-self-end">
          <Link
            href="/members"
            className="text-secondary-dark font-bold px-4 py-2 hover:underline transition"
          >
            {language === 'hi' ? 'सभी देखें' : 'View All'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveCommitteeMembers
