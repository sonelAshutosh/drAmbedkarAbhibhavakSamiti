import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Event || mongoose.model('Event', EventSchema)
