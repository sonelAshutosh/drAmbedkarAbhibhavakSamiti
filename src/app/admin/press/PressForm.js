'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'
import convertToBase64 from '@/lib/convertToBase64'
import imageCompression from 'browser-image-compression'
import { addPress } from './actions' // ✅ new action for press

function PressForm({ onPressAdded }) {
  const [title, setTitle] = useState('')
  const [source, setSource] = useState('')
  const [link, setLink] = useState('')
  const [preview, setPreview] = useState({ myFile: '/images/dummy_image.jpg' })
  const [error, setError] = useState('')

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 2560,
      initialQuality: 0.5,
      useWebWorker: true,
    })

    const base64 = await convertToBase64(compressedFile)
    setPreview({ myFile: base64 })
  }

  const handleSubmit = async (formData) => {
    formData.set('image', preview.myFile)

    const result = await addPress(formData)

    if (result.status === 'error') {
      setError(result.message)
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Success',
        description: 'Press item added successfully',
      })
      onPressAdded()
      setTitle('')
      setSource('')
      setLink('')
      setPreview({ myFile: '/images/dummy_image.jpg' })
    }
  }

  return (
    <Sheet>
      <SheetTrigger>
        <PlusCircle />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Press</SheetTitle>
          <SheetDescription className="pt-8">
            <form
              action={async (formData) => handleSubmit(formData)}
              className="space-y-4"
            >
              <div>
                <Label className="block mb-2">Press Title</Label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-md p-2 text-secondary-dark"
                  required
                />
              </div>
              <div>
                <Label className="block mb-2">Source</Label>
                <input
                  type="text"
                  name="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full border rounded-md p-2 text-secondary-dark"
                />
              </div>
              <div>
                <Label className="block mb-2">Link (optional)</Label>
                <input
                  type="url"
                  name="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full border rounded-md p-2 text-secondary-dark"
                />
              </div>
              <div>
                <Label className="block mb-2">Press Image</Label>
                <Image
                  src={preview.myFile}
                  alt="Press Preview"
                  width={128}
                  height={128}
                  className="rounded-md border w-32 h-32 object-cover mb-2"
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border rounded-md p-2 text-secondary-dark"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-secondary-dark text-white"
              >
                Add Press
              </Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default PressForm
