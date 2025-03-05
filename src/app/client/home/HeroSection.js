import React from 'react'
import Image from 'next/image'

function HeroSection() {
  return (
    <div className="relative w-full h-screen text-secondary-base">
      {/* Background Image */}
      <Image
        src="/images/hero_section_1.jpg"
        alt="hero-section"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark to-transparent flex flex-col justify-center px-6 md:px-12 lg:px-20">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider text-white drop-shadow-lg">
          <h1>Dr. Ambedkar</h1>
          <h1>Abhibhavak</h1>
          <h1 className="flex items-baseline">
            Samiti
            <div className="h-2 w-2 md:h-4 md:w-4 bg-accent-base rounded-full ml-2" />
          </h1>
        </div>

        {/* Button Section */}
        <div className="mt-6 w-[60%] flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Donate Now Button - Gradient Fades on Hover */}
          <button className="w-full sm:w-auto bg-gradient-to-r from-accent-base to-secondary-base text-primary-dark px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all border-2 border-accent-base duration-300 hover:from-transparent hover:to-transparent hover:text-white hover:border-accent-base hover:border-2">
            Donate Now
          </button>

          {/* Get in Touch Button - Gradient Appears on Hover */}
          <button className="w-full sm:w-auto border-2 border-accent-base text-white dark:text-primary-base px-8 py-3 rounded-lg font-semibold text-lg shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-accent-base hover:to-secondary-base hover:text-primary-dark">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
