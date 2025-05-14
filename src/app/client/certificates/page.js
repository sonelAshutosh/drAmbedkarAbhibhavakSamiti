'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getCertificates } from '@/app/admin/certificates/action'

function CertificatesPage() {
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCertificates()
      setCertificates(res.data)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full h-full px-4 lg:px-20 text-secondary-dark dark:text-primary-base py-10">
      <div className="text-6xl lg:text-7xl text-secondary-dark dark:text-secondary-base tracking-wide font-bold pb-10">
        <div className="flex flex-col lg:flex-row">
          <span>Our</span>
          <span className="mx-2 bg-gradient-to-tr from-accent-base to-primary-dark bg-clip-text text-transparent">
            Certificates
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-10">
        {certificates.map((certificate, index) => (
          <div
            key={index}
            className="bg-gradient-to-tr from-accent-base to-primary-dark p-0.5 rounded-lg"
          >
            <div className="bg-primary-base dark:bg-black rounded-lg p-1">
              <Image
                src={certificate.image || '/images/image-not-available.jpg'}
                alt="certificate"
                width={700}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CertificatesPage
