'use client'

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
import Image from 'next/image'
import { deleteVolunteer, getAllVolunteers } from './action'
import VolunteerForm from './VolunteerForm'
import { Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

function VolunteersPage() {
  const [volunteers, setVolunteers] = useState([])

  async function fetchVolunteers() {
    const res = await getAllVolunteers()
    if (res.status === 'success') {
      setVolunteers(res.data)
    }
  }

  const handleVolunteerDelete = (volunteerId) => async () => {
    const confirmed = confirm('Are you sure you want to delete this volunteer?')

    if (confirmed) {
      const response = await deleteVolunteer(volunteerId)
      if (response.status === 'success') {
        toast({
          title: 'Success',
          description: 'Volunteer deleted successfully',
        })
        fetchVolunteers()
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
    fetchVolunteers()
  }, [])

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold text-secondary-dark">
          Volunteers
        </div>
        <div>
          <VolunteerForm onVolunteerAdded={fetchVolunteers} />
        </div>
      </div>

      <Table>
        <TableCaption>Create or Modify Volunteer</TableCaption>
        <TableHeader className="border-2">
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="border-2">
          {volunteers.length > 0 ? (
            volunteers.map((volunteer) => (
              <TableRow key={volunteer._id}>
                <TableCell>
                  {volunteer.image ? (
                    <Image
                      src={volunteer.image || '/images/dummy_image.jpg'}
                      alt={volunteer.name}
                      className="w-12 h-12 rounded-full object-cover"
                      width={48}
                      height={48}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-500">
                      N/A
                    </div>
                  )}
                </TableCell>
                <TableCell>{volunteer.name}</TableCell>
                <TableCell>{volunteer.email}</TableCell>
                <TableCell>{volunteer.phone}</TableCell>
                <TableCell>{volunteer.role || '—'}</TableCell>
                <TableCell>
                  {volunteer.isActive ? 'Active' : 'Inactive'}
                </TableCell>
                <TableCell onClick={handleVolunteerDelete(volunteer._id)}>
                  <Trash2 className="text-red-500 cursor-pointer hover:text-red-700" />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                No volunteers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default VolunteersPage
