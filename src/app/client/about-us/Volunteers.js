'use client'

import { getTopThreeVolunteers } from '@/app/admin/volunteers/action'
import { LanguageContext } from '@/lib/languageContext'
import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

function VolunteerCard({ volunteer }) {
  return (
    <div className="aspect-[1/1] w-full p-0.5 bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg group hover:scale-105 transition-all ease-in-out">
      <div className="h-full w-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg flex flex-col relative transition-all ease-in-out p-1">
        <div className="h-full w-full relative rounded-lg overflow-hidden">
          <Image
            src={volunteer.image || '/images/dummy_image.jpg'}
            width={500}
            height={500}
            alt={volunteer.name || 'Volunteer'}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="absolute bottom-0 left-0 h-12 w-full flex flex-col justify-center bg-gradient-to-br from-primary-base/[0.54] to-accent-base/[0.54] backdrop-blur-lg rounded-bl-lg rounded-br-lg group-hover:h-32 transition-all ease-in-out p-4">
          <h1 className="text-xl font-semibold tracking-wide">
            {volunteer.name}
          </h1>

          <div className="hidden group-hover:block transition-all ease-in-out">
            <div className="flex gap-2 pt-2">
              {/* Phone */}
              {volunteer.phone && (
                <a
                  href={`tel:${volunteer.phone}`}
                  className="border-2 border-primary-base rounded-lg p-2 hover:scale-105 hover:text-secondary-base hover:border-secondary-base hover:bg-secondary-dark transition-all ease-in-out"
                >
                  <Phone />
                </a>
              )}
              {/* Mail */}
              {volunteer.email && (
                <a
                  href={`mailto:${volunteer.email}`}
                  className="border-2 border-primary-base rounded-lg p-2 hover:scale-105 hover:text-secondary-base hover:border-secondary-base hover:bg-secondary-dark transition-all ease-in-out"
                >
                  <Mail />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Volunteers() {
  const { language } = useContext(LanguageContext)
  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await getTopThreeVolunteers()

      if (res.status === 'success') {
        setVolunteers(res.data)
      }
    }

    fetchData()
  }, [])

  console.log(volunteers)

  return (
    <div className="bg-secondary-dark text-primary-base px-4 lg:px-20 pt-12 lg:pt-6">
      <div className="py-20">
        <h1 className="text-2xl lg:text-6xl flex justify-center text-primary-base tracking-wide font-bold">
          {language === 'hi' ? '... हमारे' : '... Meet Our'}
          <span className="text-accent-base pl-2 lg:pl-4">
            {language === 'hi' ? 'स्वयंसेवक मिलिए ...' : 'Volunteers ...'}
          </span>
        </h1>

        <div className="pt-16 pb-8 flex flex-col lg:flex-row items-center gap-8">
          {volunteers.length > 0 ? (
            volunteers.map((volunteer) => (
              <VolunteerCard key={volunteer._id} volunteer={volunteer} />
            ))
          ) : (
            <p className="text-center text-primary-base/50 col-span-3">
              {language === 'hi'
                ? 'कोई स्वयंसेवक नहीं मिला'
                : 'No volunteers found'}
            </p>
          )}
        </div>

        <div className="flex justify-end text-primary-base hover:text-accent-base font-semibold tracking-wide">
          <Link
            href={'/client/volunteers'}
            className="text-primary-base font-bold px-4 py-2 hover:underline transition"
          >
            {language === 'hi' ? 'सभी देखें' : 'View All'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Volunteers
