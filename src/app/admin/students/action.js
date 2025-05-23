'use server'

import dbConnect from '@/lib/dbConnect'
import Students from '@/models/Students'

export async function getAllStudents() {
  try {
    await dbConnect()

    const students = await Students.find().lean()
    const studentsJSON = JSON.parse(JSON.stringify(students))

    return {
      status: 'success',
      data: studentsJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to fetch students',
    }
  }
}

export async function getTopThreeStudents() {
  try {
    await dbConnect()

    const students = await Students.find().sort({ priority: 1 }).limit(3).lean()
    const studentsJSON = JSON.parse(JSON.stringify(students))

    return {
      status: 'success',
      data: studentsJSON,
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to fetch students',
    }
  }
}

export async function getStudentById(id) {}

export async function createNewStudent(formData) {
  const studentData = {}
  formData.forEach((value, key) => {
    studentData[key] = value
  })

  try {
    await dbConnect()

    const student = await Students.create(studentData)

    return {
      status: 'success',
      message: 'Student created successfully',
    }
  } catch (error) {
    console.error('Error creating student:', error)
    return {
      status: 'error',
      message: 'Failed to create student',
    }
  }
}

export async function updateStudent(id, formData) {}

export async function deleteStudent(id) {
  try {
    await dbConnect()

    const student = await Students.findByIdAndDelete(id)

    if (!student) {
      return {
        status: 'error',
        message: 'Student not found',
      }
    }

    return {
      status: 'success',
      message: 'Student deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting student:', error)
    return {
      status: 'error',
      message: 'Failed to delete student',
    }
  }
}
