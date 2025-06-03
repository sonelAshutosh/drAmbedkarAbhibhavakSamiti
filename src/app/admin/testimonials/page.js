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
import { Skeleton } from '@/components/ui/skeleton'

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      const res = await getTestimonials()

      if (res.status === 'success') {
        setTestimonials(res.data)
      } else {
        console.error(res.message)
      }

      setLoading(false)
    }

    fetchTestimonials()
  }, [])

  const handleStatusUpdate = async (id) => {
    const confirmed = confirm('Are you sure you want to update the status?')
    if (!confirmed) return

    const res = await updateStatus(id)
    if (res.status === 'success') {
      setTestimonials((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, isApproved: !t.isApproved } : t
        )
      )
      toast({
        title: 'Status Updated',
        description: 'Testimonial status updated successfully.',
      })
    } else {
      toast({
        title: 'Error',
        description: res.message,
        variant: 'destructive',
      })
    }
  }

  const handleTestimonialDelete = async (id) => {
    const confirmed = confirm(
      'Are you sure you want to delete this testimonial?'
    )
    if (!confirmed) return

    const res = await deleteTestimonial(id)
    if (res.status === 'success') {
      setTestimonials((prev) => prev.filter((t) => t._id !== id))
      toast({
        title: 'Deleted',
        description: 'Testimonial deleted successfully.',
      })
    } else {
      toast({
        title: 'Error',
        description: res.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Testimonials</div>
      </div>

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
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-16 w-16 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                </TableRow>
              ))
            : testimonials.map((testimonial) => (
                <TableRow key={testimonial._id}>
                  <TableCell className="font-medium">
                    {testimonial.name}
                  </TableCell>
                  <TableCell>{testimonial.message}</TableCell>
                  <TableCell
                    onClick={() => handleStatusUpdate(testimonial._id)}
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    {testimonial.isApproved ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>
                    <Image
                      src={
                        testimonial.profileImage?.trim()
                          ? testimonial.profileImage
                          : '/images/dummy_image.jpg'
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
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TestimonialsPage
