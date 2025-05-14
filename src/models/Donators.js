import mongoose, { model } from 'mongoose'

const donatorsSchema = new mongoose.Schema({
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
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    default: '',
  },
  transactionId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
})

if (mongoose.models['Donators']) {
  delete mongoose.models['Donators']
}

export default mongoose.models.Donators || model('Donators', donatorsSchema)
