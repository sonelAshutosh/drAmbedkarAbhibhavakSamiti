'use server'

import dbConnect from '@/lib/dbConnect'
import ContactUs from '@/models/ContactUs'

export async function createContactedPerson(formData) {
  try {
    await dbConnect()

    const name = formData.get('name')
    const email = formData.get('email')
    const subject = formData.get('subject')
    const message = formData.get('message')

    const newContact = new ContactUs({
      name,
      email,
      subject,
      message,
    })

    await newContact.save()

    return {
      status: 'success',
      message: 'Your message has been sent successfully!',
    }
  } catch (error) {
    console.error('Error adding contact:', error)
    return {
      status: 'error',
      message: 'Failed to send message. Please try again.',
    }
  }
}

export async function getContactedPerson() {
  try {
    await dbConnect()

    const contactedPerson = await ContactUs.find({}).sort({ createdAt: -1 })
    const contactedPersonJSON = JSON.parse(JSON.stringify(contactedPerson))

    return {
      status: 'success',
      data: contactedPersonJSON,
    }
  } catch (error) {
    console.error('Error fetching contacted person:', error)
    return {
      status: 'error',
      message: 'Failed to fetch contacted person. Please try again.',
    }
  }
}

export async function deleteContactedPerson(id) {
  try {
    await dbConnect()

    const deletedContact = await ContactUs.findByIdAndDelete(id)

    if (!deletedContact) {
      return {
        status: 'error',
        message: 'Contacted person not found.',
      }
    }

    return {
      status: 'success',
      message: 'Contacted person deleted successfully.',
    }
  } catch (error) {
    console.error('Error deleting contacted person:', error)
    return {
      status: 'error',
      message: 'Failed to delete contacted person. Please try again.',
    }
  }
}
