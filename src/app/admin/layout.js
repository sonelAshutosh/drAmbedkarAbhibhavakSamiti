import React from 'react'
import AdminNav from './AdminNav'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <div className="text-secondary-dark ">
          <AdminNav />
        </div>
        <div className="w-full">
          <SidebarTrigger />
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminLayout
