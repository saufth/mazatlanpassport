'use client'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { CreateAdmin } from '@/app/(protected)/root/onboarding/_components/create-admin'
import { Intro } from '@/app/(protected)/root/onboarding/_components/intro'

interface OnboardingRootProps {
  rootId: string
}

export function OnboardingRoot ({ rootId }: OnboardingRootProps) {
  const search = useSearchParams()
  const step = search.get('step')

  return (
    <AnimatePresence mode='wait'>
      {!step && <Intro key='intro' />}
      {step === 'create' && <CreateAdmin rootId={rootId} />}
    </AnimatePresence>
  )
}
