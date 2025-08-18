import mongoose, { model } from 'mongoose'

const lettersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sendTo: {
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

if (mongoose.models['Letter']) {
  delete mongoose.models['Letter']
}

export default mongoose.models.Letter || model('Letter', lettersSchema)
