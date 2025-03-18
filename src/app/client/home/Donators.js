import React from 'react'
import Image from 'next/image'

const donors = [
  {
    name: 'Mia Jameson',
    cause: 'Desperate for Shelter and Clean Water',
    amount: '$8620',
  },
  {
    name: 'John Becker',
    cause: 'Syrian Refugee Crisis',
    amount: '$7230',
  },
  {
    name: 'Mike Carter',
    cause: 'Education to Every Child',
    amount: '$7000',
  },
  {
    name: 'Kira Simon',
    cause: 'Donate to our Good Causes',
    amount: '$1200',
  },
]

const Donators = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-primary-dark text-center">
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-4">
          TOP DONORS
        </h2>
      </div>

      {/* Donor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {donors.map((donor, index) => (
          <div key={index} className="text-center">
            <Image
              src={donor.image || '/images/donator_dummy.jpg'}
              alt={donor.name}
              width={200}
              height={200}
              className="w-full h-64 object-cover rounded-md shadow-lg"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {donor.cause}
            </p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              {donor.name}
            </h3>
            <p className="text-lg font-semibold text-accent-base mt-2">
              {donor.amount}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Donated</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Donators
