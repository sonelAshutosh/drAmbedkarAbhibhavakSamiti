'use client'

import {
  HandCoins,
  Image,
  LayoutGrid,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  TicketCheck,
  UserRound,
  Users2,
} from 'lucide-react'

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
    title: 'Volunteers',
    url: '/admin/volunteers',
    icon: Users2,
  },
  {
    title: 'Certificates',
    url: '/admin/certificates',
    icon: TicketCheck,
  },
  {
    title: 'Newsletter Subscribers',
    url: '/admin/newsletterSubscribers',
    icon: Mail,
  },
  {
    title: 'Contacted Persons',
    url: '/admin/contactedPerson',
    icon: Phone,
  },
  {
    title: 'Testimonials',
    url: '/admin/testimonials',
    icon: MessageSquare,
  },
  {
    title: 'Campaigns',
    url: '/admin/campaigns',
    icon: LayoutGrid,
  },
  {
    title: 'Gallery',
    url: '/admin/gallery',
    icon: Image,
  },
  {
    title: 'Donators',
    url: '/admin/donators',
    icon: HandCoins,
  },
]

const schoolItems = [
  {
    title: 'Students',
    url: '/admin/students',
    icon: UserRound,
  },
  {
    title: 'Teachers',
    url: '/admin/faculty',
    icon: Users2,
  },
  {
    title: 'Events',
    url: '/admin/events',
    icon: Image,
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
            <SidebarMenu>
              {schoolItems.map((item) => (
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
      </SidebarContent>
      <Button onClick={handleLogout} variant="destructive" className="w-full">
        <LogOut />{' '}
      </Button>
    </Sidebar>
  )
}

export default AdminNav
