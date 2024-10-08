import Link from 'next/link'
import SocialNav from '@/components/layouts/social-nav'
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
      <div className='w-6-cols md:w-5-cols lg:w-5-cols space-y-spacing-3 order-2 md:order-1'>
        {[contactConfig].map((contactItem, contactItemKey) => (
          <div className='flex flex-col gap-y-spacing-3' key={`contact-item-${contactItemKey}`}>
            <Link
              href={contactItem.phone.whatsappUrl}
              onClick={action}
              aria-label={`Número de atención a clientes ${contactItem.address.country}`}
              title='Llamar ahora'
              target='_blank'
              rel='noreferrer'
              className='w-fit flex gap-x-spacing-3 items-center group'
            >
              <Icons.Whatsapp className='w-auto h-6 sm:h-8' />
              <span
                className={cn(
                  'text-secondary f-subhead-1 leading-none font-bold group-hover:text-accent transition-colors',
                  muted && 'text-secondary-foreground group-hover:text-white'
                )}
              >
                {contactItem.phone.displayNumber}
              </span>
            </Link>
            <Link
              href={contactItem.address.url}
              onClick={action}
              aria-label='Abre la ubicación del corporativo en Google Maps, se abre en una nueva pestaña o en tu aplicación de mapas predeterminada'
              title='Ver ubicación en Google Maps'
              target='_blank'
              rel='noreferrer'
              className={cn(
                'text-secondary w-fit f-subhead-1 font-bold hover:text-accent transition-colors',
                muted && 'text-secondary-foreground hover:text-white'
              )}
            >
              {contactItem.address.fullTitle}
            </Link>
          </div>
        ))}
        <div className='flex flex-col gap-y-spacing-4'>
          <Link
            href={`mailto:${contactConfig.email}`}
            onClick={action}
            aria-label='Envía un mensaje con tu servicio de correo, se abre en una nueva pestaña o en tu cliente de correo predeterminado'
            title='Enviar correo ahora'
            target='_blank'
            rel='noreferrer'
            className={cn(
              'text-secondary w-fit f-subhead-1 font-bold hover:text-accent transition-colors',
              muted && 'text-secondary-foreground hover:text-white'
            )}
          >
            {contactConfig.email}
          </Link>
          <SocialNav items={socialNav} action={action} muted={muted} />
        </div>
      </div>
      <nav
        className='w-6-cols md:w-3-cols lg:w-7-cols order-1 md:order-2'
        aria-label={`${siteConfig.name} directorio`}
      >
        <div className='cols-container gap-y-spacing-6'>
          <div className='w-6-cols sm:w-4-cols md:w-8-cols lg:w-6-cols'>
            <div className={cn('f-subhead-2 font-bold', muted && 'text-card')}>
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
                      className={cn(
                        'text-secondary f-subhead-3 font-bold hover:text-accent transition-colors',
                        muted && 'text-secondary-foreground hover:text-white'
                      )}
                    >
                      {mainNavItem.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='w-6-cols sm:w-4-cols lg:w-6-cols'>
            <div className={cn('f-subhead-2 font-bold', muted && 'text-card')}>
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
                      className={cn(
                        'text-secondary f-subhead-3 font-bold hover:text-accent transition-colors',
                        muted && 'text-secondary-foreground hover:text-white'
                      )}
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
