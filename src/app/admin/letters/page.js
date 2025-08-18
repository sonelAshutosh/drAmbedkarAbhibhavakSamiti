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
import { deleteLetter, getLetters } from '@/app/admin/letters/actions'
import LetterForm from '@/app/admin/letters/LetterForm'

function LettersPage() {
  const [letters, setLetters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLetters()
  }, [])

  const fetchLetters = async () => {
    setLoading(true)
    const res = await getLetters()
    if (res.status === 'success') {
      setLetters(res.data)
    } else {
      console.error('Error fetching letters:', res.message)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    const con = confirm('Are you sure you want to delete this letter?')
    if (!con) return

    const res = await deleteLetter(id)
    if (res.status === 'success') {
      toast({
        title: 'Deleted successfully',
        description: 'Letter has been deleted successfully.',
      })
      fetchLetters()
    } else {
      toast({ title: 'Delete failed', variant: 'destructive' })
    }
  }

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Letters</div>
        <div>
          <LetterForm onLetterAdded={fetchLetters} />
        </div>
      </div>

      <Table>
        <TableCaption>Manage Letters</TableCaption>
        <TableHeader className="border-2">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Send To</TableHead>
            <TableHead>Image</TableHead>
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
                  <Skeleton className="h-4 w-6" />
                </TableCell>
              </TableRow>
            ))
          ) : letters.length > 0 ? (
            letters.map((letter) => (
              <TableRow key={letter._id} className="hover:bg-secondary-dark/10">
                <TableCell>{letter.name}</TableCell>
                <TableCell>{letter.sendTo}</TableCell>
                <TableCell>
                  <Image
                    src={letter.image}
                    alt={letter.name}
                    className="h-12 w-auto rounded"
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>
                  {new Date(letter.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(letter._id)}
                  >
                    <Trash2 />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No letters found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default LettersPage
