import Link from 'next/link'
import { type ComponentPropsWithRef } from 'react'
import {
  DashboardIcon,
  ExitIcon,
  GearIcon
} from '@radix-ui/react-icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { type EmailInputs } from '@/lib/validations/common/email'
import { type NameInputs } from '@/lib/validations/common/name'
import { type ProtectedRole } from '@/lib/constants'
import { Icons } from '@/components/icons'

interface DashboardAuthDropdownProps
  extends ComponentPropsWithRef<typeof DropdownMenuTrigger>,
  ComponentPropsWithRef<typeof SidebarMenuButton> {
      user: NameInputs & Partial<EmailInputs> & { role: ProtectedRole }
}

export default function DashboardAuthDropdown ({
  className,
  user,
  ...props
}: DashboardAuthDropdownProps) {
  const { isMobile } = useSidebar()

  const initials = `${user.name.charAt(0) ?? ''}`

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className={cn('data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground', className)}
              {...props}
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className='bg-accent text-lg text-accent-foreground rounded-lg font-semibold'>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user.name}</span>
                {user.email && (
                  <span className='truncate text-xs'>
                    {user.email}
                  </span>)}
              </div>
              <Icons.ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className='bg-accent text-lg text-accent-foreground rounded-lg font-semibold'>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user.name}</span>
                  {user.email && (
                    <span className='truncate text-xs'>
                      {user.email}
                    </span>)}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-secondary-foreground' />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href={`/${user.role}`}>
                  <DashboardIcon aria-hidden='true' />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href={`/${user.role}/settings`}>
                  <GearIcon aria-hidden='true' />
                  Configuración
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className='bg-secondary-foreground' />
            <DropdownMenuItem asChild className='cursor-pointer'>
              <Link href={`/${user.role}/signout`}>
                <ExitIcon aria-hidden='true' />
                Cerrar sesión
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
