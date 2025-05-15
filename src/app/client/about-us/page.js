'use client'

import React from 'react'
import Image from 'next/image'

function AboutUsPage() {
  return (
    <div className="relative">
      {/* Parallax Section */}
      <div className="relative h-screen bg-fixed bg-cover bg-center bg-[url('/images/about_us.png')] flex items-center justify-center before:absolute before:inset-0 before:bg-black/50">
        <h1 className="relative z-10 text-5xl font-bold text-white drop-shadow-lg">
          About Us
        </h1>
      </div>

      {/* Content Section */}
      <div className="bg-white py-20 px-8 lg:px-32 text-center">
        <h2 className="text-4xl font-semibold mb-8">Who We Are</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          We are a team of passionate individuals dedicated to delivering the
          best solutions for our clients. Our mission is to create impactful and
          innovative digital experiences that help businesses thrive.
        </p>
      </div>

      {/* Another Parallax Section */}
      <div className="relative h-screen bg-fixed bg-cover bg-center bg-[url('/your-second-image-path.jpg')] flex items-center justify-center before:absolute before:inset-0 before:bg-black/50">
        <h2 className="relative z-10 text-4xl font-bold text-white drop-shadow-lg">
          Our Journey
        </h2>
      </div>

      {/* More Content */}
      <div className="bg-white py-20 px-8 lg:px-32 text-center">
        <h2 className="text-4xl font-semibold mb-8">Our Values</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          We believe in quality, integrity, and innovation. Our team is
          committed to delivering exceptional solutions that meet the needs of
          our clients.
        </p>
      </div>
    </div>
  )
}

export default AboutUsPage
