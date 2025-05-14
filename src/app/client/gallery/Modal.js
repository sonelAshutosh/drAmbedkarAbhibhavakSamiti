'use client'

import { X } from 'lucide-react'
import React from 'react'

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-secondary-dark bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-primary-base rounded-lg overflow-hidden p-4 relative w-full max-w-full max-h-full md:w-4/5 md:h-auto lg:w-3/4 lg:h-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>
        <div className="w-full h-auto">{children}</div>
      </div>
    </div>
  )
}

export default Modal
