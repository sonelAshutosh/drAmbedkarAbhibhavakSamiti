import mongoose, { model } from 'mongoose'

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Campaign || model('Campaign', campaignSchema)
