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
import { deleteContactedPerson, getContactedPerson } from './action'
import { Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

function ContactedPersonPage() {
  const [contactedPerson, setContactedPerson] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContactedPerson = async () => {
      const result = await getContactedPerson()

      if (result.status === 'success') {
        setContactedPerson(result.data)
      } else {
        console.error(result.message)
      }
      setLoading(false)
    }

    fetchContactedPerson()
  }, [])

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this person?')

    if (confirmed) {
      const response = await deleteContactedPerson(id)
      if (response.status === 'success') {
        toast({
          title: 'Success',
          description: 'Contacted person deleted successfully',
        })
        setContactedPerson((prev) => prev.filter((person) => person._id !== id))
      } else {
        console.error(response.message)
      }
    }
  }

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">
          Contacted Person
        </div>
      </div>

      <Table>
        <TableCaption>Create or Modify Contacted Persons</TableCaption>
        <TableHeader className="border-2">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-64" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-6" />
                </TableCell>
              </TableRow>
            ))
          ) : contactedPerson.length > 0 ? (
            contactedPerson.map((person) => (
              <TableRow key={person._id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{person.subject}</TableCell>
                <TableCell>{person.message}</TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(person._id)}>
                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No Contacted Person found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ContactedPersonPage
