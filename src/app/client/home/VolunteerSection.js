import React from 'react'

const VolunteerSection = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center text-center">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/images/volunteer_section_bg.jpg')" }}
      >
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-primary-base max-w-2xl px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-accent-base">
          Become Our Volunteer
        </h2>
        <p className="mt-4 text-lg md:text-xl font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          commodo ligula eget dolor.
        </p>
        <button className="mt-6 bg-accent-dark dark:bg-accent-base text-white py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition">
          JOIN VOLUNTEER
        </button>
      </div>
    </section>
  )
}

export default VolunteerSection
