import Image from 'next/image'
import SignoutButtons from '@/app/(auth)/_components/signout-buttons'

export default async function SignoutPage () {
  return (
    <section>
      <div className='container py-spacing-6'>
        <div className='cols-container'>
          <div className='w-full lg:w-5-cols relative mt-12 lg:mt-0 order-2 lg:order-1'>
            <div className='space-y-spacing-2'>
              <h1 className='f-heading-2 font-extrabold text-secondary'>
                Cerrar sesión
              </h1>
              <p className='f-body-1 text-primary-foreground font-medium'>
                Puedes volver a iniciar sesión cuando quieras.
              </p>
            </div>
            <div className='mt-spacing-4'>
              <SignoutButtons />
            </div>
          </div>
          <div className='w-full lg:w-7-cols order-1 lg:order-2'>
            <Image
              src='/images/signout-hero.webp'
              alt='Mesas de restaurante con palapa en la playa con puesta de sol en Mazatlán'
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
