import mongoose, { model } from 'mongoose'

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    default: '',
  },
  qualifications: {
    type: String,
    default: '',
  },
  experience: {
    type: String,
    default: '',
  },
  fbURL: {
    type: String,
    default: '',
  },
  instaURL: {
    type: String,
    default: '',
  },
  twitterURL: {
    type: String,
    default: '',
  },
  linkedinURL: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  priority: {
    type: Number,
    default: 1000,
  },
})

export default mongoose.models.Faculty || model('Faculty', facultySchema)
