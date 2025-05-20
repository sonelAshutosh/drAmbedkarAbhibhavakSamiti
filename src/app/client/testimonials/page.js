import React from 'react'
import { Quote } from 'lucide-react'
import Image from 'next/image'
import { getTestimonials } from '@/app/admin/testimonials/action'

export default async function TestimonialsPage() {
  const { status, testimonials } = await getTestimonials(true)

  if (status !== 'success') {
    return <div className="px-4 lg:px-20">Failed to load testimonials.</div>
  }

  return (
    <div className="px-4 lg:px-20 py-10">
      <h1 className="text-3xl font-bold text-left text-secondary-dark mb-10">
        Testimonials
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((story) => (
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
                “{story.message}”
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
