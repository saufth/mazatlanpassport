import Link from 'next/link'
import MainNav from '@/components/layouts/main-nav'
import { siteConfig } from '@/config/site'

export default function SiteFooter () {
  return (
    <footer className='bg-secondary'>
      <div className='container'>
        <div className='py-spacing-7'>
          <MainNav muted />
        </div>
        <div className='pb-spacing-4 flex flex-col gap-y-spacing-4 md:flex-row justify-between'>
          <div className='flex items-center gap-x-spacing-1 md:pt-1 lg:pt-2 order-2 md:order-1'>
            <span className='f-body-1 font-semibold text-secondary-foreground hover:text-white transition-colors'>
              <Link href='/'>{`${siteConfig.name} © ${new Date().getFullYear()}`}</Link>
            </span>
          </div>
          <div className='flex flex-col md:flex-row gap-4 order-1 md:order-2 sm:pt-2'>
            <Link
              href='/terminos-y-condiciones'
              className='f-body-1 font-semibold text-secondary-foreground hover:text-white transition-colors'
            >
              Términos y condiciones
            </Link>
            <Link
              href='/privacidad'
              className='f-body-1 font-semibold text-secondary-foreground hover:text-white transition-colors'
            >
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
