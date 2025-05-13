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
import React, { use, useEffect, useState } from 'react'
import { deleteContactedPerson, getContactedPerson } from './action'
import { Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

function ContactedPersonPage() {
  const [contactedPerson, setContactedPerson] = useState([])

  useEffect(() => {
    const fetchContactedPerson = async () => {
      const result = await getContactedPerson()

      if (result.status === 'success') {
        setContactedPerson(result.data)
      } else {
        console.error(result.message)
      }
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
        {/* <div>
            //TODO: Add excel downloading
        </div> */}
      </div>
      <div>
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
            {contactedPerson.length > 0 ? (
              contactedPerson.map((person) => (
                <TableRow key={person._id}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.subject}</TableCell>
                  <TableCell>{person.message}</TableCell>
                  <TableCell>
                    <button onClick={() => handleDelete(person._id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="7" className="text-center">
                  No Contacted Person found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ContactedPersonPage
