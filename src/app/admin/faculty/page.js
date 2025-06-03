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
import { Skeleton } from '@/components/ui/skeleton' // Import Skeleton component

function FacultyPage() {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    setLoading(true)
    const res = await getAllFaculty()
    if (res.status === 'success') {
      setFaculty(res.data)
    }
    setLoading(false)
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
            {loading ? (
              // Render 5 skeleton rows while loading
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
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
                    <Skeleton className="h-4 w-36" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : faculty.length > 0 ? (
              faculty.map((fac) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No faculty members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default FacultyPage
