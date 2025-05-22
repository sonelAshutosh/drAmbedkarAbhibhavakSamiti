'use server'

export async function getAllStudents() {}

export async function getTopFiveStudents() {
  return {
    status: 'success',
    data: [
      {
        id: 1,
        name: 'John Doe',
        age: 20,
        grade: 'A',
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 22,
        grade: 'B',
      },
      {
        id: 3,
        name: 'Alice Johnson',
        age: 21,
        grade: 'A',
      },
      {
        id: 4,
        name: 'Bob Brown',
        age: 23,
        grade: 'C',
      },
      {
        id: 5,
        name: 'Charlie Davis',
        age: 24,
        grade: 'B',
      },
    ],
  }
}

export async function getStudentById(id) {}

export async function createNewStudent() {}
