'use client'

import Image from 'next/image'
import { useContext } from 'react'
import { LanguageContext } from '@/lib/languageContext'
import Link from 'next/link'

const texts = {
  en: {
    donateTitle: 'Donate',
    donateDescription:
      'Support our cause by scanning the UPI QR code. Use any UPI app to donate.',
    volunteerTitle: 'Volunteer',
    volunteerDescription:
      'Join us to make a difference—contact us to get started.',
    membershipTitle: 'Reach Us',
    membershipDescription:
      'For further inquiries, email us at drambedkarabhibhavaksamiti@gmail.com or call 123-456-7890',
    donateNow: 'Donate Now',
    becomeVolunteer: 'Join Us',
    contactUs: 'Contact Us',
  },
  hi: {
    donateTitle: 'दान करें',
    donateDescription:
      'हमारे इस मिशन का समर्थन करने के लिए UPI QR कोड स्कैन करें। किसी भी UPI ऐप का उपयोग करके दान करें।',
    volunteerTitle: 'स्वयंसेवक बनें',
    volunteerDescription:
      'हमारे साथ जुड़ें और बदलाव लाने में मदद करें—शुरू करने के लिए हमसे संपर्क करें।',
    membershipTitle: 'संपर्क करें',
    membershipDescription:
      'अधिक जानकारी के लिए, हमें drambedkarabhibhavaksamiti@gmail.com पर ईमेल करें या 123-456-7890 पर कॉल करें।',
    donateNow: 'अभी दान करें',
    becomeVolunteer: 'हमसे जुड़ें',
    contactUs: 'संपर्क करें',
  },
}

const GetInvolved = () => {
  const { language } = useContext(LanguageContext)
  const {
    donateTitle,
    donateDescription,
    volunteerTitle,
    volunteerDescription,
    membershipTitle,
    membershipDescription,
    donateNow,
    contactUs,
    becomeVolunteer,
  } = texts[language]

  return (
    <div className="bg-secondary-dark py-12 px-4 lg:px-20">
      <div className="mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-primary-base">
            {language === 'hi' ? 'हमारे साथ जुड़ें' : 'Get Involved'}
          </h2>
          <p className="mt-4 text-lg text-primary-base/50">
            {language === 'hi'
              ? 'हमारे मिशन का समर्थन करें और समाज में बदलाव लाएं।'
              : 'Support our mission and make a difference in the community.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Donation Card */}
          <div className="bg-primary-base/95 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold text-black mb-4">
              {donateTitle}
            </h3>
            <div className="w-40 h-40 mb-4">
              <Image
                src="/images/upi_logo.png"
                alt="UPI QR Code"
                width={160}
                height={160}
                className="object-contain rounded-full border-2 border-secondary-dark"
              />
            </div>
            <p className="text-primary-dark/90 text-sm mb-4">
              {donateDescription}
            </p>
            <Link
              href="/client/donate"
              className="bg-accent-base text-white px-6 py-2 rounded-lg shadow hover:bg-accent-dark transition"
            >
              {donateNow}
            </Link>
          </div>

          <div className="bg-primary-base/95 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold text-secondary-dark mb-4">
              {volunteerTitle}
            </h3>
            <div className="w-40 h-40 mb-4">
              <Image
                src="/images/volunteer.png"
                alt="Volunteer"
                width={160}
                height={160}
                className="object-contain rounded-full border-2 border-secondary-dark"
              />
            </div>
            <p className="text-primary-dark/90 text-sm mb-4">
              {volunteerDescription}
            </p>
            <Link
              href="/client/contact-us"
              className="bg-accent-base text-white px-6 py-2 rounded-lg shadow hover:bg-accent-dark transition"
            >
              {becomeVolunteer}
            </Link>
          </div>

          {/* Reach Us Card */}
          <div className="bg-primary-base/95 rounded-xl shadow-md p-6 flex flex-col items-center text-center">
            <h3 className="text-2xl font-semibold text-secondary-dark mb-4">
              {membershipTitle}
            </h3>
            <div className="w-40 h-40 mb-4">
              <Image
                src="/images/reach_us.png"
                alt="Reach Us"
                width={160}
                height={160}
                className="object-contain rounded-full border-2 border-secondary-dark"
              />
            </div>
            <p className="text-primary-dark/90 text-sm mb-4">
              {membershipDescription}
            </p>
            <Link
              href="/client/contact-us"
              className="bg-accent-base text-white px-6 py-2 rounded-lg shadow hover:bg-accent-dark transition"
            >
              {contactUs}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetInvolved
