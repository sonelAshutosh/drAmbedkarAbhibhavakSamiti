'use server'

import dbConnect from '@/lib/dbConnect'
import Testimonials from '@/models/Testimonials'

export async function getTestimonials(getVerified = false) {
  let testimonials = []

  try {
    await dbConnect()
    if (getVerified) {
      testimonials = await Testimonials.find({ isApproved: getVerified }).lean()
    } else {
      testimonials = await Testimonials.find().lean()
    }

    const testimonialsJSON = JSON.parse(JSON.stringify(testimonials))

    return {
      status: 'success',
      testimonials: testimonialsJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to fetch testimonials. Please try again.',
    }
  }
}

export async function addTestimonial(formData) {
  const name = formData.get('name')
  const message = formData.get('message')
  const image = formData.get('image')
  const rating = formData.get('rating')

  try {
    await dbConnect()
    const newTestimonial = new Testimonials({
      name,
      message,
      profileImage: image,
      rating,
    })
    await newTestimonial.save()

    return {
      status: 'success',
      message: 'Testimonial added successfully',
    }
  } catch (error) {
    console.error('Error adding testimonial:', error)
    return {
      status: 'error',
      message: 'Failed to add testimonial. Please try again.',
    }
  }
}

export async function updateStatus(id) {
  try {
    await dbConnect()
    const testimonial = await Testimonials.findById(id)

    if (!testimonial) {
      return {
        status: 'error',
        message: 'Testimonial not found',
      }
    }

    testimonial.isApproved = !testimonial.isApproved
    await testimonial.save()

    return {
      status: 'success',
      message: 'Testimonial status updated successfully',
    }
  } catch (error) {
    console.error('Error updating testimonial status:', error)
    return {
      status: 'error',
      message: 'Failed to update testimonial status. Please try again.',
    }
  }
}

export async function deleteTestimonial(id) {
  try {
    await dbConnect()
    const deletedTestimonial = await Testimonials.findByIdAndDelete(id)

    if (!deletedTestimonial) {
      return {
        status: 'error',
        message: 'Testimonial not found',
      }
    }

    return {
      status: 'success',
      message: 'Testimonial deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return {
      status: 'error',
      message: 'Failed to delete testimonial. Please try again.',
    }
  }
}
