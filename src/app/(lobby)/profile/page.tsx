import QRCodeImage from '@/components/qr-code'
import { GENRE } from '@/config/app'
import { deleteSession, getSession } from '@/lib/actions/session'
import { getUserProfile } from '@/lib/actions/users'
import { redirects, roles, userStatus } from '@/lib/constants'
import { absoluteUrl } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

export default async function ProfilePage () {
  const role = roles.user
  const session = await getSession(role)

  if (!session.data) {
    toast.error('Hubo un problema con la sesión, provafor, vuelva a iniciar sesión.')
    await deleteSession(role)
    redirect(redirects.toSignin)
  }

  const userId = { id: String(session.data.id) }
  const userProfile = await getUserProfile(userId)

  if (!userProfile.data) {
    if (userProfile.error) {
      toast.error(userProfile.error)
      if (userProfile.error === userStatus.unverified) {
        redirect(redirects.toSignin)
      }
      await deleteSession(role)
      redirect(redirects.afterLogout)
    }
    toast.error(userProfile.error)
    await deleteSession(role)
    redirect(redirects.toSignin)
  }

  const profile = userProfile.data

  return (
    <div>
      <div className='container py-spacing-6'>
        <div>
          {`${profile.firstName} ${profile.lastName}`}
        </div>
        <div>
          {profile.email}
        </div>
        <div>
          {GENRE.find((genreItem) => String(profile.genreISO) === genreItem.iso)?.title}
        </div>
        <div>
          {String(profile.birthday)}
        </div>
        <QRCodeImage src={absoluteUrl(`/profile/${userId}`)} />
      </div>
    </div>
  )
}
