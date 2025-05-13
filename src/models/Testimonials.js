import mongoose, { model } from 'mongoose'

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
  profileImage: {
    type: String,
    default: '',
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Testimonial ||
  model('Testimonial', testimonialSchema)
