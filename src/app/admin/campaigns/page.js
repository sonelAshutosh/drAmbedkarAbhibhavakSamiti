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

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    fetchCampaigns()
  }, [])

  async function fetchCampaigns() {
    const res = await getCampaigns()

    if (res.status === 'success') {
      setCampaigns(res.data)
    } else {
      console.error('Error fetching campaigns:', res.message)
    }
  }

  const handleDelete = async (id) => {
    const confirmation = confirm(
      'Are you sure you want to delete this campaign?'
    )

    if (confirmation) {
      const res = await deleteCampaign(id)

      if (res.status === 'success') {
        setCampaigns((prevCampaigns) =>
          prevCampaigns.filter((campaign) => campaign._id !== id)
        )
        toast({
          title: 'Success',
          description: 'Campaign deleted successfully.',
        })
      } else {
        toast({
          title: 'Error',
          description: res.message,
        })
      }
    }
  }

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Campaigns</div>
        <div>
          <CampaignForm onCampaignAdded={fetchCampaigns} />
        </div>
      </div>
      <div>
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
            {campaigns.map((campaign) => (
              <TableRow key={campaign._id}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.description}</TableCell>
                <TableCell>
                  <Image
                    src={campaign.image}
                    alt="Campaign"
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
                <TableCell
                  className="text-red-500 cursor-pointer hover:text-red-800"
                  onClick={() => handleDelete(campaign._id)}
                >
                  <Trash2 />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CampaignsPage
