'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { createContactedPerson } from '@/app/admin/contactedPerson/action'
import { toast } from '@/hooks/use-toast'

function ContactUsPage() {
  const handleSubmit = async (formData) => {
    const result = await createContactedPerson(formData)

    if (result.status === 'success') {
      toast({
        title: 'Sent Successfully!',
        description: 'We will get back to you soon!',
        status: 'success',
      })
    } else {
      toast({
        title: 'Error!',
        description: 'Failed to send message. Please try again.',
        status: 'error',
      })
    }
  }

  return (
    <div className="relative">
      {/* Parallax Section */}
      <div className="relative h-screen bg-fixed bg-cover bg-center bg-[url('/images/contact_us.jpg')] flex items-center justify-center before:absolute before:inset-0 before:bg-sidebar-primary before:opacity-80">
        <h1 className="relative z-10 text-5xl font-bold text-sidebar-primary-foreground drop-shadow-lg">
          Contact Us
        </h1>
      </div>

      {/* Contact Form and Map Section */}
      <div className="bg-primary-base py-20 px-8 lg:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
          {/* Contact Form */}
          <div className="border-2 border-secondary-dark rounded-lg p-4">
            <h2 className="text-4xl font-semibold mb-8 text-primary-dark">
              Get in Touch
            </h2>
            <p className="text-lg text-secondary-dark/80 leading-relaxed">
              Have questions or want to work together?
            </p>
            <p className="text-primary-dark">We'd love to hear from you.</p>
            <form
              className="space-y-6 mt-12"
              action={async (formData) => handleSubmit(formData)}
            >
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full"
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full"
              />
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full"
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                className="w-full"
              />
              <Button
                type="submit"
                className="w-full bg-secondary-dark text-white py-4 rounded-lg font-semibold hover:bg-secondary-dark/80 transition"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Google Maps */}
          <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450937!2d144.95373631531894!3d-37.81627917975179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce840!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1632872342124!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
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
