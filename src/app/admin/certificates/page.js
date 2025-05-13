'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { deleteCertificate, getCertificates } from './action'

import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import CertificateForm from './CertificateForm'

function CertificatesPage() {
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    const res = await getCertificates()
    if (res.status === 'success') {
      setCertificates(res.data)
    } else {
      console.error('Error fetching certificates:', res.message)
    }
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
      <div>
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
            {certificates.map((cert) => (
              <TableRow
                key={cert._id}
                id={`row-${cert._id}`}
                className="hover:bg-secondary-dark/10"
              >
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
                    className="text-red-500"
                    onClick={() => handleDelete(cert._id)}
                  >
                    <Trash2 />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default CertificatesPage
