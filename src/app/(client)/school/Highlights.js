'use client'

import React from 'react'
import Image from 'next/image'
import {
  Landmark,
  Home,
  Users,
  UserRound,
  Handshake,
  Building,
} from 'lucide-react'

const highlightsData = {
  en: [
    {
      icon: Landmark,
      title: 'Government Affiliated',
      desc: 'Proudly upholding the standards of government education for quality and trust.',
      bgColor: 'bg-blue-500/75',
    },
    {
      icon: Home,
      title: 'Residential Campus',
      desc: 'A nurturing home for students, fostering independence and community.',
      bgColor: 'bg-green-600/75',
    },
    {
      icon: Users,
      title: 'Inclusive Education',
      desc: 'Committed to providing equal opportunities for all, regardless of background.',
      bgColor: 'bg-rose-500/75',
    },
    {
      icon: UserRound,
      title: 'Holistic Development',
      desc: 'Focusing on academic, physical, and emotional growth for well-rounded individuals.',
      bgColor: 'bg-fuchsia-600/75',
    },
    {
      icon: Handshake,
      title: 'Community Engagement',
      desc: 'Building strong ties with families and the local community for a supportive network.',
      bgColor: 'bg-yellow-600/75',
    },
    {
      icon: Building,
      title: 'Modern Facilities',
      desc: 'Equipped with state-of-the-art amenities to enhance learning experiences.',
      bgColor: 'bg-indigo-600/75',
    },
  ],
  hi: [
    {
      icon: Landmark,
      title: 'सरकारी मान्यता प्राप्त',
      desc: 'गुणवत्ता और भरोसे के लिए सरकारी शिक्षा मानकों का पालन करते हुए।',
      bgColor: 'bg-blue-500/75',
    },
    {
      icon: Home,
      title: 'आवासीय परिसर',
      desc: 'छात्रों के लिए एक पोषक घर, जो स्वतंत्रता और समुदाय की भावना को बढ़ावा देता है।',
      bgColor: 'bg-green-600/75',
    },
    {
      icon: Users,
      title: 'समावेशी शिक्षा',
      desc: 'पृष्ठभूमि की परवाह किए बिना सभी के लिए समान अवसर प्रदान करने के लिए प्रतिबद्ध।',
      bgColor: 'bg-rose-500/75',
    },
    {
      icon: UserRound,
      title: 'समग्र विकास',
      desc: 'शैक्षणिक, शारीरिक और भावनात्मक विकास पर ध्यान केंद्रित करना।',
      bgColor: 'bg-fuchsia-600/75',
    },
    {
      icon: Handshake,
      title: 'समुदाय सहभागिता',
      desc: 'परिवारों और स्थानीय समुदाय के साथ मजबूत संबंध बनाना।',
      bgColor: 'bg-yellow-600/75',
    },
    {
      icon: Building,
      title: 'आधुनिक सुविधाएं',
      desc: 'सीखने के अनुभव को बढ़ाने के लिए अत्याधुनिक सुविधाओं से युक्त।',
      bgColor: 'bg-indigo-600/75',
    },
  ],
}

function Highlights({ language }) {
  const highlights = highlightsData[language || 'en']

  return (
    <section className="py-12 px-4 lg:px-20 text-secondary-dark">
      <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-center">
        {language === 'hi' ? 'विद्यालय की विशेषताएं' : 'School Highlights'}
      </h3>
      <p className="text-base lg:text-lg text-secondary-dark/75 font-semibold max-w-3xl mx-auto mb-10 text-center">
        {language === 'hi'
          ? 'डॉ. भीमराव अंबेडकर राजकीय आवासीय उच्च माध्यमिक विद्यालय में हम उत्कृष्ट शैक्षिक अनुभव प्रदान करने के लिए समर्पित हैं। हमारी विशिष्टताएं हमें अलग बनाती हैं:'
          : 'At Dr. Bhimrao Ambedkar Rajkiya Avasiya Uchch Madhyamik Vidyalaya, we are dedicated to providing an exceptional educational experience. Here are some of the key features that make us unique:'}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights?.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary-dark cursor-pointer transform hover:scale-105 text-secondary-dark ${item.bgColor}`}
          >
            <div className="flex items-center gap-4">
              {item.icon && (
                <div className="w-12 h-12 flex items-center justify-center border border-secondary-dark/80 rounded-full shrink-0">
                  <item.icon size={24} className="text-secondary-dark" />
                </div>
              )}
              <div>
                <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Highlights
