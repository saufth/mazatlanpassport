import { type ComponentProps } from 'react'
import { Button, type ButtonVariantProps } from '@/components/ui/button'
import NextLink from '@/components/ui/next-link'
import { siteNav } from '@/config/site'

const callToActionRoutes = {
  subscribe: siteNav.find((navItem) => navItem.href === '/registrarse')!,
  login: siteNav.find((navItem) => navItem.href === '/iniciar-sesion')!
}

export type CallToActionRoutes = keyof typeof callToActionRoutes

export interface CallToActionProps
  extends Pick<ComponentProps<typeof NextLink>, 'children' | 'className' | 'onClick'>,
    ButtonVariantProps {
  to?: CallToActionRoutes
}

export const CallToAction = (
  {
    children,
    className,
    onClick,
    to = 'subscribe',
    size = 'lg',
    variant
  }: CallToActionProps
) => {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={className}
    >
      <NextLink
        href={callToActionRoutes[to].href}
        onClick={onClick}
        className='uppercase'
      >
        {children || callToActionRoutes[to]?.title}
      </NextLink>
    </Button>
  )
}
