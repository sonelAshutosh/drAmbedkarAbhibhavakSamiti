'use client'

import React, { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { LanguageContext } from '@/lib/languageContext'
import { getAllFaculty } from '@/app/admin/faculty/action'

function FacultyPage() {
  const { language } = useContext(LanguageContext)
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const res = await getAllFaculty()

      if (res.status === 'success') {
        setFaculty(res.data)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="bg-primary-base min-h-screen py-12 px-4 lg:px-20">
      <h1 className="text-3xl font-bold text-secondary-dark mb-8 ">
        {language === 'hi' ? 'सभी संकाय सदस्य' : 'All Faculty Members'}
      </h1>

      <div className="flex flex-wrap gap-x-6 gap-y-8 max-w-screen-xl ">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex-1 min-w-[250px] max-w-sm bg-secondary-base/25 rounded-xl shadow-md p-4 flex flex-col items-center text-center"
              >
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-5 w-[150px] mb-2" />
                <Skeleton className="h-4 w-[100px]" />
                <div className="flex gap-3 mt-6">
                  {[1, 2, 3, 4].map((icon) => (
                    <Skeleton key={icon} className="h-6 w-6 rounded-full" />
                  ))}
                </div>
              </div>
            ))
          : faculty.map((member, index) => (
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

                <div className="flex gap-3 mt-4">
                  {member.fbURL && (
                    <Link href={member.fbURL} target="_blank">
                      <Facebook className="w-5 h-5 text-blue-600 hover:scale-110 transition" />
                    </Link>
                  )}
                  {member.instaURL && (
                    <Link href={member.instaURL} target="_blank">
                      <Instagram className="w-5 h-5 text-pink-500 hover:scale-110 transition" />
                    </Link>
                  )}
                  {member.twitterURL && (
                    <Link href={member.twitterURL} target="_blank">
                      <Twitter className="w-5 h-5 text-sky-500 hover:scale-110 transition" />
                    </Link>
                  )}
                  {member.linkedinURL && (
                    <Link href={member.linkedinURL} target="_blank">
                      <Linkedin className="w-5 h-5 text-blue-700 hover:scale-110 transition" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default FacultyPage
