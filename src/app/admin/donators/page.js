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

function DonatorsPage() {
  const [donatedPerson, setDonatedPerson] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await getDonations()

      if (res.status === 'success') {
        setDonatedPerson(res.data)
      } else {
        console.error(res.message)
      }
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
            {donatedPerson.length > 0 ? (
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
                <TableCell colSpan="8" className="text-center">
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
