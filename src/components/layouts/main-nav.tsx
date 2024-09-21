import SocialNav from '@/components/layouts/social-nav'
import { Link } from '@/components/ui/link'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import {
  siteConfig,
  socialNav,
  contactConfig,
  blogNav
} from '@/config/site'

export interface MainNavProps {
  action?: () => void
  muted?: boolean
}

export default function MainNav ({ action, muted }: MainNavProps) {
  return (
    <div className='cols-container gap-y-spacing-7'>
      <div className='w-6-cols md:w-5-cols lg:w-5-cols space-y-spacing-5 order-2 md:order-1'>
        {[contactConfig].map((contactItem, contactItemKey) => (
          <div className='flex flex-col gap-y-spacing-3' key={`contact-item-${contactItemKey}`}>
            <Link
              href={contactItem.phone.whatsappUrl}
              onClick={action}
              aria-label={`Número de atención a clientes ${contactItem.address.country}`}
              title='Llamar ahora'
              target='_blank'
              size='lg'
              rel='noreferrer'
              className={cn('w-fit flex gap-x-2 items-center', muted && 'text-card-foreground')}
            >
              <Icons.Whatsapp className='w-auto h-6 sm:h-8' />
              <span className='font-normal'>{contactItem.phone.displayNumber}</span>
            </Link>
            <Link
              href={contactItem.address.url}
              onClick={action}
              aria-label='Abre la ubicación del corporativo en Google Maps, se abre en una nueva pestaña o en tu aplicación de mapas predeterminada'
              title='Ver ubicación en Google Maps'
              target='_blank'
              size='lg'
              rel='noreferrer'
              className={cn('w-fit text-balance font-normal', muted && 'text-card-foreground')}
            >
              {contactItem.address.fullTitle}
            </Link>
          </div>
        ))}
        <div className='flex flex-col gap-y-spacing-3'>
          <Link
            href={`mailto:${contactConfig.email}`}
            onClick={action}
            aria-label='Envía un mensaje con tu servicio de correo, se abre en una nueva pestaña o en tu cliente de correo predeterminado'
            title='Enviar correo ahora'
            target='_blank'
            rel='noreferrer'
            size='lg'
            className={cn('w-fit font-normal', muted && 'text-card-foreground')}
          >
            {contactConfig.email}
          </Link>
          <SocialNav items={socialNav} action={action} muted />
        </div>
      </div>
      <nav
        className='w-6-cols md:w-3-cols lg:w-7-cols order-1 md:order-2'
        aria-label={`${siteConfig.name} directorio`}
      >
        <div className='cols-container gap-y-spacing-6'>
          <div className='w-6-cols sm:w-4-cols md:w-8-cols lg:w-6-cols'>
            <div className='text-lg sm:text-xl text-muted-foreground'>
              Navegación
            </div>
            <ul className='space-y-spacing-3 mt-spacing-4'>
              {siteConfig.mainNav.map((mainNavItem, mainNavItemKey) => {
                return mainNavItem.title !== 'Soluciones' && (
                  <li key={`nav-item-${mainNavItemKey}`}>
                    <Link
                      href={mainNavItem.href}
                      onClick={action}
                      aria-label={mainNavItem.title}
                      title={`Ir a página ${mainNavItem.title}`}
                      className={cn('text-base sm:text-lg text-balance', muted && 'text-card-foreground')}
                    >
                      {mainNavItem.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='w-6-cols sm:w-4-cols lg:w-6-cols'>
            <div className='text-lg sm:text-xl text-muted-foreground'>
              Blog
            </div>
            <ul className='space-y-spacing-3 mt-spacing-4'>
              {blogNav.map((blogNavItem, blogNavItemKey) => {
                return blogNavItem.title !== 'Soluciones' && (
                  <li key={`nav-item-${blogNavItemKey}`}>
                    <Link
                      href={blogNavItem.href}
                      onClick={action}
                      aria-label={blogNavItem.title}
                      title={`Ir a articulo ${blogNavItem.title}`}
                      className={cn('text-base sm:text-lg text-balance', muted && 'text-card-foreground')}
                    >
                      {blogNavItem.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
