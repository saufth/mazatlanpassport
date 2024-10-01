import { Link } from '@/components/ui/link'
import MainNav from '@/components/layouts/main-nav'
import NextLink from '../ui/next-link'
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
            <span className='pt-2 text-muted-foreground text-sm md:text-base lg:text-lg'>
              <NextLink href='/'>{siteConfig.name}</NextLink> {`© ${new Date().getFullYear()}`}
            </span>
          </div>
          <div className='flex flex-col md:flex-row gap-4 order-1 md:order-2 sm:pt-2'>
            <Link
              href='/terminos-y-condiciones'
              variant='muted'
              className='text-sm lg:text-base'
            >
              Términos y condiciones
            </Link>
            <Link
              href='/privacidad'
              variant='muted'
              className='text-sm lg:text-base'
            >
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
