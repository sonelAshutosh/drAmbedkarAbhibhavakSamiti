'use client'

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

function Latest({ language = 'en' }) {
  const items = newsItems[language] || newsItems.en

  return (
    <section
      id="latest-news"
      className="my-10 py-14 text-center px-4 lg:px-20 bg-secondary-dark text-primary-base"
    >
      <h2 className="text-3xl font-bold mb-8 ">
        {language === 'hi'
          ? 'ताज़ा समाचार और घोषणाएं'
          : 'Latest News and Announcements'}
      </h2>
      <div className="w-full md:w-4/5 mx-auto relative"></div>
    </section>
  )
}

export default Latest
