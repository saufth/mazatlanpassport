import { redirect } from 'next/navigation'
import Profile from '@/app/(lobby)/_components/profile'
import { redirects, roles, userStatus } from '@/lib/constants'
import { getPlans } from '@/lib/actions/stripe'
import { getSession } from '@/lib/actions/session'
import { getUserFullName } from '@/lib/actions/users'

export default async function ProfilePage () {
  const role = roles.user
  const session = await getSession(role)

  const userId = { id: session.data?.id as string }
  const userProfile = await getUserFullName(userId)

  if (!userProfile.data) {
    if (userProfile.error) {
      redirect(
        userProfile.error !== userStatus.unverified
          ? redirects.afterSignout
          : redirects.toSignin
      )
    }
    redirect(redirects.toSignin)
  }

  const profile = userProfile.data
  const plans = await getPlans()

  return (
    <Profile
      user={{
        ...userId,
        ...profile
      }}
      plans={plans}
    />
  )
}
