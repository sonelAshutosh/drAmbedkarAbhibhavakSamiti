import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import { createEvent } from './action'
import { toast } from '@/hooks/use-toast'

function EventForm({ onEventAdded }) {
  const handleSubmit = async (formData) => {
    const res = await createEvent(formData)

    if (res.status === 'success') {
      toast({
        title: 'Success',
        description: 'Event created successfully',
      })
      onEventAdded()
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
      className="flex flex-col gap-4"
    >
      <div>
        <Label>Type</Label>
        <Input type="text" name="type" required />
      </div>

      <div>
        <Label>Title</Label>
        <Input type="text" name="title" required />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea name="description" required rows={4} />
      </div>

      <div>
        <Label>Date</Label>
        <Input type="date" name="date" />
      </div>

      <div className="flex items-center space-x-2">
        <Input
          type="checkbox"
          name="isPublished"
          defaultChecked={true}
          className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <Label className="text-sm font-medium">Published</Label>
      </div>

      <div>
        <Label>Priority</Label>
        <Input type="number" name="priority" defaultValue="1000" />
      </div>

      <Button type="submit">Save News</Button>
    </form>
  )
}

export default EventForm
