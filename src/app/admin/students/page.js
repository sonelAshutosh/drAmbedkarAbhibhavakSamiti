'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import React, { useEffect, useState } from 'react'
import StudentForm from './StudentForm'
import { deleteStudent, getAllStudents } from './action'
import { PlusCircle, Trash, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'

function StudentsPage() {
  const [students, setStudents] = useState([])

  async function fetchData() {
    const response = await getAllStudents()
    if (response.status === 'success') {
      setStudents(response.data)
    }
  }

  const handleDelete = (studentId) => async () => {
    const confirmed = confirm('Are you sure you want to delete this student?')

    if (confirmed) {
      const response = await deleteStudent(studentId)
      if (response.status === 'success') {
        toast({
          title: 'Success',
          description: 'Student deleted successfully',
        })
        fetchData()
      } else {
        toast({
          title: 'Error',
          description: response.message,
          variant: 'destructive',
        })
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Student</div>
        <div>
          <Sheet>
            <SheetTrigger>
              <PlusCircle />
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                <SheetTitle>Create new Student</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto pt-4 pr-2">
                <StudentForm onStudentAdded={fetchData} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>Manage Students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Stream</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student._id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  {new Date(student.dateOfBirth).toLocaleDateString()}
                </TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.stream || '—'}</TableCell>
                <TableCell>{student.percentage}%</TableCell>
                <TableCell>
                  {student.image ? (
                    <Image
                      src={student.image}
                      alt={`${student.name}'s image`}
                      className="h-12 w-12 object-cover rounded"
                      width={48}
                      height={48}
                    />
                  ) : (
                    'No Image'
                  )}
                </TableCell>
                <TableCell className="h-full flex items-center gap-2">
                  {/* Example action buttons */}
                  {/* <button className="text-blue-600 hover:underline">
                    Edit
                  </button> */}
                  <button
                    className="text-red-500 hover:text-red-800 cursor-pointer"
                    onClick={handleDelete(student._id)}
                  >
                    <Trash2 />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default StudentsPage
