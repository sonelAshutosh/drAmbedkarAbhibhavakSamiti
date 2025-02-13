'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'

import { login } from './actions'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (formData) => {
    const result = await login(formData)

    if (result.status === 'error') {
      setError(result.message)
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    } else {
      const { user, accessToken } = result

      document.cookie = `accessToken=${accessToken}; path=/; Secure; SameSite=None`
      document.cookie = `userId=${user.id}; path=/; Secure; SameSite=None`

      toast({
        title: 'Success',
        message: 'Login successful',
        type: 'success',
      })

      router.push('/admin')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-base dark:bg-primary-dark px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm border border-primary-dark shadow-lg dark:border-primary-base">
        <CardHeader className="flex flex-col items-center">
          {/* // TODO Add Logo Image */}
          {/* <img src="/logo-placeholder.png" alt="Organization Logo" className="h-16 w-16 mb-2" /> */}
          <CardTitle className="text-center text-primary-dark dark:text-primary-base">
            Dr. Ambedkar Abhibhavak Samiti
          </CardTitle>
          <p className="text-sm text-primary-dark/50 dark:text-primary-base/50 font-semibold tracking-wide">
            Admin Login
          </p>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => handleSubmit(formData)}
            className="space-y-4"
          >
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
                name="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-primary-dark dark:border-primary-base"
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
                name="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-primary-dark dark:border-primary-base"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
