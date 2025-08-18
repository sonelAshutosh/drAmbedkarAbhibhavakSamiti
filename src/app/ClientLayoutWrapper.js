'use client'

import { usePathname } from 'next/navigation'
import Navbar from './(client)/Navbar'
import Footer from './(client)/Footer'

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname()
  const isAdmin =
    pathname?.startsWith('/admin') || pathname?.startsWith('/login')

  return (
    <>
      {!isAdmin && <Navbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  )
}
