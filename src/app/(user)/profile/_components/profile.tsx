import QRCodeImage from '@/components/qr-code'
import ManagePlanForm from '@/app/(user)/profile/_components/manage-plan-form'
import { Icons } from '@/components/icons'
import { absoluteUrl, cn } from '@/lib/utils'
import { type UserInputs } from '@/lib/validations/user'
import type { PlanWithPrice, UserPlan } from '@/types'

interface ProfileProps {
  user: UserInputs | null
  planPromise: Promise<UserPlan | null>
  plansPromise: Promise<PlanWithPrice[]>
}

export default async function Profile ({
  user,
  planPromise,
  plansPromise
}: ProfileProps) {
  const [plan, plans] = await Promise.all([
    planPromise,
    plansPromise
  ])
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
                      {`${user?.firstName} ${user?.lastName}`}
                    </div>
                    <div className={cn(
                      'f-subhead-3 text-destructive font-medium',
                      plan?.isSubscribed ? 'text-primary' : 'text-destructive'
                    )}
                    >
                      {plan?.isSubscribed ? 'Activo' : 'Inactivo'}
                    </div>
                  </div>
                </div>
                <div className='max-w-40 h-auto aspect-square'>
                  <QRCodeImage
                    data={absoluteUrl(`/subscription/${plan?.id || ''}`)}
                    className='rounded-[28px]'
                  />
                </div>
                <Icons.Logomark className='w-auto h-[90%] md:h-[120%] absolute -bottom-16 -right-0 -z-10 opacity-20' />
                <div className='absolute inset-0 -z-10 bg-gradient-to-l from-secondary via-secondary/20 to-secondary/0 backdrop-blur rounded-[40px]' />
              </div>
            </div>
          </div>
        </div>
        {!plan?.isSubscribed && (
          <div>
            <div className='f-heading-2 text-secondary font-bold text-balance text-center'>
              Activa tu membresía y comienza a disfrutar de descuentos exclusivos
            </div>
            <div className='cols-container gap-y-gutter mt-spacing-5'>
              {plans.map((planItem, key) => (
                <div
                  className='w-6-cols md:w-4-cols lg:w-6-cols p-6 rounded-3xl bg-secondary-foreground'
                  key={`${planItem.title}-${key}`}
                >
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <div className='f-subhead-3 text-secondary font-bold'>
                        {planItem.title}
                      </div>
                      <span className='f-body-1 font-extrabold text-green-700 pl-2'>
                        {planItem.price}
                      </span>
                    </div>
                    <div className='max-w-sm f-body-1 text-secondary font-medium text-balance'>
                      {planItem.description}
                    </div>
                  </div>
                  <div className='mt-12'>
                    <ManagePlanForm
                      stripePriceId={planItem.stripePriceId}
                      stripePaymentIntentId={plan?.stripePaymentIntentId}
                      isSubscribed={plan?.isSubscribed}
                      isCurrentPlan={plan?.title === planItem.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>)}
      </div>
    </div>
  )
}
