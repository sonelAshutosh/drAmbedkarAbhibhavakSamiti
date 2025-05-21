'use client'

import { useEffect, useState, useContext } from 'react'
import { getAllVolunteers } from '@/app/admin/volunteers/action'
import { LanguageContext } from '@/lib/languageContext'
import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'

function VolunteerCard({ volunteer }) {
  return (
    <div className="aspect-[4/5] w-full md:max-w-64 p-0.5 bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg group hover:scale-105 transition-all ease-in-out">
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
              {volunteer.phone && (
                <a
                  href={`tel:${volunteer.phone}`}
                  className="border-2 border-primary-base rounded-lg p-2 hover:scale-105 hover:text-secondary-base hover:border-secondary-base hover:bg-secondary-dark transition-all ease-in-out"
                >
                  <Phone />
                </a>
              )}
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

function VolunteersPage() {
  const { language } = useContext(LanguageContext)
  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    async function fetchVolunteers() {
      const res = await getAllVolunteers()
      if (res.status === 'success') {
        setVolunteers(res.data)
      }
    }

    fetchVolunteers()
  }, [])

  return (
    <div className="bg-secondary-dark text-primary-base px-4 lg:px-20 pt-12 pb-20">
      <div className="py-12">
        <h1 className="text-2xl lg:text-6xl flex justify-center text-primary-base tracking-wide font-bold">
          {language === 'hi' ? '... हमारे' : '... Meet Our'}
          <span className="text-accent-base pl-2 lg:pl-4">
            {language === 'hi' ? 'स्वयंसेवक मिलिए ...' : 'Volunteers ...'}
          </span>
        </h1>
      </div>

      <div className="flex flex-wrap gap-4">
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
    </div>
  )
}

export default VolunteersPage
