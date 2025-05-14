'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import imageCompression from 'browser-image-compression'
import convertToBase64 from '@/lib/convertToBase64'
import { toast } from '@/hooks/use-toast'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { addCampaign } from './action'

const CampaignForm = ({ onCampaignAdded }) => {
  const [galleryImage, setGalleryImage] = useState({
    myFile: '',
    preview: '/images/dummy_image.jpg',
  })
  const [isOpen, setIsOpen] = useState(false)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]

    const compressionOptions = {
      maxSizeMB: 0.05, // 50KB
      maxWidthOrHeight: 1024, // Smaller max dimensions
      useWebWorker: true,
    }

    try {
      const compressedFile = await imageCompression(file, compressionOptions)
      const base64 = await convertToBase64(compressedFile)
      const previewURL = URL.createObjectURL(file)
      setGalleryImage({ myFile: base64, preview: previewURL })
    } catch (error) {
      console.error('Image compression error:', error)
      toast({
        title: 'Error',
        description: 'Failed to compress the image. Please try again.',
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const description = formData.get('description')
    const image = galleryImage.myFile

    try {
      const res = await addCampaign({
        name,
        description,
        image,
      })

      if (res.status === 'success') {
        toast({
          title: 'Success',
          description: 'Your campaign has been created successfully.',
        })
        onCampaignAdded()
        e.target.reset()
        setGalleryImage({ myFile: '', preview: '/images/dummy_image.jpg' })
        setIsOpen(false)
      } else {
        toast({
          title: 'Error',
          description: res.message,
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'An error occurred while creating your campaign.',
      })
    }
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <PlusCircle />
        </SheetTrigger>
        <SheetContent size="lg" className="p-6">
          <SheetHeader>
            <SheetTitle>New Campaign</SheetTitle>
            <SheetDescription>
              Create a new campaign by providing the required details.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <Image
              src={galleryImage.preview}
              alt="Preview"
              className="w-full rounded-lg mb-4"
              width={500}
              height={300}
            />
            <Input
              type="file"
              name="image"
              accept=".jpeg, .png, .jpg"
              onChange={handleImageUpload}
              required
            />
            <Input
              type="text"
              name="name"
              placeholder="Name of Campaign"
              required
            />
            <Textarea
              type="text"
              name="description"
              placeholder="Description"
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default CampaignForm
