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

function MembersPage() {
  const [members, setMembers] = useState([])

  async function fetchData() {
    const response = await getMembers()
    if (response.status === 'success') {
      setMembers(response.data)
    }
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.length > 0 ? (
              members.map((member) => (
                <TableRow key={member._id}>
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
                      'No Image'
                    )}
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-red-700 ml-2 hover:text-red-400 cursor-pointer"
                      onClick={() => handleMemberDelete(member._id)}
                    >
                      <Trash2 />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="7" className="text-center">
                  No members found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MembersPage
