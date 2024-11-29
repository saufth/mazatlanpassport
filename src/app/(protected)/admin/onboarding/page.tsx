import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { GridPattern } from '@/components/grid-pattern'
import { Shell } from '@/components/shell'
import { OnboardingAdmin } from '@/app/(protected)/admin/onboarding/_components/onboarding-admin'
import { getCachedAdmin } from '@/lib/queries/admin'
import { redirects } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Comienza creando un establecimiento'
}

export default async function OnboardingAdminPage () {
  const admin = await getCachedAdmin()

  if (!admin) {
    redirect(redirects.admin.toSignin)
  }

  return (
    <Shell className='h-[calc(100vh-4rem)] max-w-screen-sm'>
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray='4 2'
        className='[mask-image:radial-gradient(300px_circle_at_left_top,white,transparent)]'
      />
      <Suspense fallback={<Skeleton className='size-full' />}>
        <OnboardingAdmin adminId={admin.id} />
      </Suspense>
    </Shell>
  )
}
