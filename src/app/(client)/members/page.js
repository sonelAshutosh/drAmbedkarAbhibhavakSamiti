import { Suspense } from 'react'
import { getMembers } from '@/app/admin/members/action'
import MemberCard from '@/components/MemberCard'
import MemberCardSkeleton from '@/components/MemberCardSkeleton'
import SectionHeading from '@/components/SectionHeading'

// Server component for members list
async function MembersList({ language }) {
  const res = await getMembers(true)

  if (res.status === 'error') {
    return <p className="text-red-600 text-center">{res.message}</p>
  }

  const members = res.data

  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 max-w-screen-xl mx-auto">
      {members.map((member, index) => (
        <MemberCard key={index} member={member} />
      ))}
    </div>
  )
}

// Loading component
function MembersLoading() {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 max-w-screen-xl mx-auto">
      {Array.from({ length: 6 }).map((_, index) => (
        <MemberCardSkeleton key={index} />
      ))}
    </div>
  )
}

// Main page component (Server Component)
export default async function MembersPage({ searchParams }) {
  // Get language from searchParams or default to 'en'
  const language = searchParams?.lang || 'en'

  return (
    <div className="px-4 lg:px-20 py-10">
      <SectionHeading
        title={language === 'hi' ? 'हमारी टीम के सदस्य' : 'Our Team Members'}
      />

      <Suspense fallback={<MembersLoading />}>
        <MembersList language={language} />
      </Suspense>
    </div>
  )
}
