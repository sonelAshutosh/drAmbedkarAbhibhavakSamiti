'use server'

import dbConnect from '@/lib/dbConnect'
import Volunteers from '@/models/Volunteers'

export async function getAllVolunteers() {
  try {
    await dbConnect()

    const volunteers = await Volunteers.find({}).sort({ joiningDate: -1 })
    const volunteerJson = JSON.parse(JSON.stringify(volunteers))

    return {
      status: 'success',
      data: volunteerJson,
    }
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    }
  }
}

export async function getTopThreeVolunteers() {
  try {
    await dbConnect()

    const volunteers = await Volunteers.find({})
      .sort({ joiningDate: -1 })
      .limit(3)
    const volunteerJson = JSON.parse(JSON.stringify(volunteers))

    return {
      status: 'success',
      data: volunteerJson,
    }
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    }
  }
}

export async function createNewVolunteer(formData) {
  try {
    await dbConnect()

    const newVolunteer = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      image: formData.get('image') || '',
      role: formData.get('role') || '',
      dateOfBirth: formData.get('dateOfBirth')
        ? new Date(formData.get('dateOfBirth'))
        : undefined,
      fbURL: formData.get('fbURL') || '',
      instaURL: formData.get('instaURL') || '',
      twitterURL: formData.get('twitterURL') || '',
      linkedinURL: formData.get('linkedinURL') || '',
      showInList: formData.get('showInList') === 'on',
      isActive: formData.get('isActive') === 'on',
    }

    await Volunteers.create(newVolunteer)

    return {
      status: 'success',
      message: 'Volunteer added successfully',
    }
  } catch (error) {
    console.error('Error creating volunteer:', error)
    return {
      status: 'error',
      message: 'Error adding volunteer',
    }
  }
}

export async function updateVolunteer(formData) {}

export async function deleteVolunteer(id) {
  try {
    await dbConnect()

    const deletedVolunteer = await Volunteers.findByIdAndDelete(id)

    if (!deletedVolunteer) {
      return {
        status: 'error',
        message: 'Volunteer not found',
      }
    }

    return {
      status: 'success',
      message: 'Volunteer deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting volunteer:', error)
    return {
      status: 'error',
      message: 'Error deleting volunteer',
    }
  }
}
