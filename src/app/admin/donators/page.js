'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import { getDonations, updateDonator } from './action'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'

function DonatorsPage() {
  const [donatedPerson, setDonatedPerson] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const res = await getDonations()

      if (res.status === 'success') {
        setDonatedPerson(res.data)
      } else {
        console.error(res.message)
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  async function handleToggle(donatorId, currentStatus) {
    const confirmation = confirm('Are you sure you want to change the status?')

    if (confirmation) {
      const res = await updateDonator(donatorId, !currentStatus)

      if (res.status === 'success') {
        setDonatedPerson((prev) =>
          prev.map((donator) =>
            donator._id === donatorId
              ? { ...donator, isVerified: !currentStatus }
              : donator
          )
        )
      } else {
        console.error(res.message)
      }
    } else {
      return
    }
  }

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">
          Donated Persons
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>Create or Modify Donated Persons</TableCaption>
          <TableHeader className="border-2">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Mode</TableHead>
              <TableHead>Txn Id</TableHead>
              <TableHead>Is Verified</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Show 4 skeleton rows while loading
              Array.from({ length: 4 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16" />
                  </TableCell>
                </TableRow>
              ))
            ) : donatedPerson.length > 0 ? (
              donatedPerson.map((donator) => (
                <TableRow key={donator._id}>
                  <TableCell>{donator.name}</TableCell>
                  <TableCell>{donator.email}</TableCell>
                  <TableCell>{donator.phone}</TableCell>
                  <TableCell>{donator.amount}</TableCell>
                  <TableCell>{donator.paymentMode}</TableCell>
                  <TableCell>{donator.transactionId}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={donator.isVerified}
                      onCheckedChange={() =>
                        handleToggle(donator._id, donator.isVerified)
                      }
                      className="mr-2 cursor-pointer"
                    />
                    {donator.isVerified ? 'Verified' : 'Not Verified'}
                  </TableCell>
                  <TableCell>
                    {new Date(donator.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No Donated Persons found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DonatorsPage
