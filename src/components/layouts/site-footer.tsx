import Link from 'next/link'
import MainNav from '@/components/layouts/main-nav'
import { siteConfig } from '@/config/site'

export default function SiteFooter () {
  return (
    <footer className='bg-card border-t'>
      <div className='container'>
        <div className='py-spacing-7'>
          <MainNav muted />
        </div>
        <div className='pb-spacing-4 flex flex-col gap-y-spacing-4 md:flex-row justify-between'>
          <div className='flex items-center gap-x-spacing-1 md:pt-1 lg:pt-2 order-2 md:order-1'>
            <span className='pt- text-sm md:text-base lg:text-lg2 text-muted-foreground hover:text-foreground transition-colors duration-300'>
              <Link href='/'>{`${siteConfig.name} © ${new Date().getFullYear()}`}</Link>
            </span>
          </div>
          <div className='flex flex-col md:flex-row gap-4 order-1 md:order-2 sm:pt-2'>
            <Link
              href='/terminos-y-condiciones'
              className='text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors duration-300'
            >
              Términos y condiciones
            </Link>
            <Link
              href='/privacidad'
              className='text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors duration-300'
            >
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
