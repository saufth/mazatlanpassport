import { redirect } from 'next/navigation'
import Profile from '@/app/(lobby)/_components/profile'
import { getSession } from '@/lib/actions/session'
import { getUserProfile } from '@/lib/actions/users'
import { redirects, roles, userStatus } from '@/lib/constants'

export default async function ProfilePage () {
  const role = roles.user
  const session = await getSession(role)

  const userId = { id: String(session.data?.id) }
  const userProfile = await getUserProfile(userId)

  if (!userProfile.data) {
    if (userProfile.error) {
      redirect(
        userProfile.error !== userStatus.unverified
          ? redirects.afterSignout
          : redirects.toVerify
      )
    }
    redirect(redirects.toSignin)
  }

  const profile = userProfile.data

  return (
    <Profile
      profile={{
        ...userId,
        ...profile
      }}
    />
  )
}
