'use client'

import React, { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PlusCircle, Trash2 } from 'lucide-react'
import EventForm from './EventForm'
import { deleteEvent, getEvents } from './action'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/hooks/use-toast'

function EventsPage() {
  const [events, setEvents] = useState([])

  const fetchData = async () => {
    const res = await getEvents()
    if (res.status === 'success') {
      setEvents(res.data)
    }
  }

  const handleDelete = (id) => async () => {
    const confirmation = confirm('Are you sure you want to delete this event?')
    if (confirmation) {
      const res = await deleteEvent(id)
      if (res.status === 'success') {
        toast({
          title: 'Success',
          description: 'Event deleted successfully',
        })
        fetchData()
      } else {
        toast({
          title: 'Error',
          description: res.message,
          variant: 'destructive',
        })
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Events</div>
        <div>
          <Sheet>
            <SheetTrigger>
              <PlusCircle />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create new Event</SheetTitle>
                <SheetDescription className="pt-8">
                  <EventForm onEventAdded={fetchData} />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length > 0 ? (
              events.map((event, index) => (
                <TableRow key={event._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>
                    {new Date(event.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{event.priority}</TableCell>
                  <TableCell>
                    {event.isPublished ? 'Published' : 'Draft'}
                  </TableCell>
                  <TableCell
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={handleDelete(event._id)}
                  >
                    <Trash2 />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No events found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default EventsPage
