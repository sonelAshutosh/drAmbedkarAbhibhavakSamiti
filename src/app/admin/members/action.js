'use server'

import dbConnect from '@/lib/dbConnect'
import Members from '@/models/Members'

export async function getMembers() {
  try {
    await dbConnect()

    const members = await Members.find().lean()
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
}

export async function getTopThreeMembers() {
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
}

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

export async function updateMember() {}

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
