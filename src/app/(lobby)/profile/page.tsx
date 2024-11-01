import { redirect } from 'next/navigation'
import QRCodeImage from '@/components/qr-code'
import { getSession } from '@/lib/actions/session'
import { getUserProfile } from '@/lib/actions/users'
import { redirects, roles, userStatus } from '@/lib/constants'
import { absoluteUrl } from '@/lib/utils'
import { Icons } from '@/components/icons'

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
      <div className='container py-spacing-6 space-y-spacing-6'>
        <div className='space-y-spacing-5'>
          {/* <div className='f-heading-1 text-secondary font-bold text-center'>
            Disfruta de descuentos exclusivos
          </div> */}
          <div className='max-w-[400px] md:max-w-[728px] mx-auto h-auto md:aspect-[2/1] rounded-[60px] backdrop-blur-xl'>
            <div className='h-full p-5 shadow-[inset_0_4px_30px] shadow-ring/40 rounded-[60px]'>
              <div className='h-full relative overflow-hidden z-10 flex flex-col gap-y-96 md:gap-y-0 justify-between bg-gradient-to-tl from-secondary via-fuchsia-950 to-secondary p-8 border border-fuchsia-700 rounded-[40px]'>
                <div className='w-full'>
                  <div className='space-y-1'>
                    <div className='f-subhead-1 font-bold text-white'>
                      {`${profile?.firstName} ${profile?.lastName}`}
                    </div>
                    <div className='f-subhead-3 text-destructive font-medium'>
                      Inactivo
                    </div>
                  </div>
                </div>
                <div className='max-w-40 h-auto aspect-square'>
                  <QRCodeImage
                    data={absoluteUrl(`/profile/${userId}`)}
                    className='rounded-[28px]'
                  />
                </div>
                <Icons.Logomark className='w-auto h-[80%] md:h-[116%] absolute -bottom-16 -right-0 -z-10 opacity-20' />
                <div className='absolute inset-0 -z-10 bg-gradient-to-l from-secondary via-secondary/30 to-secondary/3 backdrop-blur-[2px] rounded-[40px]' />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='f-heading-2 font-bold text-balance text-center'>
            Activa tu membresia y comienza a disfrutar de descuentos exclusivos
          </div>
        </div>
      </div>
    </div>
  )
}
