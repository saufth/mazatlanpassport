import Link from 'next/link'
import { type ComponentPropsWithRef } from 'react'
import {
  DashboardIcon,
  ExitIcon,
  GearIcon
} from '@radix-ui/react-icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button, type ButtonProps } from '@/components/ui/button'
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
import { type NameInputs } from '@/lib/validations/common/name'
import { type ProtectedRole } from '@/lib/constants'

interface DashboardAuthDropdownProps
  extends ComponentPropsWithRef<typeof DropdownMenuTrigger>,
    ButtonProps {
      user: NameInputs & Partial<EmailInputs> & { role: ProtectedRole }
}

export default function DashboardAuthDropdown ({
  className,
  user,
  role,
  ...props
}: DashboardAuthDropdownProps) {
  if (!user) {
    return
  }

  const initials = `${user.name.charAt(0) ?? ''}`

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
            <div className='text-sm font-medium leading-none'>
              {user.name}
            </div>
            {user.email && (
              <div className='text-xs leading-none text-muted-foreground'>
                {user.email}
              </div>)}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-secondary-foreground' />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href={`/${role}`}>
              <DashboardIcon className='mr-2 size-4' aria-hidden='true' />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link href={`/${role}/settings`}>
              <GearIcon className='mr-2 size-4' aria-hidden='true' />
              Configuración
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className='bg-secondary-foreground' />
        <DropdownMenuItem asChild className='cursor-pointer'>
          <Link href={`/${role}/signout`}>
            <ExitIcon className='mr-2 size-4' aria-hidden='true' />
            Cerrar sesión
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
