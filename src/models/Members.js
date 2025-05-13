import mongoose, { model } from 'mongoose'

const membersSchema = new mongoose.Schema({
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

export default mongoose.models.Member || model('Member', membersSchema)
