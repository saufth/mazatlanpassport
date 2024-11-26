import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { GridPattern } from '@/components/grid-pattern'
import { Shell } from '@/components/shell'
import { Onboarding } from '@/app/(protected)/root/onboarding/_components/onboarding'
import { getCachedRoot } from '@/lib/queries/root'

export const metadata: Metadata = {
  title: 'Onboarding',
  description: 'Comienza creando un administrador'
}

export default async function OnboardingPage () {
  const root = await getCachedRoot()

  if (!root) {
    redirect('/signin')
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
        <Onboarding rootId={root.id} />
      </Suspense>
    </Shell>
  )
}
