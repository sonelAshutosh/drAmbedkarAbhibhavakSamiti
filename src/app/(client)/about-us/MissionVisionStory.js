'use client'

import React, { useContext } from 'react'
import Image from 'next/image'
import { LanguageContext } from '@/lib/languageContext'

const content = {
  en: {
    missionTitle: 'Mission',
    missionText:
      'To empower students and families by promoting quality education, holistic development, and strong values. We work to provide essential resources, guidance, and opportunities for children, while supporting parents and the community for a brighter future.',
    visionTitle: 'Vision',
    visionText:
      'A society where every child receives excellent education and holistic support, enabling them to become responsible, compassionate, and empowered citizens.',
    storyTitle: 'Our Story',
    storyText:
      'Dr. Bhimrao Ambedkar Abhibhavak Samiti, Mandore, Jodhpur was founded by a group of dedicated parents and community members who recognized the need for quality education and holistic development for children in the region. Officially registered in August 2023, the NGO has since worked tirelessly to support students, organize educational and sports activities, and foster a spirit of cooperation and social awareness.',
    milestones: [
      '2023: Official registration and formation of the executive committee',
      'Initiated academic and sports resource programs for students',
      'Mobilized community support and parent engagement',
      'Continues to expand projects for student welfare and school development',
    ],
  },
  hi: {
    missionTitle: 'मिशन',
    missionText:
      'विद्यार्थियों और परिवारों को गुणवत्तापूर्ण शिक्षा, समग्र विकास और मजबूत संस्कारों के माध्यम से सशक्त बनाना। हम बच्चों के लिए आवश्यक संसाधन, मार्गदर्शन और अवसर उपलब्ध कराने के साथ-साथ अभिभावकों और समुदाय का सहयोग करते हैं ताकि उज्ज्वल भविष्य सुनिश्चित किया जा सके।',
    visionTitle: 'विजन',
    visionText:
      'एक ऐसा समाज जहाँ हर बच्चे को उत्कृष्ट शिक्षा और समग्र सहयोग मिले, जिससे वे जिम्मेदार, संवेदनशील और सशक्त नागरिक बन सकें।',
    storyTitle: 'हमारी कहानी',
    storyText:
      'डॉ. भीमराव अंबेडकर अभिभावक समिति, मंडोर, जोधपुर की स्थापना समर्पित अभिभावकों और समुदाय के सदस्यों द्वारा की गई, जिन्होंने क्षेत्र में बच्चों के लिए गुणवत्तापूर्ण शिक्षा और समग्र विकास की आवश्यकता को महसूस किया। अगस्त 2023 में पंजीकृत होने के बाद से, समिति विद्यार्थियों के लिए शैक्षिक और खेल गतिविधियों का आयोजन, सहयोग और सामाजिक जागरूकता बढ़ाने के लिए निरंतर कार्य कर रही है।',
    milestones: [
      '2023: आधिकारिक पंजीकरण और कार्यकारिणी का गठन',
      'विद्यार्थियों के लिए शैक्षिक और खेल संसाधन कार्यक्रमों की शुरुआत',
      'समुदाय और अभिभावकों की सक्रिय भागीदारी',
      'विद्यार्थी कल्याण और विद्यालय विकास के लिए परियोजनाओं का विस्तार',
    ],
  },
}

function MissionVisionStory() {
  const { language } = useContext(LanguageContext)
  const langContent = content[language]

  return (
    <section className="bg-secondary-dark text-primary-base py-16 px-4 lg:px-20 space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start pb-8 border-b border-primary-base">
        <div>
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            {langContent.missionTitle}
          </h2>
          <p className="text-lg leading-relaxed text-justify">
            {langContent.missionText}
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
            {langContent.visionTitle}
          </h2>
          <p className="text-lg leading-relaxed text-justify">
            {langContent.visionText}
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{langContent.storyTitle}</h2>
          <p className="text-lg leading-relaxed text-justify mb-4">
            {langContent.storyText}
          </p>
          <ul className="text-base list-disc list-inside mb-4">
            {langContent.milestones.map((item, index) => (
              <li key={index} className="text-justify">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 flex flex-col items-center gap-4">
          <Image
            src="/images/our_story.jpg"
            alt="School Entrance"
            width={400}
            height={250}
            className="rounded-lg shadow-md w-full aspect-video"
          />
        </div>
      </div>
    </section>
  )
}

export default MissionVisionStory
