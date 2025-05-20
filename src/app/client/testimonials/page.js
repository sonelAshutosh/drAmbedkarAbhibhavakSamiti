'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Quote } from 'lucide-react'
import Image from 'next/image'
import { getTestimonials } from '@/app/admin/testimonials/action'
import { LanguageContext } from '@/lib/languageContext'

function TestimonialsPage() {
  const { language } = useContext(LanguageContext)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getTestimonials(true)
        if (res.status === 'error') {
          setError('Failed to load testimonials.')
        } else {
          setTestimonials(res.data)
        }
      } catch (err) {
        setError('Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const SkeletonCard = () => (
    <div className="bg-gradient-to-br from-primary-base/10 to-accent-dark/10 p-6 rounded-2xl shadow-md border border-accent-dark flex gap-5 items-start animate-pulse">
      <div className="w-[80px] h-[80px] rounded-full bg-gray-300 border-2 border-accent-dark" />
      <div className="flex-1 space-y-3">
        <div className="w-full h-4 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-3 bg-gray-300 rounded mt-2 ml-auto"></div>
      </div>
    </div>
  )

  if (error) {
    return <div className="px-4 lg:px-20 py-10 text-red-600">{error}</div>
  }

  return (
    <div className="px-4 lg:px-20 py-10">
      <h1 className="text-3xl font-bold text-left text-secondary-dark mb-10">
        {language === 'hi' ? 'प्रशंसापत्र' : 'Testimonials'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))
          : testimonials?.map((story) => (
              <div
                key={story._id}
                className="bg-gradient-to-br from-primary-base/10 to-accent-dark/10 p-6 rounded-2xl shadow-md border border-accent-dark flex gap-5 items-start transition-transform hover:scale-[1.01]"
              >
                {story.profileImage === '' ? (
                  <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full bg-white border-2 border-accent-dark shadow-sm">
                    <Quote className="w-8 h-8 text-accent-base" />
                  </div>
                ) : (
                  <Image
                    src={story.profileImage}
                    alt={story.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover aspect-square border-2 border-accent-dark shadow-sm"
                  />
                )}

                <div className="flex-1">
                  <p className="text-secondary-dark text-[16px] leading-relaxed mb-2 italic">
                    “{story[`quote_${language}`] || story.message}”
                  </p>
                  <p className="text-sm font-semibold text-secondary-dark/70 text-right">
                    — {story.name}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default TestimonialsPage
