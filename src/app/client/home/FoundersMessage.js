import React from 'react'
import { Quote } from 'lucide-react'
import Image from 'next/image'

const FoundersMessage = () => {
  return (
    <section className="flex flex-col md:flex-row items-stretch min-h-[400px] md:min-h-[600px] lg:min-h-[700px]">
      {/* Left Side - Message Section */}
      <div className="bg-secondary-base dark:bg-secondary-dark text-primary-dark dark:text-primary-base flex-1 flex flex-col items-center justify-center p-12 md:p-16 text-center">
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

      {/* Right Side - Founder Image */}
      <div className="flex-1 min-h-[300px] md:h-auto relative">
        <Image
          src="/images/founder_image.jpg" // Replace with actual founder image path
          alt="Founder"
          className="object-cover"
          layout="fill"
        />
      </div>
    </section>
  )
}

export default FoundersMessage
