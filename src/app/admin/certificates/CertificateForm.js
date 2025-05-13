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
import { addCertificate } from './action'

function CertificateForm({ onCertificateAdded }) {
  const [name, setName] = useState('')
  const [issuedBy, setIssuedBy] = useState('')
  const [preview, setPreview] = useState({ myFile: '/images/dummy_image.jpg' })
  const [error, setError] = useState('')

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    })
    const base64 = await convertToBase64(compressedFile)
    setPreview({ myFile: base64 })
  }

  const handleSubmit = async (formData) => {
    formData.set('image', preview.myFile)

    const result = await addCertificate(formData)

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
        description: 'Certificate added successfully',
      })
      onCertificateAdded()
    }
  }

  return (
    <Sheet>
      <SheetTrigger>
        <PlusCircle />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Certificate</SheetTitle>
          <SheetDescription className="pt-8">
            <form
              action={async (formData) => handleSubmit(formData)}
              className="space-y-4"
            >
              <div>
                <Label className="block mb-2">Certificate Name</Label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-md p-2 text-secondary-dark"
                  required
                />
              </div>
              <div>
                <Label className="block mb-2">Issued By</Label>
                <input
                  type="text"
                  name="issuedBy"
                  value={issuedBy}
                  onChange={(e) => setIssuedBy(e.target.value)}
                  className="w-full border rounded-md p-2 text-secondary-dark"
                />
              </div>
              <div>
                <Label className="block mb-2">Certificate Image</Label>
                <Image
                  src={preview.myFile}
                  alt="Certificate Preview"
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
                Add Certificate
              </Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default CertificateForm
