import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { GridPattern } from '@/components/grid-pattern'
import { Shell } from '@/components/shell'
import { OnboardingRoot } from '@/app/(protected)/root/onboarding/_components/onboarding-root'
import { getCachedRoot } from '@/lib/queries/root'
import { redirects } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Comienza creando un administrador'
}

export default async function OnboardingRootPage () {
  const root = await getCachedRoot()

  if (!root) {
    redirect(redirects.root.toSignin)
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
        <OnboardingRoot rootId={root.id} />
      </Suspense>
    </Shell>
  )
}
