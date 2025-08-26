import mongoose, { model } from 'mongoose'

const pressSchema = new mongoose.Schema({
  title: { type: String, required: true },
  source: { type: String },
  link: { type: String },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

if (mongoose.models['PressItem']) {
  delete mongoose.models['PressItem']
}

export default mongoose.models.PressItem || model('PressItem', pressSchema)
