'use client'

import Image from 'next/image'
import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import DonationForm from './DonatorForm'
import { getDonations } from '@/app/admin/donators/action'
import { LanguageContext } from '@/lib/languageContext.js'

function DonatePage() {
  const [topDonators, setTopDonators] = useState([])
  const { language } = useContext(LanguageContext)

  const translations = {
    en: {
      headerTitle: 'Support Us',
      headerSubtitle:
        'Your contribution empowers education and community development.',
      donateNow: 'Donate Now',
      donateDescription:
        'Every donation helps us provide better facilities, resources, and opportunities to students in need. Scan the QR code below to donate via UPI, or use the details provided.',
      merchantName: 'Merchant Name',
      upiId: 'UPI ID',
      donateViaUPI: 'Donate via UPI',
      contactUs: 'contact us',
      forQueries: 'For large donations, partnerships, or queries, please',
      donators: 'Donators',
      noDonators: 'No Donators yet.',
    },
    hi: {
      headerTitle: 'हमारा समर्थन करें',
      headerSubtitle:
        'आपका योगदान शिक्षा और सामुदायिक विकास को सशक्त बनाता है।',
      donateNow: 'अब दान करें',
      donateDescription:
        'हर दान से हमें ज़रूरतमंद छात्रों को बेहतर सुविधाएं, संसाधन और अवसर प्रदान करने में मदद मिलती है। कृपया नीचे दिए गए QR कोड को स्कैन करें या दिए गए विवरण का उपयोग करें।',
      merchantName: 'विक्रेता का नाम',
      upiId: 'यूपीआई आईडी',
      donateViaUPI: 'यूपीआई से दान करें',
      contactUs: 'संपर्क करें',
      forQueries: 'बड़े दान, साझेदारी या प्रश्नों के लिए कृपया',
      donators: 'दानदाता',
      noDonators: 'अभी तक कोई दानदाता नहीं है।',
    },
  }

  const t = translations[language]

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
            {t.headerTitle}
          </h1>
          <p className="text-lg md:text-2xl text-white font-medium drop-shadow-lg">
            {t.headerSubtitle}
          </p>
        </div>
      </header>

      {/* Donation Section */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-primary-base shadow-lg rounded-2xl p-6 md:p-10 text-center border border-secondary-dark">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-dark mb-4">
            {t.donateNow}
          </h2>
          <p className="mb-6 text-gray-700 text-base md:text-lg">
            {t.donateDescription}
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
                  {t.merchantName}:{' '}
                  <span className="font-semibold text-secondary-dark">
                    DR BHIMRAO AMBEDKAR ABHIB
                  </span>
                </span>
                <span className="block">
                  {t.upiId}:{' '}
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
            {t.donateViaUPI}
          </a>
          <div className="mt-8 text-sm text-gray-500">
            <DonationForm />
            <p className="py-1">
              {t.forQueries}{' '}
              <Link
                href="/client/contact-us"
                className="text-secondary-dark underline hover:text-accent-base transition-all ease-in-out"
              >
                {t.contactUs}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Donators List */}
      <section className="max-w-3xl mx-auto px-4 my-12">
        <div className="bg-primary-base shadow-lg rounded-2xl p-6 md:p-10 text-center border border-secondary-dark">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-dark mb-4">
            {t.donators}
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
            <p className="text-gray-500">{t.noDonators}</p>
          )}
        </div>
      </section>
    </>
  )
}

export default DonatePage
