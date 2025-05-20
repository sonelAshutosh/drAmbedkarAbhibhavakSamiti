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
import { deleteTestimonial, getTestimonials, updateStatus } from './action'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'

function TestimondialsPage() {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    async function fetchTestimonials() {
      const res = await getTestimonials()

      if (res.status === 'success') {
        setTestimonials(res.testimonials)
      } else {
        console.error(res.message)
      }
    }

    fetchTestimonials()
  }, [])

  const handleStatusUpdate = async (e) => {
    const confirm = prompt(
      'Are you sure you want to update the status? (yes/no)'
    )

    if (confirm === 'yes') {
      const res = await updateStatus(e)
      if (res.status === 'success') {
        setTestimonials((prev) =>
          prev.map((testimonial) =>
            testimonial._id === e
              ? { ...testimonial, verified: !testimonial.verified }
              : testimonial
          )
        )
        toast({
          title: 'Status Updated',
          description: 'Testimonial status updated successfully.',
          variant: 'default',
        })
      } else {
        console.error(res.message)
        toast({
          title: 'Error',
          description: res.message,
          variant: 'destructive',
        })
      }
    }
  }

  const handleTestimonialDelete = async (e) => {
    const confirm = prompt(
      'Are you sure you want to delete this testimonial? (yes/no)'
    )

    if (confirm === 'yes') {
      const res = await deleteTestimonial(e)
      if (res.status === 'success') {
        setTestimonials((prev) =>
          prev.filter((testimonial) => testimonial._id !== e)
        )
        toast({
          title: 'Deleted',
          description: 'Testimonial deleted successfully.',
          variant: 'default',
        })
      } else {
        console.error(res.message)
        toast({
          title: 'Error',
          description: res.message,
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Testimonials</div>
      </div>
      <div>
        <Table>
          <TableCaption>Create or Modify Testimonials</TableCaption>
          <TableHeader className="border-2">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial._id}>
                <TableCell className="font-medium">
                  {testimonial.name}
                </TableCell>
                <TableCell>{testimonial.message}</TableCell>
                <TableCell
                  onClick={() => handleStatusUpdate(testimonial._id)}
                  className="cursor-pointer"
                >
                  {testimonial.isApproved ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>
                  <Image
                    src={
                      testimonial.profileImage === ''
                        ? '/images/dummy_image.jpg'
                        : testimonial.profileImage
                    }
                    alt={testimonial.name}
                    className="w-16 h-16 object-cover rounded-full"
                    width={64}
                    height={64}
                  />
                </TableCell>
                <TableCell>{testimonial.rating} / 5</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleTestimonialDelete(testimonial._id)}
                    className="bg-red-500 text-primary-base px-4 py-2 rounded"
                  >
                    Delete
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

export default TestimondialsPage
