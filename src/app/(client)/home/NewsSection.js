'use client'

import { useContext } from 'react'
import { LanguageContext } from '@/lib/languageContext'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createNewsletterSubscriber } from '@/app/admin/newsletterSubscribers/action'
import { toast } from '@/hooks/use-toast'

const NewsSection = () => {
  const { language } = useContext(LanguageContext)

  async function handleSubmit(formData) {
    const res = await createNewsletterSubscriber(formData)

    if (res.status === 'success') {
      toast({
        title: language === 'hi' ? 'सफलता' : 'Success',
        description:
          language === 'hi'
            ? 'आपका ईमेल सफलतापूर्वक सब्सक्राइब किया गया है।'
            : 'Your email has been successfully subscribed.',
        variant: 'default',
      })
    } else {
      toast({
        title: language === 'hi' ? 'त्रुटि' : 'Error',
        description:
          language === 'hi'
            ? 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।'
            : 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="bg-primary-base py-16 px-4 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-secondary-dark">
          {/* Left Banner Section */}
          <div className="bg-accent-base md:w-1/3 flex items-center justify-center p-8 text-center relative">
            <div className="z-10 text-primary-base transform skew-x-[-6deg]">
              <h2 className="text-2xl md:text-3xl font-bold leading-snug">
                {language === 'hi'
                  ? 'न्यूज़लेटर सब्सक्राइब करें'
                  : 'Subscribe to our Newsletter'}
              </h2>
            </div>
            <div className="absolute inset-0 bg-accent-dark opacity-10 skew-x-[-6deg] z-0" />
          </div>

          {/* Right Form Section */}
          <div className="md:w-2/3 p-8 bg-white">
            <p className="text-secondary-dark/80 mb-4 text-sm md:text-base">
              {language === 'hi'
                ? 'ताज़ा खबरें और अपडेट पाने के लिए अपना ईमेल दर्ज करें।'
                : 'Enter your email to receive the latest news and updates.'}
            </p>

            <form
              className="flex flex-col sm:flex-row gap-4"
              action={async (formData) => handleSubmit(formData)}
            >
              <Input
                type="email"
                name="email"
                placeholder={
                  language === 'hi' ? 'ईमेल दर्ज करें' : 'Enter your email'
                }
                className="flex-1 border border-primary-dark/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent-base transition"
              />
              <Button
                type="submit"
                className="bg-accent-base text-primary-base font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-accent-dark transition"
              >
                {language === 'hi' ? 'सब्सक्राइब करें' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsSection
