'use server'

import dbConnect from '@/lib/dbConnect'
import Certificates from '@/models/Certificates'

export async function getCertificates() {
  try {
    await dbConnect()
    const certificates = await Certificates.find().sort({ createdAt: -1 })
    const certificateJSON = JSON.parse(JSON.stringify(certificates))
    return {
      status: 'success',
      data: certificateJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'An error occurred while fetching the certificates.',
    }
  }
}

export async function addCertificate(formData) {
  try {
    const name = formData.get('name')
    const issuedBy = formData.get('issuedBy')
    const image = formData.get('image')

    if (!name || !image) {
      return {
        status: 'error',
        message: 'Certificate name and image are required.',
      }
    }

    await dbConnect()

    const newCertificate = new Certificates({
      name,
      issuedBy,
      image,
    })

    await newCertificate.save()

    return {
      status: 'success',
      message: 'Certificate added successfully',
    }
  } catch (error) {
    console.error('Error adding certificate:', error)
    return {
      status: 'error',
      message: 'An error occurred while adding the certificate.',
    }
  }
}

export async function deleteCertificate(id) {
  try {
    await dbConnect()
    const result = await Certificates.findByIdAndDelete(id)
    if (!result) {
      return {
        status: 'error',
        message: 'Certificate not found.',
      }
    }
    return {
      status: 'success',
      message: 'Certificate deleted successfully.',
    }
  } catch (error) {
    console.error('Error deleting certificate:', error)
    return {
      status: 'error',
      message: 'An error occurred while deleting the certificate.',
    }
  }
}
