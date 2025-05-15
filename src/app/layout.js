import { AnimatePresence } from 'framer-motion'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import { LanguageProvider } from '@/lib/languageContext'
import TopLoadingBar from '@/components/TopLoadingBar'

export const metadata = {
  title: 'Dr. Ambedkar Abhibhavak Samiti',
  description: 'NGO',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-primary-base text-primary-dark dark:bg-primary-dark dark:text-primary-base">
        <AnimatePresence mode="wait">
          <LanguageProvider>
            <TopLoadingBar />
            {children}
            <Toaster />
          </LanguageProvider>
        </AnimatePresence>
      </body>
    </html>
  )
}
