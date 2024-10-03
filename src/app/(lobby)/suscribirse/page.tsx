import Image from 'next/image'
import SignupForm from '@/components/forms/signup-form'

export default function SubscribePage () {
  return (
    <section>
      <div className='container pt-spacing-7'>
        <div className='flex flex-col gap-y-spacing-4'>
          <h1 className='text-[0.6875rem] sm:text-[0.875rem] xl:text-[1rem] uppercase text-muted-foreground font-medium text-balance leading-none tracking-wider'>
            Hazte socio
          </h1>
          <p className='f-heading-1 text-balance'>
            Empieza a disfrutar de descuentos exclusivos
          </p>
        </div>
        <div className='cols-container mt-spacing-6'>
          <div className='w-full lg:w-5-cols relative mt-12 lg:mt-0 order-2 lg:order-1'>
            <SignupForm amount={999} />
          </div>
          <div className='w-full lg:w-7-cols order-1 lg:order-2'>
            <Image
              src='/images/signin-hero.webp'
              alt=''
              width={1920}
              height={1080}
              sizes='(max-width: 744px) 100vw, (max-width: 1280px) 100vw, (max-width: 1440px) 100vw, 100vw'
              className='w-full'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
