import Link from 'next/link'
import { type ComponentProps } from 'react'
import { Button, type ButtonVariantProps } from '@/components/ui/button'
import { siteNav } from '@/config/site'

const callToActionRoutes = {
  subscribe: siteNav.find((navItem) => navItem.href === '/signup')!,
  login: siteNav.find((navItem) => navItem.href === '/signin')!
}

export type CallToActionRoutes = keyof typeof callToActionRoutes

export interface CallToActionProps
  extends Pick<ComponentProps<typeof Link>, 'children' | 'className' | 'onClick'>,
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
      <Link
        href={callToActionRoutes[to].href}
        onClick={onClick}
      >
        {children || callToActionRoutes[to]?.title}
      </Link>
    </Button>
  )
}
