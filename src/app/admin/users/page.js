'use client'

import { PlusCircle, UserRoundX } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'

import React, { useEffect, useState } from 'react'
import { deleteUser, getUsers, signup } from './action'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true)
      const data = await getUsers()
      setUsers(data.users)
      setLoading(false)
    }

    fetchUsers()
  }, [])

  const handleSubmit = async (formData) => {
    const result = await signup(formData)

    if (result.status === 'error') {
      setError(result.message)
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Success',
        description: 'User created successfully',
      })
    }
  }

  const handleDelete = async (email) => {
    if (confirm('Delete user with email: ' + email) != true) return

    const result = await deleteUser(email)

    if (result.status === 'error') {
      setError(result.message)
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      })
    }
  }

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Users</div>
        <div>
          <Sheet>
            <SheetTrigger>
              <PlusCircle />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create new User?</SheetTitle>
                <SheetDescription className="pt-8">
                  <form
                    action={async (formData) => handleSubmit(formData)}
                    className="space-y-8"
                  >
                    <div>
                      <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                        User Name
                      </Label>
                      <input
                        type="text"
                        name="name"
                        className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                        required
                      />
                    </div>
                    <div>
                      <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                        Email
                      </Label>
                      <input
                        type="email"
                        name="email"
                        className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                        required
                      />
                    </div>
                    <div>
                      <Label className="block text-sm text-primary-dark dark:text-primary-base mb-2">
                        Password
                      </Label>
                      <input
                        type="password"
                        name="password"
                        className="w-full rounded-md border p-2 text-primary-dark focus:border-secondary-dark focus:ring-secondary-dark"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-md bg-secondary-dark p-2 text-white "
                    >
                      Create User
                    </Button>
                  </form>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div>
        <Table>
          <TableCaption>Create or Modify User access</TableCaption>
          <TableHeader className="border-2">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-2">
            {loading
              ? // Render 3 skeleton rows while loading
                Array.from({ length: 3 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-48" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-8" />
                    </TableCell>
                  </TableRow>
                ))
              : users?.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    {user.email === 'su@gmail.com' ? (
                      <TableCell></TableCell>
                    ) : (
                      <TableCell onClick={() => handleDelete(user.email)}>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <UserRoundX />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove User</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UsersPage
