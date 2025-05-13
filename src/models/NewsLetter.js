import mongoose, { model } from 'mongoose'

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
})

export default mongoose.models.Newsletter ||
  model('Newsletter', newsletterSchema)
