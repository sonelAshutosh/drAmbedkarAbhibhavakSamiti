// src/components/TopLoadingBar.js
'use client'

import React, { useRef, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import LoadingBar from 'react-top-loading-bar'

export default function TopLoadingBar() {
  const ref = useRef(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (ref.current) {
      ref.current.complete()
      ref.current.continuousStart()
    }
  }, [pathname, searchParams])

  return <LoadingBar color="#ffffff" ref={ref} height={4} waitingTime={300} />
}
