'use server'

import { cache } from 'react'
import dbConnect from '@/lib/dbConnect'
import Campaigns from '@/models/Campaigns'

export const getCampaigns = cache(async () => {
  try {
    await dbConnect()
    const campaigns = await Campaigns.find().sort({ date: -1 })
    const campaignJSON = JSON.parse(JSON.stringify(campaigns))
    return {
      status: 'success',
      data: campaignJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'An error occurred while fetching the campaigns.',
    }
  }
})

export const getLatestCampaign = cache(async () => {
  try {
    await dbConnect()

    const latestCampaign = await Campaigns.findOne().sort({ date: -1 })
    if (!latestCampaign) {
      return {
        status: 'error',
        message: 'No campaigns found.',
      }
    }
    const latestCampaignJSON = JSON.parse(JSON.stringify(latestCampaign))

    return {
      status: 'success',
      data: latestCampaignJSON,
    }
  } catch (error) {
    console.error('Error fetching latest campaign:', error)
    return {
      status: 'error',
      message: 'An error occurred while fetching the latest campaign.',
    }
  }
})

export async function addCampaign(formData) {
  try {
    const name = formData.name
    const description = formData.description
    const image = formData.image

    if (!name || !image) {
      return {
        status: 'error',
        message: 'Campaign name and image are required.',
      }
    }

    await dbConnect()

    const newCampaign = new Campaigns({
      name,
      description,
      image,
    })

    await newCampaign.save()

    return {
      status: 'success',
      message: 'Campaign added successfully',
    }
  } catch (error) {
    console.error('Error adding campaign:', error)
    return {
      status: 'error',
      message: 'An error occurred while adding the campaign.',
    }
  }
}

export async function deleteCampaign(id) {
  try {
    await dbConnect()
    const deletedCampaign = await Campaigns.findByIdAndDelete(id)

    if (!deletedCampaign) {
      return {
        status: 'error',
        message: 'Campaign not found.',
      }
    }

    return {
      status: 'success',
      message: 'Campaign deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting campaign:', error)
    return {
      status: 'error',
      message: 'An error occurred while deleting the campaign.',
    }
  }
}
