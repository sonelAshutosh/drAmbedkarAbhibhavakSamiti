import mongoose, { model } from 'mongoose'

const volunteersSchema = new mongoose.Schema({
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
  role: {
    type: String,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: '',
  },
  dateOfBirth: {
    type: Date,
  },
  fbURL: {
    type: String,
  },
  instaURL: {
    type: String,
  },
  twitterURL: {
    type: String,
  },
  linkedinURL: {
    type: String,
  },
  showInList: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})

export default mongoose.models.Volunteer || model('Volunteer', volunteersSchema)
