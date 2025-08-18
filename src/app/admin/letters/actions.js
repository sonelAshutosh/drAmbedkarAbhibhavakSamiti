'use server'

import dbConnect from '@/lib/dbConnect'
import Letters from '@/models/Letters'

export async function getLetters() {
  try {
    await dbConnect()
    const letters = await Letters.find().sort({ createdAt: -1 })
    const letterJSON = JSON.parse(JSON.stringify(letters))
    return {
      status: 'success',
      data: letterJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'An error occurred while fetching the letters.',
    }
  }
}

export async function addLetter(formData) {
  try {
    const name = formData.get('name')
    const sendTo = formData.get('sendTo')
    const image = formData.get('image')

    if (!name || !image) {
      return {
        status: 'error',
        message: 'Certificate name and image are required.',
      }
    }

    await dbConnect()

    const newLetter = new Letters({
      name,
      sendTo,
      image,
    })

    await newLetter.save()

    return {
      status: 'success',
      message: 'Letter added successfully',
    }
  } catch (error) {
    console.error('Error adding letter:', error)
    return {
      status: 'error',
      message: 'An error occurred while adding the letter.',
    }
  }
}

export async function deleteLetter(id) {
  try {
    await dbConnect()
    const result = await Letters.findByIdAndDelete(id)
    if (!result) {
      return {
        status: 'error',
        message: 'Letter not found.',
      }
    }
    return {
      status: 'success',
      message: 'Letter deleted successfully.',
    }
  } catch (error) {
    console.error('Error deleting letter:', error)
    return {
      status: 'error',
      message: 'An error occurred while deleting the letter.',
    }
  }
}
