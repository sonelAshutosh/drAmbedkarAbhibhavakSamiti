import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  data: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const GallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: [ImageSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

GallerySchema.statics.paginate = async function (page = 1, limit = 10) {
  const skip = (page - 1) * limit
  const count = await this.countDocuments()
  const galleries = await this.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)

  return {
    total: count,
    page,
    limit,
    totalPages: Math.ceil(count / limit),
    galleries,
  }
}

export default mongoose.models.Gallery ||
  mongoose.model('Gallery', GallerySchema)
