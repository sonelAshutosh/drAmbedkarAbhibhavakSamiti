'use client'

import { useState } from 'react'
import imageCompression from 'browser-image-compression'
import { Button } from '@/components/ui/button'
import { createNewStudent } from './action'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { toast } from '@/hooks/use-toast'

function StudentForm({ onStudentAdded }) {
  const [imagePreview, setImagePreview] = useState('/images/dummy_image.jpg')
  const [compressedBase64, setCompressedBase64] = useState('')

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      }

      try {
        const compressedFile = await imageCompression(file, options)
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64 = reader.result
          setCompressedBase64(base64)
          setImagePreview(base64)
        }
        reader.readAsDataURL(compressedFile)
      } catch (error) {
        console.error('Image compression failed:', error)
      }
    }
  }

  const handleSubmit = async (formData) => {
    formData.set('image', compressedBase64 || '')
    const res = await createNewStudent(formData)

    if (res.status === 'success') {
      toast({
        title: 'Success',
        description: 'Student created successfully',
      })
      setImagePreview(null)
      setCompressedBase64('')
      onStudentAdded()
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
      action={async (formData) => handleSubmit(formData)}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400"
        />
      </div>

      <div>
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          required
          className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400"
        />
      </div>

      <div>
        <Label htmlFor="percentage">
          Percentage{' '}
          <span className="text-secondary-dark/50">(only enter numbers)</span>
        </Label>
        <input
          type="number"
          id="percentage"
          name="percentage"
          min="0"
          max="100"
          step="0.01"
          required
          className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400"
        />
      </div>

      <div>
        <Label htmlFor="class">Class</Label>
        <select
          id="class"
          name="class"
          required
          defaultValue=""
          className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400"
        >
          <option value="">Select class</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="stream">Stream</Label>
        <select
          id="stream"
          name="stream"
          defaultValue=""
          className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-400"
        >
          <option value="">Select stream</option>
          <option value="Science">Science</option>
          <option value="Commerce">Commerce</option>
          <option value="Arts">Arts</option>
        </select>
      </div>

      <div>
        <Label htmlFor="image">Profile Image (optional)</Label>
        <Input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            className="mt-2 h-32 rounded-md border object-cover"
            width={128}
            height={128}
          />
        )}
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}

export default StudentForm
