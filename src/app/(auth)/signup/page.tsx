import Image from 'next/image'
import SignupForm from '@/app/(auth)/_components/signup-form'

export default async function SignupPage () {
  return (
    <section>
      <div className='container py-spacing-6'>
        <div className='flex flex-col gap-y-spacing-4'>
          <h1 className='max-w-3xl f-display-3 font-extrabold text-secondary text-balance'>
            ¡Empieza a disfrutar de <span className='text-accent'>descuentos exclusivos!</span>
          </h1>
        </div>
        <div className='cols-container mt-spacing-6'>
          <div className='w-full lg:w-5-cols relative mt-12 lg:mt-0 order-2 lg:order-1'>
            <SignupForm />
          </div>
          <div className='w-full lg:w-7-cols order-1 lg:order-2'>
            <Image
              src='/images/signup-hero.webp'
              alt=''
              width={1200}
              height={1200}
              priority
              // sizes='(max-width: 744px) 100vw, (max-width: 1280px) 100vw, (max-width: 1440px) 100vw, 100vw'
              className='w-full rounded-3xl'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
