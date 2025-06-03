'use client'

import React, { useEffect, useState } from 'react'
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
import { Skeleton } from '@/components/ui/skeleton'

function NewsLetterSubscribersPage() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)

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
      } finally {
        setLoading(false)
      }
    }

    fetchNewsletterSubscribers()
  }, [])

  const handleDelete = async (id) => {
    const result = await deleteNewsletterSubscriber(id)

    if (result.status === 'success') {
      setSubscribers((prev) => prev.filter((s) => s._id !== id))
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

  const handleDataDownload = () => {
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
        <div onClick={handleDataDownload} className="cursor-pointer">
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

      <Table>
        <TableCaption>Delete Newsletter Subscribers</TableCaption>
        <TableHeader className="border-2">
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Skeleton className="h-4 w-64" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-6" />
                </TableCell>
              </TableRow>
            ))
          ) : subscribers.length > 0 ? (
            subscribers.map((subscriber) => (
              <TableRow key={subscriber._id}>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(subscriber._id)}>
                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center text-gray-500">
                No subscribers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default NewsLetterSubscribersPage
