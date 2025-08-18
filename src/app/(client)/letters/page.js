'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getLetters } from '@/app/admin/letters/actions'

function LettersPage() {
  const [letters, setLetters] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getLetters()
      setLetters(res.data)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full h-full px-4 lg:px-20 text-secondary-dark dark:text-primary-base py-10">
      {/* Heading */}
      <div className="text-6xl lg:text-7xl text-secondary-dark dark:text-secondary-base tracking-wide font-bold pb-10">
        <div className="flex flex-col lg:flex-row">
          <span>Our</span>
          <span className="mx-2 bg-gradient-to-tr from-accent-base to-primary-dark bg-clip-text text-transparent">
            Letters
          </span>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className=" overflow-y-auto space-y-10 pr-4">
        {letters.map((letter, index) => (
          <div
            key={index}
            className="bg-gradient-to-tr from-accent-base to-primary-dark p-0.5 rounded-lg"
          >
            <div className="bg-primary-base dark:bg-black rounded-lg p-1">
              <Image
                src={letter.image || '/images/image-not-available.jpg'}
                alt="letter"
                width={700}
                height={500}
                className="rounded-lg w-full object-contain"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{letter.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sent to: {letter.sendTo || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LettersPage
