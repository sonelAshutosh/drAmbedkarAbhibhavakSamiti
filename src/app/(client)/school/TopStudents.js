'use client'

import { getTopThreeStudents } from '@/app/admin/students/action'
import { LanguageContext } from '@/lib/languageContext'
import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

function StudentCard({ student }) {
  return (
    <div className="aspect-[1/1] w-full p-0.5 bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg group hover:scale-105 transition-all ease-in-out">
      <div className="h-full w-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg flex flex-col relative transition-all ease-in-out p-1">
        <div className="h-full w-full relative rounded-lg overflow-hidden">
          <Image
            src={student.image || '/images/dummy_image.jpg'}
            width={500}
            height={500}
            alt={student.name || 'Student'}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full flex flex-col justify-end bg-gradient-to-br from-primary-base/60 to-accent-base/60 backdrop-blur-lg rounded-b-lg transition-all ease-in-out overflow-hidden group-hover:h-40 min-h-16 h-16 p-4">
          <h1 className="text-xl font-semibold tracking-wide truncate group-hover:whitespace-normal group-hover:overflow-visible">
            {student.name}
          </h1>

          <div className="hidden group-hover:flex flex-col gap-1 pt-2 text-sm">
            {student.stream && (
              <p>
                <span className="font-semibold">Stream -</span> {student.stream}
              </p>
            )}
            <p>
              <span className="font-semibold">Percentage -</span>{' '}
              {student.percentage ?? 'N/A'}%
            </p>

            {/* Contact icons */}
            <div className="flex gap-2 pt-2">
              {student.phone && (
                <a
                  href={`tel:${student.phone}`}
                  className="border-2 border-secondary-dark rounded-lg p-2 hover:scale-105 hover:text-secondary-base hover:border-secondary-base hover:bg-secondary-dark transition-all ease-in-out"
                >
                  <Phone size={18} />
                </a>
              )}
              {student.email && (
                <a
                  href={`mailto:${student.email}`}
                  className="border-2 border-secondary-dark rounded-lg p-2 hover:scale-105 hover:text-secondary-base hover:border-secondary-base hover:bg-secondary-dark transition-all ease-in-out"
                >
                  <Mail size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TopStudents() {
  const { language } = useContext(LanguageContext)
  const [students, setStudents] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await getTopThreeStudents()

      if (res.status === 'success') {
        setStudents(res.data)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="bg-secondary-dark text-primary-base px-4 lg:px-20 pt-12 lg:pt-6">
      <div className="py-20">
        <h1 className="text-2xl lg:text-6xl flex justify-center text-primary-base tracking-wide font-bold">
          {language === 'hi' ? '... हमारे' : '... Meet Our'}
          <span className="text-accent-base pl-2 lg:pl-4">
            {language === 'hi' ? 'छात्र मिलिए ...' : 'Top Students ...'}
          </span>
        </h1>

        <div className="pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {students.length > 0 ? (
            students.map((student) => (
              <StudentCard key={student._id} student={student} />
            ))
          ) : (
            <p className="text-center text-primary-base/50 col-span-3">
              {language === 'hi' ? 'कोई छात्र नहीं मिला' : 'No students found'}
            </p>
          )}
        </div>

        <div className="flex justify-end text-primary-base hover:text-accent-base font-semibold tracking-wide">
          <Link
            href="/client/school/students"
            className="text-primary-base font-bold px-4 py-2 hover:underline transition"
          >
            {language === 'hi' ? 'सभी देखें' : 'View All'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopStudents
