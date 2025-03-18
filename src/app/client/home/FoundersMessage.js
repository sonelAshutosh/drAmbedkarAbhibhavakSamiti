import React from 'react'
import { Quote } from 'lucide-react'
import Image from 'next/image'

const FoundersMessage = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between bg-secondary-base dark:bg-secondary-dark px-4 lg:px-20 py-16">
      {/* Right Side - Images (On top for mobile, right for larger screens) */}
      <div className="relative w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
        {/* Background Image */}
        <div className="absolute top-1/2 left-1/2 w-full lg:w-[90%] h-52 lg:h-80 rounded-lg overflow-hidden shadow-lg transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/founder_image_bg.jpg"
            alt="founder image bg"
            fill
            className="object-cover"
          />
        </div>

        {/* Foreground Image */}
        <div className="relative w-64 lg:w-96 h-64 lg:h-96 rounded-lg overflow-hidden shadow-xl z-10">
          <Image
            src="/images/founder_image.jpg"
            alt="founder image"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Left Side - Content (Below image on mobile, left on larger screens) */}
      <div className=" text-primary-dark dark:text-primary-base flex-1 flex flex-col items-center justify-center p-12 md:p-16 text-center order-2 lg:order-1">
        <Quote className="text-accent-dark dark:text-accent-base text-4xl md:text-5xl mb-4" />
        <p className="text-lg md:text-xl font-medium max-w-lg">
          “Our journey began with a vision—to create a sustainable future for
          the next generations. Together, we can drive real change and make an
          impact.”
        </p>
        <p className="mt-4 text-sm md:text-base font-semibold">
          - John Doe, Founder
        </p>

        {/* Decorative Dots */}
        <div className="flex space-x-2 mt-6">
          <span className="w-3 h-3 bg-secondary-dark dark:bg-secondary-base rounded-full opacity-50"></span>
          <span className="w-3 h-3 bg-accent-dark dark:bg-accent-base rounded-full"></span>
          <span className="w-3 h-3 bg-secondary-dark dark:bg-secondary-base rounded-full opacity-50"></span>
        </div>
      </div>
    </section>
  )
}

export default FoundersMessage
