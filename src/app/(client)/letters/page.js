'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getLetters } from '@/app/admin/letters/actions'
import SectionHeading from '@/components/SectionHeading'
import ImageModal from '@/components/ImageModal'

function LettersPage() {
  const [letters, setLetters] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getLetters()
      setLetters(res.data)
    }

    fetchData()
  }, [])

  return (
    <div className="page-padding text-secondary-dark dark:text-primary-base">
      <SectionHeading title="Our Letters" />

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {letters.map((letter, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-tr from-accent-base to-primary-dark p-0.5 rounded-lg card-hover"
          >
            <div className="h-full bg-primary-base dark:bg-secondary-dark rounded-lg overflow-hidden flex flex-col">
              {/* Image Container with Fixed Aspect Ratio */}
              <div
                className="relative w-full aspect-[3/4] bg-secondary-base/10 cursor-pointer"
                onClick={() =>
                  setSelectedImage({ src: letter.image, alt: letter.name })
                }
              >
                <Image
                  src={letter.image || '/images/image-not-available.jpg'}
                  alt={letter.name}
                  fill
                  className="object-contain p-2 transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                    Click to view
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-secondary-dark dark:text-primary-base line-clamp-2">
                  {letter.name}
                </h3>
                <p className="text-sm text-secondary-dark/70 dark:text-primary-base/70">
                  <span className="font-medium">Sent to:</span>{' '}
                  {letter.sendTo || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}

export default LettersPage
