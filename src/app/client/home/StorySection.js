import React from 'react'
import Image from 'next/image'
import { PlayCircle } from 'lucide-react'

const StorySection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-20 py-16">
      {/* Left Side - Images */}
      <div className="relative w-full lg:w-1/2 flex justify-center ">
        {/* Background Image */}
        <div className="absolute top-1/2 left-1/2 w-full lg:w-[90%] h-52 lg:h-80 rounded-lg overflow-hidden shadow-lg transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/images/story_section_1.jpg"
            alt="classroom"
            fill
            className="object-cover"
          />
        </div>

        {/* Foreground Image */}
        <div className="relative w-64 lg:w-96 h-64 lg:h-96 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/images/story_section_2.jpg"
            alt="student"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0 lg:pl-12">
        <h2 className="text-primary-dark dark:text-accent-base text-3xl lg:text-4xl font-bold leading-tight">
          The Story Behind Our Movement
        </h2>
        <p className="text-primary-dark dark:text-primary-base mt-4 text-lg leading-relaxed text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus.
        </p>

        {/* Bullet Points */}
        <div className="grid grid-cols-2  gap-3 mt-6 text-primary-dark dark:text-accent-base text-lg font-medium">
          <p className="flex items-center">
            <span className="text-accent-base mr-2">—</span> Education
          </p>
          <p className="flex items-center">
            <span className="text-accent-base mr-2">—</span> Campaign
          </p>
          <p className="flex items-center">
            <span className="text-accent-base mr-2">—</span> Environmental
          </p>
          <p className="flex items-center">
            <span className="text-accent-base mr-2">—</span> Advocation
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex items-center space-x-6">
          <button className="bg-accent-dark text-white px-6 py-3 rounded-md text-lg font-semibold shadow-lg hover:bg-accent-base transition">
            Read More
          </button>
        </div>
      </div>
    </section>
  )
}

export default StorySection
