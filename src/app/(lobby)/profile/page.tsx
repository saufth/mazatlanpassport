import { redirect } from 'next/navigation'
import QRCodeImage from '@/components/qr-code'
import { getSession } from '@/lib/actions/session'
import { getUserProfile } from '@/lib/actions/users'
import { redirects, roles, userStatus } from '@/lib/constants'
import { absoluteUrl } from '@/lib/utils'

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
    <div>
      <div className='container py-spacing-6'>
        <div className='max-w-3xl mx-auto h-auto aspect-[2/1] bg-accent/50 rounded-[60px] backdrop-blur-xl'>
          <div className='h-full p-6 shadow-[inset_0_4px_30px] shadow-slate-400/25 border'>
            <div className='h-full flex gap-x-6 bg-secondary p-8 rounded-[40px]'>
              <div className='aspect-[1/1]'>
                <QRCodeImage
                  data={absoluteUrl(`/profile/${userId}`)}
                  className='rounded-[32px] h-auto'
                />
              </div>
              <div className='space-y-1 pt-4'>
                <div className='f-subhead-2 font-bold text-white'>
                  {`${profile?.firstName} ${profile?.lastName}`}
                </div>
                <div className='f-body-1 text-destructive font-medium'>
                  Inactivo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
