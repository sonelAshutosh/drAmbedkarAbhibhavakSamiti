'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import imageCompression from 'browser-image-compression'
import Image from 'next/image'
import { createNewFaculty } from './action'
import { toast } from '@/hooks/use-toast'

function FacultyForm({ onFacultyAdded }) {
  const [imagePreview, setImagePreview] = useState('/images/dummy_image.jpg')
  const [compressedImageBase64, setCompressedImageBase64] = useState('')

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      }
      const compressedFile = await imageCompression(file, options)
      const reader = new FileReader()

      reader.onloadend = () => {
        const base64 = reader.result
        setCompressedImageBase64(base64)
        setImagePreview(base64)
      }

      reader.readAsDataURL(compressedFile)
    } catch (error) {
      console.error('Image compression error:', error)
    }
  }

  const handleSubmit = async (formData) => {
    formData.set('image', compressedImageBase64)
    const res = await createNewFaculty(formData)

    if (res.status === 'success') {
      toast({
        title: 'Success',
        description: res.message,
      })
      onFacultyAdded()
    } else {
      toast({
        title: 'Error',
        description: res.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <form
      className="space-y-4"
      action={async (formData) => handleSubmit(formData)}
    >
      <div>
        <Label>Name</Label>
        <Input type="text" name="name" required />
      </div>

      <div>
        <Label>Email</Label>
        <Input type="email" name="email" required />
      </div>

      <div>
        <Label>Phone</Label>
        <Input type="text" name="phone" required />
      </div>

      <div>
        <Label>Designation</Label>
        <Input type="text" name="designation" required />
      </div>

      <div>
        <Label>Department</Label>
        <Input type="text" name="department" />
      </div>

      <div>
        <Label>Qualifications</Label>
        <Input type="text" name="qualifications" />
      </div>

      <div>
        <Label>Experience</Label>
        <Input type="text" name="experience" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Facebook URL</Label>
          <Input type="url" name="fbURL" />
        </div>
        <div>
          <Label>Instagram URL</Label>
          <Input type="url" name="instaURL" />
        </div>
        <div>
          <Label>Twitter URL</Label>
          <Input type="url" name="twitterURL" />
        </div>
        <div>
          <Label>LinkedIn URL</Label>
          <Input type="url" name="linkedinURL" />
        </div>
      </div>

      <div>
        <Label>Profile Image</Label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            className="mt-2 h-24 w-24 rounded-full object-cover border"
            width={128}
            height={128}
          />
        )}
        {/* Hidden input for Base64 string */}
        <input type="hidden" name="image" value={compressedImageBase64} />
      </div>

      <label className="flex items-center space-x-2 cursor-pointer select-none">
        <Input
          type="checkbox"
          name="isActive"
          className="w-4 h-4"
          defaultChecked
        />
        <span className="text-sm">Is Active</span>
      </label>

      <div>
        <Label>Priority</Label>
        <Input type="number" name="priority" defaultValue={1000} />
      </div>

      <div className="w-full flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}

export default FacultyForm
