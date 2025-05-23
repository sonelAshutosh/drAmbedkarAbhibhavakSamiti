'use server'

import dbConnect from '@/lib/dbConnect'
import Faculty from '@/models/Faculty'

export async function getAllFaculty() {
  try {
    await dbConnect()

    const faculty = await Faculty.find().lean()
    const facultyJSON = JSON.parse(JSON.stringify(faculty))

    return {
      status: 'success',
      data: facultyJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to fetch faculty',
    }
  }
}

export async function getFacultyByPriority() {
  try {
    await dbConnect()

    const faculty = await Faculty.find().sort({ priority: 1 }).lean().limit(3)
    const facultyJSON = JSON.parse(JSON.stringify(faculty))

    return {
      status: 'success',
      data: facultyJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to fetch faculty',
    }
  }
}

export async function getFacultyById(id) {}

export async function createNewFaculty(formData) {
  const facutlyData = {}
  formData.forEach((value, key) => {
    if (facutlyData['isActive'] === 'on') {
      facutlyData['isActive'] = true
    } else {
      facutlyData['isActive'] = false
    }
    facutlyData[key] = value
  })

  try {
    await dbConnect()

    const faculty = await Faculty.create(facutlyData)

    return {
      status: 'success',
      message: 'Faculty created successfully',
    }
  } catch (error) {
    console.log('Error creating faculty:', error)
    return {
      status: 'error',
      message: 'Failed to create faculty',
    }
  }
}

export async function updateFaculty(id, formData) {}

export async function deleteFaculty(id) {
  try {
    await dbConnect()

    const faculty = await Faculty.findByIdAndDelete(id)

    return {
      status: 'success',
      message: 'Faculty deleted successfully',
    }
  } catch (error) {
    console.log('Error deleting faculty:', error)
    return {
      status: 'error',
      message: 'Failed to delete faculty',
    }
  }
}
