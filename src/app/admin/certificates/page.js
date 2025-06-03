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
import { deleteCertificate, getCertificates } from './action'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import CertificateForm from './CertificateForm'
import { Skeleton } from '@/components/ui/skeleton'

function CertificatesPage() {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    setLoading(true)
    const res = await getCertificates()
    if (res.status === 'success') {
      setCertificates(res.data)
    } else {
      console.error('Error fetching certificates:', res.message)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    const con = confirm('Are you sure you want to delete this certificate?')
    if (!con) return

    const res = await deleteCertificate(id)
    if (res.status === 'success') {
      toast({
        title: 'Deleted successfully',
        description: 'Certificate has been deleted successfully.',
      })
      fetchCertificates()
    } else {
      toast({ title: 'Delete failed', variant: 'destructive' })
    }
  }

  return (
    <div className="py-4 px-4 lg:px-20">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Certificates</div>
        <div>
          <CertificateForm onCertificateAdded={fetchCertificates} />
        </div>
      </div>

      <Table>
        <TableCaption>Manage Certificates</TableCaption>
        <TableHeader className="border-2">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Issued By</TableHead>
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
          ) : certificates.length > 0 ? (
            certificates.map((cert) => (
              <TableRow key={cert._id} className="hover:bg-secondary-dark/10">
                <TableCell>{cert.name}</TableCell>
                <TableCell>{cert.issuedBy}</TableCell>
                <TableCell>
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    className="h-12 w-auto rounded"
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell>{cert.createdAt}</TableCell>
                <TableCell>
                  <div
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(cert._id)}
                  >
                    <Trash2 />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No certificates found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CertificatesPage
