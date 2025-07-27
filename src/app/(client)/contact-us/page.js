'use client'

import React, { useContext } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { createContactedPerson } from '@/app/admin/contactedPerson/action'
import { toast } from '@/hooks/use-toast'
import { LanguageContext } from '@/lib/languageContext.js'

function ContactUsPage() {
  const { language } = useContext(LanguageContext)

  const translations = {
    en: {
      title: 'Contact Us',
      heading: 'Get in Touch',
      subtitle1: 'Have questions or want to work together?',
      subtitle2: "We'd love to hear from you.",
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Your Message',
      buttonText: 'Send Message',
      successTitle: 'Sent Successfully!',
      successDesc: 'We will get back to you soon!',
      errorTitle: 'Error!',
      errorDesc: 'Failed to send message. Please try again.',
    },
    hi: {
      title: 'संपर्क करें',
      heading: 'संपर्क में रहें',
      subtitle1: 'कोई प्रश्न है या साथ काम करना चाहते हैं?',
      subtitle2: 'हम आपसे सुनना चाहेंगे।',
      namePlaceholder: 'आपका नाम',
      emailPlaceholder: 'आपका ईमेल',
      subjectPlaceholder: 'विषय',
      messagePlaceholder: 'आपका संदेश',
      buttonText: 'संदेश भेजें',
      successTitle: 'सफलतापूर्वक भेजा गया!',
      successDesc: 'हम जल्द ही आपसे संपर्क करेंगे!',
      errorTitle: 'त्रुटि!',
      errorDesc: 'संदेश भेजने में विफल। कृपया पुनः प्रयास करें।',
    },
  }

  const t = translations[language]

  const handleSubmit = async (formData) => {
    const result = await createContactedPerson(formData)

    if (result.status === 'success') {
      toast({
        title: t.successTitle,
        description: t.successDesc,
        status: 'success',
      })
    } else {
      toast({
        title: t.errorTitle,
        description: t.errorDesc,
        status: 'error',
      })
    }
  }

  return (
    <div className="relative">
      {/* Parallax Section */}
      <div className="relative h-screen bg-fixed bg-cover bg-center bg-[url('/images/contact_us.jpg')] flex items-center justify-center before:absolute before:inset-0 before:bg-sidebar-primary before:opacity-80">
        <h1 className="relative z-10 text-5xl font-bold text-sidebar-primary-foreground drop-shadow-lg">
          {t.title}
        </h1>
      </div>

      {/* Contact Form and Map Section */}
      <div className="bg-primary-base py-20 px-8 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
          {/* Contact Form */}
          <div className="border-2 border-secondary-dark rounded-lg p-4">
            <h2 className="text-4xl font-semibold mb-8 text-primary-dark">
              {t.heading}
            </h2>
            <p className="text-lg text-secondary-dark/80 leading-relaxed">
              {t.subtitle1}
            </p>
            <p className="text-primary-dark">{t.subtitle2}</p>
            <form
              className="space-y-6 mt-12"
              action={async (formData) => handleSubmit(formData)}
            >
              <Input
                type="text"
                name="name"
                placeholder={t.namePlaceholder}
                className="w-full"
              />
              <Input
                type="email"
                name="email"
                placeholder={t.emailPlaceholder}
                className="w-full"
              />
              <Input
                type="text"
                name="subject"
                placeholder={t.subjectPlaceholder}
                className="w-full"
              />
              <Textarea
                name="message"
                placeholder={t.messagePlaceholder}
                rows="5"
                className="w-full"
              />
              <Button
                type="submit"
                className="w-full bg-secondary-dark text-white py-4 rounded-lg font-semibold hover:bg-secondary-dark/80 transition"
              >
                {t.buttonText}
              </Button>
            </form>
          </div>

          {/* Google Maps */}
          <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114487.35583264142!2d72.87465281278975!3d26.27042918242841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c4eaa06ccb9%3A0x8114ea5b0ae1abb8!2sJodhpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1747732192715!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
