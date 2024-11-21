import Image from 'next/image'
import SignupRootForm from '@/app/(protected)/root/(auth)/_components/signup-root-form'

export default function SignupRootPage () {
  return (
    <section>
      <div className='container py-spacing-6'>
        <div className='cols-container'>
          <div className='w-full lg:w-5-cols relative mt-12 lg:mt-0 order-2 lg:order-1'>
            <div className='f-heading-2 font-extrabold text-secondary'>
              Registrar usuario con privilegios
            </div>
            <div className='mt-spacing-4'>
              <SignupRootForm />
            </div>
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
