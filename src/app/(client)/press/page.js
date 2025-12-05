'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPress } from '@/app/admin/press/actions'
import SectionHeading from '@/components/SectionHeading'
import ImageModal from '@/components/ImageModal'

function PressPage() {
  const [press, setPress] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPress()
      setPress(res.data)
    }

    fetchData()
  }, [])

  return (
    <div className="page-padding text-secondary-dark dark:text-primary-base">
      <SectionHeading title="In the Press" />

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {press.map((item, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-tr from-accent-base to-primary-dark p-0.5 rounded-lg card-hover"
          >
            <div className="h-full bg-primary-base dark:bg-secondary-dark rounded-lg overflow-hidden flex flex-col">
              {/* Image Container with Fixed Aspect Ratio */}
              <div
                className="relative w-full aspect-[4/3] bg-secondary-base/10 cursor-pointer"
                onClick={() =>
                  setSelectedImage({ src: item.image, alt: item.title })
                }
              >
                <Image
                  src={item.image || '/images/image-not-available.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
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
              <div className="p-4 flex flex-col gap-2 flex-grow">
                <h3 className="text-lg font-semibold text-secondary-dark dark:text-primary-base line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-secondary-dark/70 dark:text-primary-base/70">
                  {item.source || 'Unknown Source'}
                </p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center text-accent-dark dark:text-accent-base hover:underline font-medium text-sm"
                  >
                    Read More →
                  </a>
                )}
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

export default PressPage
