'use client'

import { getAllStudents } from '@/app/admin/students/action'
import { LanguageContext } from '@/lib/languageContext'
import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
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

        <div className="absolute bottom-0 left-0 h-12 w-full flex flex-col justify-center bg-gradient-to-br from-primary-base/[0.54] to-accent-base/[0.54] backdrop-blur-lg rounded-bl-lg rounded-br-lg group-hover:h-32 transition-all ease-in-out p-4">
          <h1 className="text-xl font-semibold tracking-wide">
            {student.name}
          </h1>

          <div className="hidden group-hover:block transition-all ease-in-out">
            <div className="flex gap-2 pt-2">
              {student.phone && (
                <a
                  href={`tel:${student.phone}`}
                  className="border-2 border-primary-base rounded-lg p-2 hover:scale-105 hover:text-secondary-base hover:border-secondary-base hover:bg-secondary-dark transition-all ease-in-out"
                >
                  <Phone />
                </a>
              )}
              {student.email && (
                <a
                  href={`mailto:${student.email}`}
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

function StudentPage() {
  const { language } = useContext(LanguageContext)
  const [students, setStudents] = useState([])

  useEffect(() => {
    async function fetchStudents() {
      const res = await getAllStudents()

      if (res.status === 'success') {
        setStudents(res.data)
      }
    }

    fetchStudents()
  }, [])

  return (
    <div className="px-4 lg:px-20 py-16 bg-secondary-dark/75 text-primary-base min-h-screen">
      <h1 className="text-2xl lg:text-5xl font-bold text-center">
        {language === 'hi' ? 'सभी छात्र' : 'All Students'}
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
    </div>
  )
}

export default StudentPage
