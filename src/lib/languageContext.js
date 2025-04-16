'use client'

import { createContext, useState, useEffect } from 'react'

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const storedLang = localStorage.getItem('language') || 'en'
    setLanguage(storedLang)
  }, [])

  // Function to update language and localStorage
  const changeLanguage = (lang) => {
    localStorage.setItem('language', lang)
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
