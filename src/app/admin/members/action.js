'use server'

import { cache } from 'react'
import dbConnect from '@/lib/dbConnect'
import Members from '@/models/Members'

export const getMembers = cache(async (priority = false) => {
  try {
    await dbConnect()

    const query = Members.find()
    if (priority) {
      query.sort({ priority: 1 })
    }

    const members = await query.lean()
    const membersJSON = JSON.parse(JSON.stringify(members)) // Ensure serializable objects

    return {
      status: 'success',
      data: membersJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to fetch members',
    }
  }
})

export const getTopThreeMembers = cache(async () => {
  try {
    await dbConnect()

    const members = await Members.find().sort({ priority: 1 }).limit(3).lean()
    const membersJSON = JSON.parse(JSON.stringify(members))

    return {
      status: 'success',
      data: membersJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to fetch members',
    }
  }
})

export async function getThreeMembersByPriority() {
  try {
    await dbConnect()

    const members = await Members.find().sort({ priority: 1 }).lean()
    const topMembers = members.slice(0, 3)
    const membersJSON = JSON.parse(JSON.stringify(topMembers))

    return {
      status: 'success',
      data: membersJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to fetch members',
    }
  }
}

export async function addMember(formData) {
  try {
    await dbConnect()
    const newMember = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      image: formData.get('image'), // This should be a Base64 string
      designation: formData.get('designation') || '',
      fbURL: formData.get('fbURL') || '',
      instaURL: formData.get('instaURL') || '',
      twitterURL: formData.get('twitterURL') || '',
      linkedinURL: formData.get('linkedinURL') || '',
      priority: parseInt(formData.get('priority')) || 1000,
      isActive: formData.get('isActive') === 'on', // Convert checkbox to boolean
    }

    const member = await Members.create(newMember)

    return {
      status: 'success',
      message: 'Member added successfully',
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Error adding member',
    }
  }
}

export async function updateMember(data) {
  try {
    await dbConnect()

    const {
      _id,
      name,
      email,
      phone,
      image,
      designation = '',
      fbURL = '',
      instaURL = '',
      twitterURL = '',
      linkedinURL = '',
      priority = 1000,
      isActive,
    } = data

    const updatedMember = await Members.findByIdAndUpdate(
      _id,
      {
        name,
        email,
        phone,
        image,
        designation,
        fbURL,
        instaURL,
        twitterURL,
        linkedinURL,
        priority: parseInt(priority),
        isActive: !!isActive,
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!updatedMember) {
      return {
        status: 'error',
        message: 'Member not found',
      }
    }

    return {
      status: 'success',
      message: 'Member updated successfully',
    }
  } catch (error) {
    console.error('Update error:', error)
    return {
      status: 'error',
      message: 'Error updating member',
    }
  }
}

export async function deleteMember(memberId) {
  try {
    await dbConnect()

    const deletedMember = await Members.findByIdAndDelete(memberId)
    if (!deletedMember) {
      return {
        status: 'error',
        message: 'Member not found',
      }
    }

    return {
      status: 'success',
      message: 'Member deleted successfully',
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Error deleting member',
    }
  }
}
