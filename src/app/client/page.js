'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function ClientPage() {
  const { push } = useRouter()

  useEffect(() => {
    push('/client/home')
  }, [push])
  return null
}

export default ClientPage
