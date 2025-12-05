import { Suspense } from 'react'
import Image from 'next/image'
import { getCampaigns } from '@/app/admin/campaigns/action'
import SectionHeading from '@/components/SectionHeading'
import { Skeleton } from '@/components/ui/skeleton'

// Featured Campaign Component
function FeaturedCampaign({ campaign }) {
  return (
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
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            {campaign.name}
          </h1>
          <p className="text-lg">
            {campaign.description || 'No description available.'}
          </p>
        </div>
      </div>
    </div>
  )
}

// Campaign Item Component
function CampaignItem({ campaign }) {
  return (
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
}

// Server component for campaigns list
async function CampaignsList() {
  const res = await getCampaigns()
  const campaigns = res.data || []

  if (campaigns.length === 0) {
    return (
      <p className="text-center text-secondary-dark">No campaigns available.</p>
    )
  }

  const featuredCampaign = campaigns[0]
  const otherCampaigns = campaigns.slice(1)

  return (
    <>
      <SectionHeading title="Latest Campaign" />
      <FeaturedCampaign campaign={featuredCampaign} />

      <SectionHeading title="Other Campaigns" />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-4 lg:grid-cols-5">
        {otherCampaigns.map((campaign) => (
          <CampaignItem key={campaign._id} campaign={campaign} />
        ))}
      </div>
    </>
  )
}

// Loading component
function CampaignsLoading() {
  return (
    <>
      <SectionHeading title="Latest Campaign" />
      <div className="mb-8">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
      <SectionHeading title="Other Campaigns" />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    </>
  )
}

// Main page component (Server Component)
export default async function CampaignsPage() {
  return (
    <div className="text-secondary-dark px-6 lg:px-20 py-10">
      <Suspense fallback={<CampaignsLoading />}>
        <CampaignsList />
      </Suspense>
    </div>
  )
}
