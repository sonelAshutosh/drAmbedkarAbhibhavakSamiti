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
import { createNewVolunteer } from './action'

function VolunteerForm({ onVolunteerAdded }) {
  const [error, setError] = useState('')
  const [preview, setPreview] = useState({ myFile: '/images/dummy_image.jpg' })

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    })
    const base64 = await convertToBase64(compressedFile)
    setPreview({ ...preview, myFile: base64 })
  }

  const handleSubmit = async (formData) => {
    formData.set('image', preview.myFile)
    const result = await createNewVolunteer(formData)

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
        description: 'Volunteer created successfully',
      })
    }
    onVolunteerAdded()
  }

  return (
    <Sheet>
      <SheetTrigger>
        <PlusCircle />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Volunteer</SheetTitle>
          <SheetDescription className="pt-8">
            <form
              action={async (formData) => handleSubmit(formData)}
              className="space-y-4"
            >
              <div>
                <Label>Name</Label>
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-md border p-2"
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-md border p-2"
                  required
                />
              </div>
              <div>
                <Label>Phone</Label>
                <input
                  type="tel"
                  name="phone"
                  pattern="\d{10}"
                  maxLength="10"
                  inputMode="numeric"
                  className="w-full rounded-md border p-2"
                  required
                />
              </div>
              <div>
                <Label>Role</Label>
                <input
                  type="text"
                  name="role"
                  className="w-full rounded-md border p-2"
                />
              </div>
              <div>
                <Label>Date of Birth</Label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="w-full rounded-md border p-2"
                />
              </div>
              <div>
                <Label>Facebook URL</Label>
                <input
                  type="url"
                  name="fbURL"
                  className="w-full rounded-md border p-2"
                />
              </div>
              <div>
                <Label>Instagram URL</Label>
                <input
                  type="url"
                  name="instaURL"
                  className="w-full rounded-md border p-2"
                />
              </div>
              <div>
                <Label>Twitter URL</Label>
                <input
                  type="url"
                  name="twitterURL"
                  className="w-full rounded-md border p-2"
                />
              </div>
              <div>
                <Label>LinkedIn URL</Label>
                <input
                  type="url"
                  name="linkedinURL"
                  className="w-full rounded-md border p-2"
                />
              </div>
              <div>
                <Label>Show in List</Label>
                <input
                  type="checkbox"
                  name="showInList"
                  className="mr-2"
                  defaultChecked
                />
              </div>
              <div>
                <Label>Active</Label>
                <input
                  type="checkbox"
                  name="isActive"
                  className="mr-2"
                  defaultChecked
                />
              </div>
              <div>
                <Label>Profile Image</Label>
                <Image
                  src={preview.myFile}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover mb-2 rounded-md border"
                  width={128}
                  height={128}
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-md border p-2"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-secondary-dark text-white rounded-md p-2"
              >
                Create Volunteer
              </Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default VolunteerForm
