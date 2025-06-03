'use client'

import React, { useEffect, useState } from 'react'
import CampaignForm from './CampaignForm'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteCampaign, getCampaigns } from './action'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  async function fetchCampaigns() {
    setLoading(true)
    const res = await getCampaigns()
    if (res.status === 'success') {
      setCampaigns(res.data)
    } else {
      console.error('Error fetching campaigns:', res.message)
      toast({
        title: 'Error',
        description: res.message,
        variant: 'destructive',
      })
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    const confirmation = confirm(
      'Are you sure you want to delete this campaign?'
    )

    if (!confirmation) return

    const res = await deleteCampaign(id)
    if (res.status === 'success') {
      setCampaigns((prev) => prev.filter((campaign) => campaign._id !== id))
      toast({
        title: 'Success',
        description: 'Campaign deleted successfully.',
      })
    } else {
      toast({
        title: 'Error',
        description: res.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <h2 className="text-lg tracking-wider font-semibold">Campaigns</h2>
        <CampaignForm onCampaignAdded={fetchCampaigns} />
      </div>

      <Table>
        <TableCaption>Manage Campaigns</TableCaption>
        <TableHeader className="border-2">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-20 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                </TableRow>
              ))
            : campaigns.map((campaign) => (
                <TableRow key={campaign._id}>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>{campaign.description}</TableCell>
                  <TableCell>
                    <Image
                      src={
                        campaign.image?.trim()
                          ? campaign.image
                          : '/images/dummy_image.jpg'
                      }
                      alt={`${campaign.name} image`}
                      className="w-20 h-20 object-cover"
                      width={80}
                      height={80}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(campaign.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell>
                    <button
                      className="text-red-500 hover:text-red-800"
                      onClick={() => handleDelete(campaign._id)}
                      aria-label={`Delete campaign ${campaign.name}`}
                    >
                      <Trash2 />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CampaignsPage
