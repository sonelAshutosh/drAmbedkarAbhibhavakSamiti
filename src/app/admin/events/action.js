'use server'

import dbConnect from '@/lib/dbConnect'
import Events from '@/models/Events'

export async function getEvents() {
  try {
    await dbConnect()

    const events = await Events.find({}).sort({ date: -1 })
    const eventsJson = JSON.parse(JSON.stringify(events))

    return {
      status: 'success',
      data: eventsJson,
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    return {
      status: 'error',
      message: 'Error fetching events',
    }
  }
}

export async function getTopFiveLatestEvents() {
  try {
    await dbConnect()

    const events = await Event.find({ isPublished: true }) // Filter published only
      .sort({ date: -1 }) // Sort by latest date
      .limit(5)
      .select('title description date') // Optional optimization

    const eventsJson = JSON.parse(JSON.stringify(events))

    return {
      status: 'success',
      data: eventsJson,
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    return {
      status: 'error',
      message: 'Error fetching events',
    }
  }
}

export async function getTopFiveEventsByPriority(id) {
  try {
    await dbConnect()

    const events = await Events.find({ isPublished: true, _id: { $ne: id } }) // Filter published only
      .sort({ priority: 1 }) // Sort by priority
      .limit(5)
      .select('title description date') // Optional optimization

    const eventsJson = JSON.parse(JSON.stringify(events))

    return {
      status: 'success',
      data: eventsJson,
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    return {
      status: 'error',
      message: 'Error fetching events',
    }
  }
}

export async function createEvent(formData) {
  const eventData = {}
  formData.forEach((value, key) => {
    if (eventData['isPublished'] === 'on') {
      eventData['isPublished'] = true
    } else {
      eventData['isPublished'] = false
    }
    eventData[key] = value
  })

  try {
    await dbConnect()

    const event = new Events(eventData)
    await event.save()

    return {
      status: 'success',
      message: 'Event created successfully',
    }
  } catch (error) {
    console.error('Error creating event:', error)
    return {
      status: 'error',
      message: 'Error creating event',
    }
  }
}

export async function updateEvent(eventId, event) {}

export async function deleteEvent(id) {
  try {
    await dbConnect()

    const event = await Events.findByIdAndDelete(id)

    if (!event) {
      return {
        status: 'error',
        message: 'Event not found',
      }
    }

    return {
      status: 'success',
      message: 'Event deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting event:', error)
    return {
      status: 'error',
      message: 'Error deleting event',
    }
  }
}
