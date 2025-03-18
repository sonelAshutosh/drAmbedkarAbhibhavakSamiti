import React from 'react'
import { Home, HandCoins, Smartphone, HeartHandshake } from 'lucide-react'

const stats = [
  { icon: <Home size={48} />, value: '10K', label: 'Kids Adopted' },
  { icon: <HandCoins size={48} />, value: '90M', label: 'Raised Funds' },
  { icon: <Smartphone size={48} />, value: '15K', label: 'Events Held' },
  { icon: <HeartHandshake size={48} />, value: '70%', label: 'Love Given' },
]

const ImpactStats = () => {
  return (
    <section className="bg-gradient-to-l from-primary-base dark:from-primary-dark to-secondary-base dark:to-secondary-dark text-primary-dark dark:text-primary-base py-16 px-4 lg:px-20">
      <h2 className="text-center text-3xl md:text-4xl font-semibold mb-10">
        Our Impact
      </h2>
      <div className="flex flex-col lg:flex-row justify-between px-0 lg:px-40">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="text-accent-base p-4">{stat.icon}</div>
            <p className="text-3xl font-bold text-primary-light">
              {stat.value}
            </p>
            <p className="text-lg text-primary-dark dark:text-primary-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ImpactStats
