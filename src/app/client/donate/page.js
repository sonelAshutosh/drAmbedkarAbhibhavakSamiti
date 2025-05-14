'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import DonationForm from './DonatorForm'
import { getDonations } from '@/app/admin/donators/action'

function DonatePage() {
  const [topDonators, setTopDonators] = useState([])

  useEffect(() => {
    async function getTopDonators() {
      const res = await getDonations(true)
      if (res.status === 'error') {
        console.error('Error fetching top donators:', res.message)
        return
      } else {
        setTopDonators(res.data)
      }
    }

    getTopDonators()
  }, [])

  return (
    <>
      {/* Parallax Header */}
      <header
        className="flex items-center justify-center h-[70vh] md:h-[80vh] bg-fixed bg-center bg-cover relative"
        style={{
          backgroundImage: `url('${'/images/donate_page_mobile.png'}')`,
        }}
      >
        <div className="absolute inset-0 bg-secondary-dark/25 rounded-xl p-6 md:p-10 text-center flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-base mb-2 drop-shadow-lg">
            Support Us
          </h1>
          <p className="text-lg md:text-2xl text-white font-medium drop-shadow-lg">
            Your contribution empowers education and community development.
          </p>
        </div>
      </header>

      {/* Donation Section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-primary-base shadow-lg rounded-2xl p-6 md:p-10 text-center border border-secondary-dark">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-dark mb-4">
            Donate Now
          </h2>
          <p className="mb-6 text-gray-700 text-base md:text-lg">
            Every donation helps us provide better facilities, resources, and
            opportunities to students in need.
            <br />
            Scan the QR code below to donate via UPI, or use the details
            provided.
          </p>
          <div className="flex flex-col items-center gap-4 mb-6">
            <Image
              src="/images/donate_qr.jpg"
              alt="UPI QR for Dr Bhimrao Ambedkar Abhibhavak Samiti"
              className="w-60 h-60 object-contain border-4 border-secondary-dark rounded-lg shadow-md"
              width={240}
              height={240}
            />
            <div className="text-left mt-2">
              <div className="text-gray-800 font-medium">
                <span className="block">
                  Merchant Name:{' '}
                  <span className="font-semibold text-secondary-dark">
                    DR BHIMRAO AMBEDKAR ABHIB
                  </span>
                </span>
                <span className="block">
                  UPI ID:{' '}
                  <span className="font-semibold text-secondary-dark">
                    42360534745@sbi
                  </span>
                </span>
              </div>
            </div>
          </div>
          <a
            href="upi://pay?pa=42360534745@sbi&pn=DR%20BHIMRAO%20AMBEDKAR%20ABHIB"
            className="inline-block mt-4 px-8 py-3 bg-accent-base text-primary-base font-bold rounded-full hover:bg-accent-dark transition"
          >
            Donate via UPI
          </a>
          <div className="mt-8 text-sm text-gray-500">
            <DonationForm />
            <p className="py-1">
              For large donations, partnerships, or queries, please{' '}
              <Link
                href="/client/contact-us"
                className="text-secondary-dark underline hover:text-accent-base transition-all ease-in-out"
              >
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 my-12">
        <div className="bg-primary-base shadow-lg rounded-2xl p-6 md:p-10 text-center border border-secondary-dark">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-dark mb-4">
            Donators
          </h2>
          {topDonators.length > 0 ? (
            <div className="space-y-4">
              {topDonators.map((donator) => (
                <div
                  key={donator._id}
                  className="flex justify-between items-center border-b border-secondary-dark/25"
                >
                  <div className="text-lg font-medium text-secondary-dark">
                    {donator.name}
                  </div>
                  <div className="text-lg text-secondary-dark font-semibold">
                    ₹{donator.amount}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No Donators yet.</p>
          )}
        </div>
      </section>
    </>
  )
}

export default DonatePage
