'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { getEvents } from '@/app/admin/events/action'

function NewsAndAnnouncementPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEvents()

      if (res.status === 'success') {
        const sortedEvents = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
        setEvents(sortedEvents)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="px-4 lg:px-20 py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        News & Announcements
      </h1>

      {events.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event._id}
              className="bg-primary-base text-secondary-dark shadow-lg shadow-secondary-dark/20 border border-primary-dark/20 transition hover:scale-[1.02] duration-200"
            >
              <CardContent className="p-6 ">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-sm text-secondary-dark/50">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-base pt-2">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-secondary-dark/50 text-lg">
          No announcements available.
        </div>
      )}
    </div>
  )
}

export default NewsAndAnnouncementPage
