import React from 'react'
import AdminNav from './AdminNav'

function AdminLayout({ children }) {
  return (
    <div className="flex h-screen w-screen">
      <div className="border-r-2 border-primary-dark/50 dark:border-primary-base/50">
        <AdminNav />
      </div>
      <div className="w-full">Right</div>
    </div>
  )
}

export default AdminLayout
