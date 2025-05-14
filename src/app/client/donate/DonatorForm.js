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

const UserDataForm = ({ handleFormSubmit }) => {
  return (
    <div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <Input
          className="dark:bg-primary-dark/20"
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <Input
          className="dark:bg-primary-dark/20"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <Input
          className="dark:bg-primary-dark/20"
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          required
        />
        <Input
          className="dark:bg-primary-dark/20"
          type="number"
          name="amount"
          placeholder="Amount Donated"
          required
        />
        <Input
          className="dark:bg-primary-dark/20"
          type="string"
          name="paymentMode"
          placeholder="Payment Mode"
          required
        />
        <Input
          className="dark:bg-primary-dark/20"
          type="text"
          name="transactionId"
          placeholder="Transacton Id"
          required
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  )
}

function DonationForm() {
  const { toast } = useToast()

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const amount = formData.get('amount')
    const paymentMode = formData.get('paymentMode')
    const transactionId = formData.get('transactionId')

    try {
      const res = await createDonation({
        name,
        email,
        phone,
        amount,
        paymentMode,
        transactionId,
      })
      if (res.status === 'success') {
        toast({
          title: 'Your Details Submitted Successfully',
          description: 'Your name will be displayed on Our website shortly.',
        })
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while submitting your details.',
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An error occurred while submitting your details.',
      })
    }
  }

  return (
    <>
      <div className="hidden dark:text-primary-base mb-8 w-full lg:flex items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <p className="text-lg py-1 cursor-pointer">
              *After donating, please fill up the form -{' '}
              <span className="cursor-pointer text-secondary-dark hover:scale-105 hover:text-accent-base hover:underline transition-all ease-in-out">
                Link
              </span>
            </p>
          </SheetTrigger>
          <SheetContent className="bg-primary-base dark:bg-secondary-dark dark:text-primary-base">
            <SheetHeader>
              <SheetTitle className="pb-12">Enter Your Details</SheetTitle>
              <SheetDescription>
                <UserDataForm handleFormSubmit={handleFormSubmit} />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="lg:hidden dark:text-primary-base mb-8 w-full flex items-center justify-center">
        <Sheet key={'bottom'}>
          <SheetTrigger className="border-2 border-secondary-dark dark:border-secondary-base p-4 rounded-lg ">
            Fill Up the Form
          </SheetTrigger>
          <SheetContent
            side={'bottom'}
            className="bg-primary-base dark:bg-secondary-dark dark:text-primary-base"
          >
            <SheetHeader>
              <SheetTitle className="pb-12">Enter Your Details</SheetTitle>
              <SheetDescription>
                <UserDataForm handleFormSubmit={handleFormSubmit} />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

export default DonationForm
