'use client'

import React, { useState } from 'react'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PlusCircle } from 'lucide-react'
import { addGalleryItem } from './action'
import Image from 'next/image'
import imageCompression from 'browser-image-compression'
import { toast } from '@/hooks/use-toast'

function GalleryForm() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files)

    try {
      const compressedImages = await Promise.all(
        files.map(async (file) => {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 0.05, // Target max size (in MB)
            maxWidthOrHeight: 1920, // Max width or height (in px)
            useWebWorker: true,
          })

          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () =>
              resolve({ name: compressedFile.name, data: reader.result })
            reader.onerror = reject
            reader.readAsDataURL(compressedFile)
          })
        })
      )

      setImages(compressedImages)
    } catch (error) {
      console.error('Error compressing files:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = {
        name,
        description,
        images,
      }

      const res = await addGalleryItem(formData)

      if (res.status === 'success') {
        toast({
          title: 'Success',
          description: 'Gallery item added successfully.',
          variant: 'default',
        })
        setName('')
        setDescription('')
        setImages([])
      } else {
        toast({
          title: 'Error',
          description: res.message || 'Failed to add gallery item.',
          variant: 'destructive',
        })
        console.error('Error adding gallery item:', res.message)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while adding the gallery item.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <PlusCircle className="cursor-pointer" />
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-96 p-6">
        <SheetHeader>
          <SheetTitle>Add Gallery Images</SheetTitle>
          <SheetDescription>
            Fill in the details to add a new gallery item.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            placeholder="Gallery Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            required
          />
          <p>* you can select multiple images at once</p>

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <Image
                  key={index}
                  src={img.data}
                  alt={img.name}
                  className="rounded-xl shadow-md"
                  width={100}
                  height={100}
                />
              ))}
            </div>
          )}

          <SheetFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Adding...' : 'Add Images'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default GalleryForm
