import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="w-full">{children}</div>
      <Footer />
    </>
  )
}

export default AdminLayout
