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
import { PlusCircle, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton' // Make sure this import is correct

function StudentsPage() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    setLoading(true)
    const response = await getAllStudents()
    if (response.status === 'success') {
      setStudents(response.data)
    }
    setLoading(false)
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
            {loading ? (
              // Render 5 skeleton rows while loading
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-12 w-12 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : students.length > 0 ? (
              students.map((student) => (
                <TableRow key={student._id}>
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
                    <button
                      className="text-red-500 hover:text-red-800 cursor-pointer"
                      onClick={handleDelete(student._id)}
                    >
                      <Trash2 />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default StudentsPage
