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
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { deletePress, getPress } from '@/app/admin/press/actions'
import PressForm from '@/app/admin/press/PressForm'

function PressPage() {
  const [press, setPress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPress()
  }, [])

  const fetchPress = async () => {
    setLoading(true)
    const res = await getPress()
    if (res.status === 'success') {
      setPress(res.data)
    } else {
      console.error('Error fetching press:', res.message)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    const con = confirm('Are you sure you want to delete this press item?')
    if (!con) return

    const res = await deletePress(id)
    if (res.status === 'success') {
      toast({
        title: 'Deleted successfully',
        description: 'Press item has been deleted successfully.',
      })
      fetchPress()
    } else {
      toast({ title: 'Delete failed', variant: 'destructive' })
    }
  }

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Press</div>
        <div>
          <PressForm onPressAdded={fetchPress} />
        </div>
      </div>

      <Table>
        <TableCaption>Manage Press Items</TableCaption>
        <TableHeader className="border-2">
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-12 w-16 rounded" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-6" />
                </TableCell>
              </TableRow>
            ))
          ) : press.length > 0 ? (
            press.map((item) => (
              <TableRow key={item._id} className="hover:bg-secondary-dark/10">
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.source || 'N/A'}</TableCell>
                <TableCell>
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="h-12 w-auto rounded"
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-base hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No press items found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default PressPage
