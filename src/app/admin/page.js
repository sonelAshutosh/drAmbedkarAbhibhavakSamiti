import { ArrowLeftSquareIcon, ChartLine } from 'lucide-react'
import React from 'react'

function AdminPage() {
  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="text-lg tracking-wider font-semibold text-secondary-dark">
        Admin Dashboard
      </div>

      <div className="bg-red-200 py-8 my-4 rounded-lg">
        <div className="flex gap-2">
          <ArrowLeftSquareIcon />
          <span>Navigate Using the navbar</span>
        </div>
      </div>
      <div className="bg-gray-100 shadow-lg py-8 my-4 rounded-lg">
        <div className="flex gap-2 items-center">
          <ChartLine />
          <span>Analytics Dashboard </span>
          <span className="text-xs text-gray-500">(Coming Soon ...)</span>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
