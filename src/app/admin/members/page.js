'use client'

import React, { useEffect, useState } from 'react'
import MemberForm from './MemberForm'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { deleteMember, getMembers } from './action'
import { toast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import MemberEditModal from './MemberEditModal'

function MembersPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  async function fetchData() {
    setLoading(true)
    const response = await getMembers()
    if (response.status === 'success') {
      setMembers(response.data)
    }
    setLoading(false)
  }

  const handleMemberDelete = async (memberId) => {
    const confirmed = confirm('Are you sure you want to delete this member?')

    if (confirmed) {
      const response = await deleteMember(memberId)
      if (response.status === 'success') {
        toast({
          title: 'Success',
          description: 'Member deleted successfully',
        })
        fetchData()
      } else {
        toast({
          title: 'Error',
          description: response.message,
          variant: 'destructive',
        })
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="py-4 px-4 lg:px-20 text-secondary-dark">
      <div className="flex justify-between py-2">
        <div className="text-lg tracking-wider font-semibold">Our Members</div>
        <MemberForm onMemberAdded={fetchData} />
      </div>
      <div>
        <Table>
          <TableCaption>Create or Modify Members</TableCaption>
          <TableHeader className="border-2">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Is Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-10" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : members.length > 0 ? (
              members.map((member) => (
                <TableRow
                  key={member._id}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => {
                    setSelectedMember(member)
                    setModalOpen(true)
                  }}
                >
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell>{member.designation}</TableCell>
                  <TableCell>{member.priority}</TableCell>
                  <TableCell>
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                        width={40}
                        height={40}
                        priority
                      />
                    ) : (
                      <Image
                        src={'/images/dummy_image.jpg'}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                        width={40}
                        height={40}
                        priority
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {member.isActive ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-red-700 ml-2 hover:text-red-400 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMemberDelete(member._id)
                      }}
                    >
                      <Trash2 />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No members found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <MemberEditModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        member={selectedMember}
        onMemberUpdated={fetchData}
      />
    </div>
  )
}

export default MembersPage
