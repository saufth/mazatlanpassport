import Link from 'next/link'
import { type ComponentPropsWithRef } from 'react'
import {
  DashboardIcon,
  ExitIcon,
  GearIcon
} from '@radix-ui/react-icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button, type ButtonProps } from '@/components/ui/button'
import { CallToAction } from '@/components/call-to-action'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { type EmailInputs } from '@/lib/validations/common/email'
import { type FullNameInputs } from '@/lib/validations/common/name'

interface AuthDropdownProps
  extends ComponentPropsWithRef<typeof DropdownMenuTrigger>,
    ButtonProps {
      user?: (FullNameInputs & EmailInputs) | null
      actions?: boolean
      action?: () => void
}

export default function AuthDropdown ({
  user,
  actions,
  action,
  className,
  ...props
}: AuthDropdownProps) {
  if (!user) {
    if (actions) {
      return (
        <div className='hidden lg:flex items-center gap-x-spacing-3'>
          <CallToAction
            to='signin'
            onClick={action}
            size='default'
            variant='ghost'
            className='inline-flex'
          />
          <CallToAction
            onClick={action}
            size='default'
            className='inline-flex'
          />
        </div>
      )
    }
    return
  }

  const initials = `${user.firstName?.charAt(0) ?? ''} ${user.lastName?.charAt(0) ?? ''}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className={cn('size-9 px-0 py-0 rounded-full bg-transparent', className)}
          {...props}
        >
          <Avatar className='bg-white size-9'>
            <AvatarFallback className='bg-gradient-to-tr from-accent via-accent/70 to-accent/50'>
              <span className='pr-px text-white -tracking-[0.1em] leading-none uppercase'>
                {initials}
              </span>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {user.firstName} {user.lastName}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-secondary-foreground' />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/profile'>
              <DashboardIcon className='mr-2 size-4' aria-hidden='true' />
              Perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href='/profile/settings'>
              <GearIcon className='mr-2 size-4' aria-hidden='true' />
              Configuración
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='bg-secondary-foreground' />
        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href='/signout'>
            <ExitIcon className='mr-2 size-4' aria-hidden='true' />
            Cerrar sesión
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
