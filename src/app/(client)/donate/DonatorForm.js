'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast'
import { createDonation } from '@/app/admin/donators/action'
import { useContext } from 'react'
import { LanguageContext } from '@/lib/languageContext.js'

const translations = {
  en: {
    name: 'Name',
    email: 'Email',
    phone: 'Mobile Number',
    amount: 'Amount Donated',
    paymentMode: 'Payment Mode',
    transactionId: 'Transaction ID',
    submit: 'Submit',
    formPrompt: '*After donating, please fill up the form -',
    link: 'Link',
    enterDetails: 'Enter Your Details',
    successTitle: 'Your Details Submitted Successfully',
    successDesc: 'Your name will be displayed on our website shortly.',
    errorTitle: 'Error',
    errorDesc: 'An error occurred while submitting your details.',
    fillForm: 'Fill Up the Form',
  },
  hi: {
    name: 'नाम',
    email: 'ईमेल',
    phone: 'मोबाइल नंबर',
    amount: 'दान राशि',
    paymentMode: 'भुगतान का तरीका',
    transactionId: 'लेनदेन आईडी',
    submit: 'जमा करें',
    formPrompt: '*दान करने के बाद कृपया फॉर्म भरें -',
    link: 'लिंक',
    enterDetails: 'अपना विवरण दर्ज करें',
    successTitle: 'आपका विवरण सफलतापूर्वक सबमिट हुआ',
    successDesc: 'आपका नाम जल्द ही हमारी वेबसाइट पर प्रदर्शित होगा।',
    errorTitle: 'त्रुटि',
    errorDesc: 'विवरण सबमिट करते समय कोई त्रुटि हुई।',
    fillForm: 'फॉर्म भरें',
  },
}

const UserDataForm = ({ handleFormSubmit, language, translations }) => {
  const t = translations[language]
  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
      <Input name="name" placeholder={t.name} required />
      <Input name="email" type="email" placeholder={t.email} required />
      <Input name="phone" type="tel" placeholder={t.phone} required />
      <Input name="amount" type="number" placeholder={t.amount} required />
      <Input name="paymentMode" placeholder={t.paymentMode} required />
      <Input name="transactionId" placeholder={t.transactionId} required />
      <Button type="submit" className="w-full">
        {t.submit}
      </Button>
    </form>
  )
}

function DonationForm() {
  const { language } = useContext(LanguageContext)
  const { toast } = useToast()
  const t = translations[language]

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    try {
      const res = await createDonation(Object.fromEntries(formData.entries()))
      if (res.status === 'success') {
        toast({ title: t.successTitle, description: t.successDesc })
      } else {
        toast({ title: t.errorTitle, description: t.errorDesc })
      }
    } catch {
      toast({ title: t.errorTitle, description: t.errorDesc })
    }
  }

  return (
    <>
      <div className="hidden dark:text-primary-base mb-8 w-full lg:flex items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <p className="text-lg py-1 cursor-pointer">
              {t.formPrompt}{' '}
              <span className="cursor-pointer text-secondary-dark hover:scale-105 hover:text-accent-base hover:underline transition-all ease-in-out">
                {t.link}
              </span>
            </p>
          </SheetTrigger>
          <SheetContent className="bg-primary-base dark:bg-secondary-dark dark:text-primary-base">
            <SheetHeader>
              <SheetTitle className="pb-12">{t.enterDetails}</SheetTitle>
              <SheetDescription>
                <UserDataForm
                  handleFormSubmit={handleFormSubmit}
                  language={language}
                  translations={translations}
                />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="lg:hidden dark:text-primary-base mb-8 w-full flex items-center justify-center">
        <Sheet>
          <SheetTrigger className="border-2 border-secondary-dark dark:border-secondary-base p-4 rounded-lg ">
            {t.fillForm}
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="bg-primary-base dark:bg-secondary-dark dark:text-primary-base"
          >
            <SheetHeader>
              <SheetTitle className="pb-12">{t.enterDetails}</SheetTitle>
              <SheetDescription>
                <UserDataForm
                  handleFormSubmit={handleFormSubmit}
                  language={language}
                  translations={translations}
                />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export default DonationForm
