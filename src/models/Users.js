import mongoose, { model } from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    requied: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

export default mongoose.models.User || model('User', userSchema)
