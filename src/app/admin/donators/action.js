'use server'

import dbConnect from '@/lib/dbConnect'
import Donators from '@/models/Donators'

export async function getDonations(isVerified = false) {
  try {
    await dbConnect()
    let donations = []
    if (isVerified) {
      donations = await Donators.find({ isVerified: true }).sort({ amount: -1 })
    } else {
      donations = await Donators.find().sort({ amount: -1 })
    }
    const donationJSON = JSON.parse(JSON.stringify(donations))

    return {
      status: 'success',
      data: donationJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'An error occurred while fetching the donations.',
    }
  }
}

export async function createDonation(formData) {
  try {
    await dbConnect()
    const { name, email, phone, amount, paymentMode, transactionId } = formData
    if (!name || !email || !amount || !transactionId) {
      return {
        status: 'error',
        message: 'Name, email, amount, and transaction ID are required.',
      }
    }

    const newDonation = new Donators({
      name,
      email,
      phone,
      amount,
      paymentMode,
      transactionId,
    })

    await newDonation.save()
    return {
      status: 'success',
      message: 'Donation successfully added.',
    }
  } catch (error) {
    console.error('Error adding donation:', error)
    return {
      status: 'error',
      message: 'An error occurred while adding the donation.',
    }
  }
}

export async function updateDonator(id, isVerified) {
  try {
    await dbConnect()

    const donator = await Donators.findByIdAndUpdate(
      id,
      { isVerified },
      { new: true }
    ).lean()

    if (!donator) {
      return {
        status: 'error',
        message: 'Donator not found',
      }
    }
    return {
      status: 'success',
      message: 'Donator verification status updated successfully',
    }
  } catch (error) {
    console.error('Error updating donator:', error)
    return {
      status: 'error',
      message: 'An error occurred while updating the donator status.',
    }
  }
}
