'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPress } from '@/app/admin/press/actions'

function PressPage() {
  const [press, setPress] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPress()
      setPress(res.data)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full h-full px-4 lg:px-20 text-secondary-dark dark:text-primary-base py-10">
      {/* Heading */}
      <div className="text-6xl lg:text-7xl text-secondary-dark dark:text-secondary-base tracking-wide font-bold pb-10">
        <div className="flex flex-col lg:flex-row">
          <span>In the</span>
          <span className="mx-2 bg-gradient-to-tr from-accent-base to-primary-dark bg-clip-text text-transparent">
            Press
          </span>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pr-4 overflow-y-auto">
        {press.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-tr from-accent-base to-primary-dark p-0.5 rounded-lg"
          >
            <div className="bg-primary-base dark:bg-black rounded-lg p-1">
              <Image
                src={item.image || '/images/image-not-available.jpg'}
                alt="press"
                width={700}
                height={500}
                className="rounded-lg w-full object-contain"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.source || 'Unknown Source'}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-accent-base hover:underline"
                  >
                    Read More
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PressPage
