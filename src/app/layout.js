import { AnimatePresence } from 'framer-motion'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { LanguageProvider } from '@/lib/languageContext'
import TopLoadingBar from '@/components/TopLoadingBar'
import { Suspense } from 'react'

export const metadata = {
  title: 'Dr. Ambedkar Abhibhavak Samiti',
  description: 'NGO',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="NosJ4uchaJsRC11izYWY7qRXxzNCtPEwFZjEcAjWch0"
        />
      </head>
      <body className="antialiased bg-primary-base text-primary-dark dark:bg-primary-dark dark:text-primary-base">
        <AnimatePresence mode="wait">
          <LanguageProvider>
            <Suspense fallback={<div />}>
              <TopLoadingBar />
            </Suspense>
            {children}
            <Toaster />
          </LanguageProvider>
        </AnimatePresence>
      </body>
    </html>
  )
}
