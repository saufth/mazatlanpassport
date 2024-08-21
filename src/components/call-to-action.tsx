import { type ComponentProps } from 'react'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { Button, type ButtonVariantProps } from '@/components/ui/button'
import NextLink from '@/components/ui/next-link'
import { cn } from '@/lib/utils'
import { siteNav } from '@/config/site'

const siteRoutes = {
  signin: siteNav.find((navItem) => navItem.href === '/suscribirse')!,
  login: siteNav.find((navItem) => navItem.href === '/iniciar-sesion')!
}

export interface CallToActionProps
  extends Pick<ComponentProps<typeof NextLink>, 'className' | 'onClick'>,
    ButtonVariantProps {
  children?: string
  to?: keyof typeof siteRoutes
  icon?: boolean
}

export const CallToAction = (
  {
    children,
    className,
    onClick,
    to = 'signin',
    size = 'lg',
    variant,
    icon
  }: CallToActionProps
) => {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn(
        'flex items-center gap-x-spacing-2',
        className
      )}
    >
      <NextLink
        href={siteRoutes[to].href}
        onClick={onClick}
      >
        {children || siteRoutes[to]?.title}
        {icon && <ArrowRightIcon className='[&_*]:fill-accent-foreground w-auto h-4 sm:h-[18px] -rotate-45' />}
      </NextLink>
    </Button>
  )
}
