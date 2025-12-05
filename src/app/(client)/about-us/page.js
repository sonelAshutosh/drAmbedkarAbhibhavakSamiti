import React from 'react'
import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import SectionHeading from '@/components/SectionHeading'
import ExecutiveCommitteeMembers from '../home/ExecutiveCommitteeMembers'
import MissionVisionStory from './MissionVisionStory'
import Volunteers from './Volunteers'

const content = {
  heading: {
    en: 'About Us',
    hi: 'हमारा परिचय',
  },
  sectionTitle: {
    en: 'Who We Are',
    hi: 'हम कौन हैं',
  },
  intro: {
    en: (
      <p className="text-lg text-secondary-dark leading-relaxed mb-6 text-justify">
        We are <b>Dr. Bhimrao Ambedkar Abhibhavak Samiti, Mandore, Jodhpur</b>
        —dedicated to empowering students and their families through quality
        education, guidance, and holistic development. Our mission is to nurture
        academic excellence, provide essential resources, and inspire strong
        values, while supporting parents and the broader community. We believe
        education is the foundation for social progress and strive to create
        opportunities for every child to thrive.
        <br />
        <span className="block mt-4 text-xl font-bold text-accent-dark">
          Together for Education, Together for Change.
        </span>
      </p>
    ),
    hi: (
      <p className="text-lg text-secondary-dark leading-relaxed mb-6 text-justify">
        हम <b>डॉ. भीमराव अंबेडकर अभिभावक समिति, मंडोर, जोधपुर</b> हैं—जो बच्चों
        और उनके परिवारों को गुणवत्तापूर्ण शिक्षा, मार्गदर्शन और समग्र विकास के
        माध्यम से सशक्त बनाने के लिए समर्पित है। हमारा उद्देश्य विद्यार्थियों को
        उत्कृष्ट शिक्षा, आवश्यक संसाधन और मजबूत संस्कार प्रदान करना है, साथ ही
        अभिभावकों और समाज को भी सहयोग देना है। हम मानते हैं कि शिक्षा सामाजिक
        प्रगति की नींव है और हर बच्चे को आगे बढ़ने का अवसर देने के लिए सतत
        प्रयासरत हैं।
        <br />
        <span className="block mt-4 text-xl font-bold text-accent-dark">
          शिक्षा के लिए साथ, बदलाव के लिए साथ।
        </span>
      </p>
    ),
  },
}

// Server Component
export default async function AboutUsPage({ searchParams }) {
  const language = searchParams?.lang || 'en'

  return (
    <div className="relative">
      {/* Parallax Section */}
      <PageHeader
        title={content.heading[language]}
        backgroundImage="/images/about_us.png"
      />

      {/* Content Section */}
      <div className="py-16 px-4 lg:px-20">
        <div className="py-4 rounded-lg">
          <SectionHeading title={content.sectionTitle[language]} />

          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10">
            {/* Text Section */}
            <div className="lg:w-1/2 text-lg text-secondary-dark/80 leading-relaxed">
              {content.intro[language]}
            </div>

            {/* Image Section */}
            <div className="lg:w-1/2">
              <Image
                src="/images/who_we_are.png"
                alt="School Entrance"
                width={500}
                height={300}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <MissionVisionStory />
        <ExecutiveCommitteeMembers language={language} />
        <Volunteers />
      </div>
    </div>
  )
}
