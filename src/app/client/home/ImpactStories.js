'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { LanguageContext } from '@/lib/languageContext'
import { Skeleton } from '@/components/ui/skeleton'
import {
  addTestimonial,
  getLatestTwoTestimonials,
} from '@/app/admin/testimonials/action'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import imageCompression from 'browser-image-compression'
import convertToBase64 from '@/lib/convertToBase64'
import { toast } from '@/hooks/use-toast'
import { Quote } from 'lucide-react'

const ImpactStories = () => {
  const { language } = useContext(LanguageContext)
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [base64Image, setBase64Image] = useState('')
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      })

      const base64 = await convertToBase64(compressedFile)
      setImagePreview(URL.createObjectURL(compressedFile))
      setBase64Image(base64)
    } else {
      setImagePreview(null)
      setBase64Image(null)
    }
  }

  const handleSubmit = async (formData) => {
    formData.set('image', base64Image)

    const res = await addTestimonial(formData)

    if (res.status === 'success') {
      toast({
        title: 'Success',
        description: 'Testimonial added successfully',
      })
    } else {
      toast({
        title: 'Error',
        description: res.message,
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await getLatestTwoTestimonials()

        if (res.status === 'success') {
          setStories(res.data)
        }
      } catch (err) {
        console.error('Failed to fetch testimonials:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <div className="  py-6 px-4 lg:px-20 bg-secondary-dark">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-accent-base text-2xl font-bold flex items-center gap-2">
          {language === 'hi' ? 'प्रभाव कहानियाँ' : 'Impact Stories'}
        </h2>
        <Link
          href="/client/testimonials"
          className="text-accent-base text-sm hover:underline"
        >
          {language === 'hi' ? 'सभी देखें' : 'View All'}
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {loading
          ? Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="bg-secondary-base/20 p-4 rounded-xl shadow-md max-w-sm w-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))
          : stories?.map((story, index) => (
              <Link
                key={index}
                href={`/client/testimonials/${story._id}`}
                className="relative bg-gradient-to-br from-primary-base via-accent-base to-primary-dark p-[2px] rounded-xl max-w-sm w-full transition hover:scale-[1.01] hover:shadow-xl"
              >
                <div className="bg-secondary-dark/80 rounded-xl p-5 flex flex-col gap-4 h-full">
                  <div className="flex gap-4 items-center">
                    {story.profileImage === '' ? (
                      <div className="w-16 h-16 flex items-center justify-center rounded-full border border-secondary-dark bg-primary-base">
                        <Quote className="w-6 h-6 text-accent-base" />
                      </div>
                    ) : (
                      <Image
                        src={story.profileImage}
                        alt={story.name}
                        width={125}
                        height={125}
                        className="rounded-full object-cover aspect-square border border-secondary-dark"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-primary-base font-semibold line-clamp-2">
                        {story.message}
                      </p>
                      <p className="text-sm text-primary-base/60 italic mt-1">
                        — {story.name}
                      </p>
                    </div>
                  </div>
                  {/* <p className="text-accent-base/90 text-sm italic border-t border-secondary-base pt-3">
                    {story[`quote_${language}`] || story.message}
                  </p> */}
                </div>
              </Link>
            ))}
      </div>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <div className="text-accent-base text-right font-semibold cursor-pointer mt-8 hover:underline hover:text-accent-base/80 transition">
              {language === 'hi'
                ? 'अपना अनुभव साझा करें'
                : 'Share Your Experience'}
            </div>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {language === 'hi'
                  ? 'अनुभव साझा करें'
                  : 'Share Your Experience'}
              </SheetTitle>
              <SheetDescription>
                {language === 'hi'
                  ? 'आपका अनुभव हमारे लिए मूल्यवान है। कृपया नीचे विवरण भरें।'
                  : 'Your experience matters. Please fill in the details below.'}
              </SheetDescription>
            </SheetHeader>

            <form
              className="mt-4 flex flex-col gap-4"
              action={async (formData) => handleSubmit(formData)}
            >
              <div>
                <Input
                  type="text"
                  name="name"
                  required
                  className="w-full p-2 rounded-md border"
                  placeholder={
                    language === 'hi' ? 'अपना नाम दर्ज करें' : 'Enter your name'
                  }
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  rows={4}
                  maxLength={1000}
                  required
                  className="w-full p-2 rounded-md border"
                  placeholder={
                    language === 'hi'
                      ? 'यहाँ अपना अनुभव लिखें...'
                      : 'Write your experience here...'
                  }
                />
              </div>

              <div>
                <select
                  name="rating"
                  defaultValue={5}
                  className="w-full p-2 rounded-md border"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num} ⭐
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="block mb-1 font-medium">
                  {language === 'hi' ? 'प्रोफ़ाइल छवि' : 'Profile Image'}
                  <span> (optional) </span>
                </Label>
                <Input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 rounded-md border"
                />
              </div>

              <div className="w-24 h-24 rounded-md overflow-hidden border">
                <Image
                  src={imagePreview || '/images/dummy_image.jpg'}
                  alt="Profile Preview"
                  width={150}
                  height={150}
                  className="object-cover w-full h-full"
                />
              </div>

              <Button type="submit" className="mt-2 self-end">
                {language === 'hi' ? 'प्रस्तुत करें' : 'Submit'}
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default ImpactStories
