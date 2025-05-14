'use server'

import dbConnect from '@/lib/dbConnect'
import Gallery from '@/models/Gallery'

// export async function getGalleryItems(page = 1, limit = 10) {
//     try {
//         await dbConnect()
//         const skip = (page - 1) * limit
//         const count = await Gallery.countDocuments()
//         const galleries = await Gallery.find()
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit)

//         return {
//         total: count,
//         page,
//         limit,
//         totalPages: Math.ceil(count / limit),
//         galleries,
//         }
//     } catch (error) {
//         console.error('Error fetching gallery items:', error)
//         return {
//         status: 'error',
//         message: 'An error occurred while fetching gallery items.',
//         }
//     }
// }

export async function getGalleryItems(page = 1) {
  try {
    await dbConnect()
    const galleryData = await Gallery.paginate(page)
    const galleryJson = JSON.parse(JSON.stringify(galleryData))

    return {
      status: 'success',
      data: galleryJson,
    }
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return {
      status: 'error',
      message: 'An error occurred while fetching gallery items.',
    }
  }
}

export async function addGalleryItem(formData) {
  try {
    await dbConnect()

    const { name, description = '', images = [] } = formData

    if (!name.trim()) {
      return {
        status: 'error',
        message: 'Name is required.',
      }
    }

    if (images.length === 0) {
      return {
        status: 'error',
        message: 'At least one image is required.',
      }
    }

    const newGallery = new Gallery({
      name: name.trim(),
      images: images.map((image) => ({
        title: name.trim(),
        description: description.trim(),
        data: image.data,
      })),
    })

    await newGallery.save()

    return {
      status: 'success',
      message: 'Gallery item added successfully.',
    }
  } catch (error) {
    console.error('Error adding gallery item:', error)
    return {
      status: 'error',
      message: 'An error occurred while adding the gallery item.',
      details: error.message,
    }
  }
}

export async function deleteGalleryItem(id) {
  try {
    await dbConnect()
    await Gallery.findByIdAndDelete(id)
    return {
      status: 'success',
      message: 'Gallery item deleted successfully.',
    }
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return {
      status: 'error',
      message: 'An error occurred while deleting the gallery item.',
    }
  }
}
