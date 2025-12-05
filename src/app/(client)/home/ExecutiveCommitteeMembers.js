import { Suspense } from 'react'
import Image from 'next/image'
import { getTopThreeMembers } from '@/app/admin/members/action'
import MemberCard from '@/components/MemberCard'
import MemberCardSkeleton from '@/components/MemberCardSkeleton'
import SectionHeading from '@/components/SectionHeading'
import Link from 'next/link'

// Server component for executive committee members
async function ExecutiveCommitteeMembersList({ language }) {
  const res = await getTopThreeMembers()

  if (res.status === 'error') {
    return null
  }

  const members = res.data

  return (
    <>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 max-w-screen-xl mx-auto">
        {members.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>

      <div className="mt-8 justify-self-end">
        <Link
          href="/members"
          className="text-secondary-dark font-bold px-4 py-2 hover:underline transition"
        >
          {language === 'hi' ? 'सभी देखें' : 'View All'}
        </Link>
      </div>
    </>
  )
}

// Loading component
function ExecutiveCommitteeLoading() {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-6 max-w-screen-xl mx-auto">
      {[1, 2, 3].map((_, index) => (
        <MemberCardSkeleton key={index} />
      ))}
    </div>
  )
}

// Main component (Server Component)
export default async function ExecutiveCommitteeMembers({ language = 'en' }) {
  return (
    <div className="bg-primary-base py-12 px-4 lg:px-20">
      <div className="mx-auto">
        <SectionHeading
          title={language === 'hi' ? 'कार्यकारी समिति' : 'Executive Committee'}
          subtitle={
            language === 'hi'
              ? 'हमारे मिशन का नेतृत्व करने वाली समर्पित टीम से मिलिए।'
              : 'Meet the dedicated team leading our mission.'
          }
        />

        <Suspense fallback={<ExecutiveCommitteeLoading />}>
          <ExecutiveCommitteeMembersList language={language} />
        </Suspense>
      </div>
    </div>
  )
}
