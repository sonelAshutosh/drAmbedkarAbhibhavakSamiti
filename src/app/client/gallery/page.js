'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getGalleryItems } from '@/app/admin/gallery/action'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import Modal from './Modal'

function GalleryPage() {
  const [galleryData, setGalleryData] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null)

  // Fetch Gallery Items
  const fetchData = async (page) => {
    const res = await getGalleryItems(page)
    if (res.status === 'success') {
      setGalleryData(res.data.galleries)
      setTotalPages(res.data.totalPages)
    } else {
      console.error(res.message)
    }
  }

  // Initial Load
  useEffect(() => {
    fetchData(page)
  }, [page])

  // Pagination Range
  const getPaginationRange = () => {
    const range = []
    for (let i = 1; i <= totalPages; i++) {
      range.push(i)
    }
    return range
  }

  return (
    <div className="py-4 px-4 lg:px-20 text-secondary-dark">
      <div className="text-lg tracking-wider font-semibold py-2">Gallery</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryData.map((item) =>
          item.images.map((img, index) => (
            <div
              key={`${item._id}-${index}`}
              className="relative border rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>{' '}
              {/* Gradient Overlay */}
              <Image
                src={img.data}
                alt={img.title}
                width={200}
                height={200}
                className="w-full h-full object-cover border-2 border-secondary-dark"
                onClick={() => setSelectedImage(img.data)}
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 text-primary-base text-sm font-semibold bg-gradient-to-t from-accent-base to-transparent">
                {img.title}
              </div>{' '}
            </div>
          ))
        )}
      </div>

      {/* {selectedImage && (
        <Modal onClose={() => setSelectedImage(null)}>
          <div className="relative w-full h-full flex justify-center items-center">
            <Image
              src={selectedImage}
              alt="Enlarged Image"
              width={1000} // Set the desired width for the image
              height={1000} // Set the desired height for the image
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </Modal>
      )} */}

      {/* Pagination Controls */}
      <div className="flex justify-center my-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            {getPaginationRange().map((pg) => (
              <PaginationItem key={pg}>
                <PaginationLink
                  href="#"
                  isActive={pg === page}
                  onClick={() => setPage(pg)}
                >
                  {pg}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default GalleryPage
