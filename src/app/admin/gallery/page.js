'use client'

import React, { use, useEffect, useState } from 'react'
import GalleryForm from './GalleryForm'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteGalleryItem, getGalleryItems } from './action'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

function GalleryPage() {
  const [galleryData, setGalleryData] = useState([])

  useEffect(() => {
    const fetchGalleryItems = async () => {
      const res = await getGalleryItems(1)

      if (res.status === 'success') {
        setGalleryData(res.data.galleries)
      } else {
        console.error('Error fetching gallery items:', res.message)
      }
    }

    fetchGalleryItems()
  }, [])

  const handleDelete = async (id) => {
    const confirmation = confirm(
      'Are you sure you want to delete this item? This action cannot be undone.'
    )

    if (confirmation) {
      try {
        const res = await deleteGalleryItem(id)

        if (res.status === 'success') {
          setGalleryData((prevData) =>
            prevData.filter((item) => item._id !== id)
          )
          toast({
            title: 'Success',
            description: 'Gallery item deleted successfully.',
            variant: 'default',
          })
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete gallery item.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <div className="py-4 px-4 lg:px-20 text-secondary-dark">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Gallery</div>
        <GalleryForm />
      </div>
      <div>
        <Table>
          <TableCaption>Create or Gallery Images</TableCaption>
          <TableHeader className="border-2">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {galleryData.map((data) => (
              <TableRow key={data._id}>
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell>{data.images[0].description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {data.images.map((img, index) => (
                      <Image
                        key={index}
                        src={img.data}
                        alt={img.title}
                        className="h-16 w-16 object-cover rounded-lg"
                        width={64}
                        height={64}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell onClick={() => handleDelete(data._id)}>
                  <Trash2 className="text-red-500 hover:text-red-800 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default GalleryPage
