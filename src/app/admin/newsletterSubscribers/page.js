'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Download, Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { deleteNewsletterSubscriber, getNewsletterSubscribers } from './action'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import * as XLSX from 'xlsx'

function NewsLetterSubscribersPage() {
  const [subscribers, setSubscribers] = useState([])

  useEffect(() => {
    const fetchNewsletterSubscribers = async () => {
      try {
        const result = await getNewsletterSubscribers()
        if (result.status === 'success') {
          setSubscribers(result.data)
        } else {
          toast({
            title: 'Error',
            description: result.message,
            variant: 'destructive',
          })
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch newsletter subscribers.',
          variant: 'destructive',
        })
      }
    }

    fetchNewsletterSubscribers()
  }, [])

  const handleDelete = async (id) => {
    const result = await deleteNewsletterSubscriber(id)

    if (result.status === 'success') {
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter((subscriber) => subscriber._id !== id)
      )
      toast({
        title: 'Success',
        description: 'Subscriber deleted successfully.',
      })
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      })
    }
  }

  const handleDataDownload = async () => {
    if (!subscribers.length) {
      toast({ title: 'No subscribers to download.', variant: 'destructive' })
      return
    }

    const data = subscribers.map((s) => ({ Email: s.email }))

    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscribers')

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

    const blob = new Blob([wbout], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscribers.xlsx'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Subscribers</div>
        <div onClick={handleDataDownload}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Download />
              </TooltipTrigger>
              <TooltipContent>
                <p>Download as Excel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>Delete Newsletter Subscribers</TableCaption>
          <TableHeader className="border-2">
            <TableRow>
              <TableHead>E-mail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.length > 0 ? (
              subscribers.map((subscriber) => (
                <TableRow key={subscriber._id}>
                  <TableCell>{subscriber.email}</TableCell>
                  <TableCell>
                    <button onClick={() => handleDelete(subscriber._id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="7" className="text-center">
                  No Subscribers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default NewsLetterSubscribersPage
