import Image from 'next/image'
import ResetAdminPasswordEmailForm from '@/app/(protected)/admin/(auth)/_components/reset-admin-password-email-form'

export default function ResetAdminPasswordEmailCodePage () {
  return (
    <section>
      <div className='container py-spacing-6'>
        <div className='cols-container'>
          <div className='w-full lg:w-5-cols relative mt-12 lg:mt-0 order-2 lg:order-1'>
            <div className='space-y-spacing-2'>
              <h1 className='f-heading-2 font-extrabold text-secondary'>
                Recuperar contraseña
              </h1>
              <p className='f-body-1 text-primary-foreground font-medium'>
                Ingresa tu correo electrónico y te enviaremos un código de verificación.
              </p>
            </div>
            <div className='mt-spacing-4'>
              <ResetAdminPasswordEmailForm />
            </div>
          </div>
          <div className='w-full lg:w-7-cols order-1 lg:order-2'>
            <Image
              src='/images/verify-email-hero.webp'
              alt='Mesas de restaurante en la playa con puesta de sol en Mazatlán'
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
