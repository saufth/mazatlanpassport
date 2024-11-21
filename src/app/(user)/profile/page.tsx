import { redirect } from 'next/navigation'
import Profile from '@/app/(user)/profile/_components/profile'
import { getPlans } from '@/lib/actions/stripe'
import { getCachedUser } from '@/lib/queries/user'
import { getSubscription } from '@/lib/queries/subscription'

export default async function ProfilePage () {
  const user = await getCachedUser()

  if (!user) {
    redirect('/signin')
  }

  const planPromise = getSubscription({ id: user.id })
  const plansPromise = getPlans()

  return (
    <Profile
      user={user}
      planPromise={planPromise}
      plansPromise={plansPromise}
    />
  )
}
