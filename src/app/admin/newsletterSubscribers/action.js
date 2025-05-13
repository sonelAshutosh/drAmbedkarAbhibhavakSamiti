'use server'

import dbConnect from '@/lib/dbConnect'
import NewsLetter from '@/models/NewsLetter'

export const getNewsletterSubscribers = async () => {
  try {
    await dbConnect()
    const subscribers = await NewsLetter.find().lean()

    const subscribersJSON = JSON.parse(JSON.stringify(subscribers))
    return {
      status: 'success',
      message: 'Subscribers fetched successfully',
      data: subscribersJSON,
    }
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return {
      status: 'error',
      message: 'Failed to fetch subscribers. Please try again.',
    }
  }
}

export const createNewsletterSubscriber = async (formData) => {
  try {
    await dbConnect()

    const email = formData.get('email')

    if (!email) return { status: 'error', message: 'Email is required.' }

    const existingSubscriber = await NewsLetter.findOne({ email })
    if (existingSubscriber) {
      return {
        status: 'error',
        message: 'Subscriber with this email already exists.',
      }
    }

    const newSubscriber = new NewsLetter({ email })
    await newSubscriber.save()

    return {
      status: 'success',
      message: 'Subscriber created successfully.',
    }
  } catch (error) {
    console.error('Error creating subscriber:', error)
    return {
      status: 'error',
      message: 'Failed to create subscriber. Please try again.',
    }
  }
}

export const deleteNewsletterSubscriber = async (id) => {
  try {
    await dbConnect()

    const deletedSubscriber = await NewsLetter.findByIdAndDelete(id)
    if (!deletedSubscriber) {
      return {
        status: 'error',
        message: 'Subscriber not found.',
      }
    }

    return {
      status: 'success',
      message: 'Subscriber deleted successfully.',
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to delete subscriber. Please try again.',
    }
  }
}
