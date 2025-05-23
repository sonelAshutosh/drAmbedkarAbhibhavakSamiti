'use client'

import React, { useEffect, useState } from 'react'
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
import { PlusCircle, Trash2 } from 'lucide-react'
import FacultyForm from './FacultyForm'
import { deleteFaculty, getAllFaculty } from './action'
import { toast } from '@/hooks/use-toast'

function FacultyPage() {
  const [faculty, setFaculty] = useState([])

  async function fetchData() {
    const res = await getAllFaculty()
    if (res.status === 'success') {
      setFaculty(res.data)
    }
  }

  const handleDelete = (id) => async () => {
    const confirmation = confirm(
      'Are you sure you want to delete this faculty?'
    )

    if (confirmation) {
      const res = await deleteFaculty(id)
      if (res.status === 'success') {
        toast({
          title: 'Success',
          description: res.message,
          variant: 'default',
        })
        fetchData()
      } else {
        toast({
          title: 'Error',
          description: res.message,
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
        <div className="text-lg tracking-wider font-semibold">
          Faculty / Teachers
        </div>
        <div>
          <Sheet>
            <SheetTrigger>
              <PlusCircle />
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                <SheetTitle>Create new Faculty</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto pt-4 pr-2">
                <FacultyForm onFacultyAdded={fetchData} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div>
        <Table>
          <TableCaption>A list of all faculty members.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faculty.map((fac) => (
              <TableRow key={fac._id}>
                <TableCell className="font-medium">{fac.name}</TableCell>
                <TableCell>{fac.email}</TableCell>
                <TableCell>{fac.phone}</TableCell>
                <TableCell>{fac.designation}</TableCell>
                <TableCell>
                  {fac.isActive ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </TableCell>
                <TableCell>{fac.priority}</TableCell>
                <TableCell
                  className="text-red-500 hover:text-red-800 cursor-pointer"
                  onClick={handleDelete(fac._id)}
                >
                  <Trash2 />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default FacultyPage
