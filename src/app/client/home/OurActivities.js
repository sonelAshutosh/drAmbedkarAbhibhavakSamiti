import React from 'react'
import { GraduationCap, Handshake, Landmark } from 'lucide-react'

// Define an array of card data
const cardData = [
  {
    icon: GraduationCap,
    title: 'Research and Education',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
  {
    icon: Handshake,
    title: 'Partnership and Community',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
  {
    icon: Landmark,
    title: 'Delegation and Advocation',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  },
]

const Card = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-gradient-to-r from-accent-base to-secondary-dark dark:to-secondary-base p-[1px] rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="text-primary-dark dark:text-primary-base rounded-lg shadow-lg p-0.5">
        <div className="bg-primary-base dark:bg-primary-dark p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
          <Icon className="text-primary-dark dark:text-primary-base text-3xl mb-4 transition-all duration-300 hover:text-white " />
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm mt-2">{description}</p>
          <a
            href="#"
            className="mt-4 font-semibold uppercase text-sm text-accent-dark dark:text-accent-base transition-all duration-300 hover:text-white"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}

const OurActivities = () => {
  return (
    <section className="py-16 px-4 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-dark dark:text-primary-base">
          Make A Movement <br />
          Join Us
        </h2>
        <p className="text-secondary-dark dark:text-primary-base mt-4 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
          tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </p>
      </div>

      {/* Cards Container */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </section>
  )
}

export default OurActivities
