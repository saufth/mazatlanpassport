import { redirect } from 'next/navigation'
import QRCodeImage from '@/components/qr-code'
import { getSession } from '@/lib/actions/session'
import { getUserProfile } from '@/lib/actions/users'
import { redirects, roles } from '@/lib/constants'
import { absoluteUrl } from '@/lib/utils'
import { GENRE } from '@/config/app'
import { signout } from '@/lib/actions/auth'

export default async function ProfilePage () {
  const role = roles.user
  const session = await getSession(role)

  if (session.error) {
    await signout(role)
    redirect(redirects.toSignin)
  }

  const userId = { id: String(session.data?.id) }
  const userProfile = await getUserProfile(userId)

  // if (!userProfile.data) {
  //   if (userProfile.error) {
  //     if (userProfile.error === userStatus.unverified) {
  //       redirect(redirects.toSignin)
  //     }
  //     await signout(role)
  //     redirect(redirects.afterLogout)
  //   }
  //   await signout(role)
  //   redirect(redirects.toSignin)
  // }

  const profile = userProfile.data

  return (
    <div>
      <div className='container py-spacing-6'>
        <div>
          {`${profile?.firstName} ${profile?.lastName}`}
        </div>
        <div>
          {profile?.email}
        </div>
        <div>
          {GENRE.find((genreItem) => String(profile?.genreISO) === genreItem.iso)?.title}
        </div>
        <div>
          {String(profile?.birthday)}
        </div>
        <QRCodeImage src={absoluteUrl(`/profile/${userId}`)} />
      </div>
    </div>
  )
}
