'use client'

import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'

const newsItems = {
  en: [
    {
      title: 'Event: Annual Sports Day',
      description:
        'Join us on June 10, 2025, for our Annual Sports Day. Students will compete in various sports, showcasing their talents.',
    },
    {
      title: 'Achievement: Science Olympiad Winners',
      description:
        'Our students excelled at the National Science Olympiad! Discover their journey to victory.',
    },
    {
      title: 'Notice: School Holiday',
      description:
        'The school will be closed on January 26, 2025, for Republic Day. Classes resume on January 27.',
    },
  ],
  hi: [
    {
      title: 'कार्यक्रम: वार्षिक खेल दिवस',
      description:
        '10 जून 2025 को वार्षिक खेल दिवस मनाएं। छात्र विभिन्न खेलों में भाग लेंगे और अपनी प्रतिभा दिखाएंगे।',
    },
    {
      title: 'उपलब्धि: साइंस ओलंपियाड विजेता',
      description:
        'हमारे छात्रों ने नेशनल साइंस ओलंपियाड में उत्कृष्ट प्रदर्शन किया! उनकी सफलता की कहानी जानें।',
    },
    {
      title: 'सूचना: स्कूल अवकाश',
      description:
        '26 जनवरी 2025 को गणतंत्र दिवस के अवसर पर स्कूल बंद रहेगा। 27 जनवरी को कक्षाएं पुनः आरंभ होंगी।',
    },
  ],
}
const plugin = Autoplay({ delay: 3000 })

function Latest({ language = 'en' }) {
  const items = newsItems[language] || newsItems.en

  return (
    <section
      id="latest-news"
      className=" py-14 text-center px-4 lg:px-20 bg-secondary-dark text-primary-base"
      lang={language}
    >
      <h2 className="text-3xl font-bold mb-8 ">
        {language === 'hi'
          ? 'ताज़ा समाचार और घोषणाएं'
          : 'Latest News and Announcements'}
      </h2>

      <Carousel
        plugins={[plugin]}
        opts={{
          loop: true,
        }}
        className="w-full max-w-3xl mx-auto"
      >
        <CarouselContent>
          {items.map(({ title, description }, index) => (
            <CarouselItem key={index}>
              <div className="p-2">
                <div className="rounded-xl p-[4px] bg-gradient-to-r from-accent-base via-secondary-base to-accent-base border border-secondary-dark">
                  <Card className="relative bg-primary-base text-secondary-dark rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-dark/40 via-transparent to-secondary-dark/10 pointer-events-none rounded-lg border border-secondary-dark/50" />
                    <CardContent className="relative flex flex-col items-center justify-center p-6 space-y-4 min-h-[200px] text-center">
                      <h3 className="text-xl font-semibold">{title}</h3>
                      <p className="text-sm">{description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div>
        <Link href={'/client/school/news-and-announcement'}>
          <div className="text-accent-base text-right font-semibold cursor-pointer mt-8 hover:underline hover:text-accent-base/80 transition">
            {language === 'hi' ? 'सभी देखें' : 'See All'}
          </div>
        </Link>
      </div>
    </section>
  )
}

export default Latest
