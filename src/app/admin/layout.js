import React from 'react'
import AdminNav from './AdminNav'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <div className="border-r-2 border-primary-dark/50 dark:border-primary-base/50">
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
