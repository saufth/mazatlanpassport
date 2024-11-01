import { redirect } from 'next/navigation'
import QRCodeImage from '@/components/qr-code'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { getSession } from '@/lib/actions/session'
import { getUserProfile } from '@/lib/actions/users'
import { redirects, roles, userStatus } from '@/lib/constants'
import { absoluteUrl, formatPrice } from '@/lib/utils'
import { pricing } from '@/config/pricing'

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
              <div className='h-full relative overflow-hidden z-10 flex flex-col gap-y-80 md:gap-y-0 justify-between bg-gradient-to-tl from-secondary via-fuchsia-950 to-secondary p-8 border border-fuchsia-700 rounded-[40px]'>
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
                <Icons.Logomark className='w-auto h-[90%] md:h-[120%] absolute -bottom-16 -right-0 -z-10 opacity-20' />
                <div className='absolute inset-0 -z-10 bg-gradient-to-l from-secondary via-secondary/20 to-secondary/0 backdrop-blur rounded-[40px]' />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='f-heading-2 text-secondary font-bold text-balance text-center'>
            Activa tu membresía y comienza a disfrutar de descuentos exclusivos
          </div>
          <div className='cols-container gap-y-gutter mt-spacing-5'>
            {pricing.map((pricingItem, key) => (
              <div
                className='w-6-cols md:w-4-cols lg:w-6-cols p-6 rounded-3xl bg-secondary-foreground'
                key={`${pricingItem.title}-${key}`}
              >
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <div className='f-subhead-3 text-secondary font-bold'>
                      {pricingItem.title}
                    </div>
                    <span className='f-body-1 font-extrabold text-green-700 pl-2'>{formatPrice({ price: pricingItem.price, minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className='max-w-sm f-body-1 text-secondary font-medium text-balance'>
                    {pricingItem.description}
                  </div>
                </div>
                <div className='mt-12'>
                  <Button variant='secondary'>
                    ¡Obtener por plan!
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
