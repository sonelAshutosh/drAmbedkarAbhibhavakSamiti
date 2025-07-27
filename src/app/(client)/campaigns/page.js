'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getCampaigns } from '@/app/admin/campaigns/action'

const FeaturedCampaign = ({ campaign }) => (
  <div className="relative w-full p-0.5 bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg mb-8">
    <div className="pulsing-shadow absolute inset-0 bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg filter blur-lg"></div>
    <div className="relative h-full w-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg p-8 flex flex-col lg:flex-row gap-4">
      <Image
        src={campaign.image || '/images/image-not-available.jpg'}
        height={200}
        width={350}
        alt={campaign.name}
        className="rounded-lg shadow-md w-full lg:w-1/3 object-cover"
      />
      <div className="flex flex-col text-left py-4 lg:px-6">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">{campaign.name}</h1>
        <p className="text-lg">
          {campaign.description || 'No description available.'}
        </p>
      </div>
    </div>
  </div>
)

const CampaignItem = ({ campaign }) => (
  <div className="relative w-full p-1 bg-gradient-to-bl from-primary-dark to-accent-base rounded-lg">
    <div className="h-full w-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg p-1 flex flex-col items-center justify-center gap-2">
      <Image
        src={campaign.image || '/images/dummy_image.jpg'}
        alt={campaign.name}
        width={200}
        height={200}
        className="rounded-md object-cover w-full shadow-md mb-2"
      />
      <div className="text-xl font-semibold">{campaign.name}</div>
    </div>
  </div>
)

function CampaignsPage() {
  const [campaignData, setCampaignData] = useState([])
  const [featuredCampaign, setFeaturedCampaign] = useState(null)

  useEffect(() => {
    async function fetchCampaigns() {
      const res = await getCampaigns()
      const campaigns = res.data

      if (campaigns.length > 0) {
        setFeaturedCampaign(campaigns[0])
        setCampaignData(campaigns.slice(1))
      }
    }

    fetchCampaigns()
  }, [])

  return (
    <div className="text-secondary-dark px-6 lg:px-20 py-10">
      <h1 className="text-5xl lg:text-6xl font-bold pb-6">Latest Campaign</h1>
      {featuredCampaign && <FeaturedCampaign campaign={featuredCampaign} />}

      <h2 className="text-3xl lg:text-4xl font-bold pt-10 pb-4">
        Other Campaigns
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-4 lg:grid-cols-5">
        {campaignData.map((campaign) => (
          <CampaignItem key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </div>
  )
}

export default CampaignsPage
