'use server'

import dbConnect from '@/lib/dbConnect'
import PressItems from '@/models/PressItems'

// Get all press items
export async function getPress() {
  try {
    await dbConnect()
    const press = await PressItems.find().sort({ createdAt: -1 })
    const pressJSON = JSON.parse(JSON.stringify(press))
    return {
      status: 'success',
      data: pressJSON,
    }
  } catch (error) {
    console.error('Error fetching press:', error)
    return {
      status: 'error',
      message: 'An error occurred while fetching the press items.',
    }
  }
}

// Add new press item
export async function addPress(formData) {
  try {
    const title = formData.get('title')
    const source = formData.get('source')
    const link = formData.get('link')
    const image = formData.get('image')

    if (!title || !image) {
      return {
        status: 'error',
        message: 'Press title and image are required.',
      }
    }

    await dbConnect()

    const newPress = new PressItems({
      title,
      source,
      link,
      image,
    })

    await newPress.save()

    return {
      status: 'success',
      message: 'Press item added successfully',
    }
  } catch (error) {
    console.error('Error adding press:', error)
    return {
      status: 'error',
      message: 'An error occurred while adding the press item.',
    }
  }
}

// Delete press item
export async function deletePress(id) {
  try {
    await dbConnect()
    const result = await PressItems.findByIdAndDelete(id)
    if (!result) {
      return {
        status: 'error',
        message: 'Press item not found.',
      }
    }
    return {
      status: 'success',
      message: 'Press item deleted successfully.',
    }
  } catch (error) {
    console.error('Error deleting press:', error)
    return {
      status: 'error',
      message: 'An error occurred while deleting the press item.',
    }
  }
}
