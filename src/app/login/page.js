'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Logging in with:', { email, password })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-base dark:bg-primary-dark px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm border border-gray-200 shadow-lg dark:border-gray-700">
        <CardHeader className="flex flex-col items-center">
          {/* // TODO Add Logo Image */}
          {/* <img src="/logo-placeholder.png" alt="Organization Logo" className="h-16 w-16 mb-2" /> */}
          <CardTitle className="text-center text-primary-dark dark:text-primary-base">
            Dr. Ambedkar Abhibhavak Samiti
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {/* Empowering Education */}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="text-primary-dark dark:text-primary-base"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-primary-dark dark:text-primary-base"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-accent-base text-primary-base dark:text-primary-dark hover:bg-green-700"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
