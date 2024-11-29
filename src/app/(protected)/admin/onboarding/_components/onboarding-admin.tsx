'use client'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { CreateStore } from '@/app/(protected)/admin/onboarding/_components/create-store'
import { Intro } from '@/app/(protected)/admin/onboarding/_components/intro'

interface OnboardingAdminProps {
  adminId: string
}

export function OnboardingAdmin ({ adminId }: OnboardingAdminProps) {
  const search = useSearchParams()
  const step = search.get('step')

  return (
    <AnimatePresence mode='wait'>
      {!step && <Intro key='intro' />}
      {step === 'create' && <CreateStore adminId={adminId} />}
    </AnimatePresence>
  )
}
