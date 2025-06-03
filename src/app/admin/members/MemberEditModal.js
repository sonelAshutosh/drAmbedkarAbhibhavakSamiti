'use client'

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { updateMember } from './action'
import convertToBase64 from '@/lib/convertToBase64'
import imageCompression from 'browser-image-compression'
import Image from 'next/image'

export default function MemberEditModal({
  open,
  onOpenChange,
  member,
  onMemberUpdated,
}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    priority: 1000,
    image: '',
    fbURL: '',
    instaURL: '',
    twitterURL: '',
    linkedinURL: '',
    isActive: true,
  })

  const [preview, setPreview] = useState({ myFile: '' })

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    })

    const base64 = await convertToBase64(compressedFile)
    setPreview({ myFile: base64 })
    setForm((prev) => ({ ...prev, image: base64 }))
  }

  useEffect(() => {
    if (member) {
      setForm({
        name: member.name ?? '',
        email: member.email ?? '',
        phone: member.phone ?? '',
        designation: member.designation ?? '',
        priority: member.priority ?? 1000,
        image: member.image ?? '',
        fbURL: member.fbURL ?? '',
        instaURL: member.instaURL ?? '',
        twitterURL: member.twitterURL ?? '',
        linkedinURL: member.linkedinURL ?? '',
        isActive: member.isActive ?? true,
      })
    }
    if (member?.image) {
      setPreview({ myFile: member.image })
    }
  }, [member])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!member) return

    const resp = await updateMember({ _id: member._id, ...form })
    console.log('Update response:', resp)

    if (resp.status === 'success') {
      toast({ title: 'Member updated', description: 'Changes saved.' })
      onMemberUpdated()
      onOpenChange(false)
    } else {
      toast({
        title: 'Error',
        description: resp.message ?? 'Something went wrong.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit member details</DialogTitle>
          </DialogHeader>

          <div className="grid sm:grid-cols-3 gap-6 py-4">
            {/* Left side: Form */}
            <div className="sm:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Input
                  id="priority"
                  name="priority"
                  type="number"
                  value={form.priority}
                  onChange={handleChange}
                  min={0}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fbURL">Facebook URL</Label>
                  <Input
                    id="fbURL"
                    name="fbURL"
                    value={form.fbURL}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="instaURL">Instagram URL</Label>
                  <Input
                    id="instaURL"
                    name="instaURL"
                    value={form.instaURL}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="twitterURL">Twitter URL</Label>
                  <Input
                    id="twitterURL"
                    name="twitterURL"
                    value={form.twitterURL}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedinURL">LinkedIn URL</Label>
                  <Input
                    id="linkedinURL"
                    name="linkedinURL"
                    value={form.linkedinURL}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>

            {/* Right side: Image preview and upload */}
            <div className="flex flex-col items-center justify-start space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <Image
                src={preview.myFile}
                alt="Profile"
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-md border"
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
