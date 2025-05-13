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
import { addMember } from './action'

function MemberForm({ onMemberAdded }) {
  const [error, setError] = useState('')
  const [preview, setPreview] = useState({ myFile: '/images/dummy_image.jpg' })

  const handleImageChange = async (e) => {
    const file = e.target.files[0]

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
    const result = await addMember(formData)

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
        description: 'Member created successfully',
      })
      onMemberAdded()
    }
  }

  return (
    <Sheet>
      <SheetTrigger>
        <PlusCircle />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Member</SheetTitle>
          <SheetDescription className="pt-8">
            <form
              action={async (formData) => handleSubmit(formData)}
              className="space-y-4"
            >
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Name
                </Label>
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Email
                </Label>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Phone
                </Label>
                <input
                  type="tel"
                  name="phone"
                  pattern="\d{10}"
                  maxLength="10"
                  inputMode="numeric"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  required
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Designation
                </Label>
                <input
                  type="text"
                  name="designation"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Facebook URL
                </Label>
                <input
                  type="url"
                  name="fbURL"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Instagram URL
                </Label>
                <input
                  type="url"
                  name="instaURL"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Twitter URL
                </Label>
                <input
                  type="url"
                  name="twitterURL"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  LinkedIn URL
                </Label>
                <input
                  type="url"
                  name="linkedinURL"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Priority
                </Label>
                <input
                  type="number"
                  name="priority"
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  defaultValue="1000"
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Active
                </Label>
                <input
                  type="checkbox"
                  name="isActive"
                  className="rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                  defaultChecked
                />
              </div>
              <div>
                <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                  Profile Image
                </Label>
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
                  className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-md bg-secondary-dark p-2 text-white"
              >
                Create Member
              </Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default MemberForm
