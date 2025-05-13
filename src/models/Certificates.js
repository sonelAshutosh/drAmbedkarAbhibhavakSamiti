import mongoose, { model } from 'mongoose'

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  issuedBy: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

if (mongoose.models['Certificate']) {
  delete mongoose.models['Certificate']
}

export default mongoose.models.Certificate ||
  model('Certificate', certificateSchema)
