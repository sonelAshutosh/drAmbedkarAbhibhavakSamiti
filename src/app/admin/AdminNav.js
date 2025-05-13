'use client'

import { LogOut, TicketCheck, UserRound, Users2 } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const orgItems = [
  {
    title: 'Users',
    url: '/admin/users',
    icon: UserRound,
  },
  {
    title: 'Members',
    url: '/admin/members',
    icon: Users2,
  },
  {
    title: 'Certificates',
    url: '/admin/certificates',
    icon: TicketCheck,
  },
]

function AdminNav() {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/admin')
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Organsiation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {orgItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>School</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{/* //TODO: Add school items */}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Button onClick={handleLogout} variant="destructive" className="w-full">
        <LogOut />{' '}
      </Button>
    </Sidebar>
  )
}

export default AdminNav
