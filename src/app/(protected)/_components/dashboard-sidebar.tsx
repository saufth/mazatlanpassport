'use client'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import { type HTMLAttributes, type ReactNode } from 'react'
import { Icons } from '@/components/icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarNav } from '@/components/layouts/sidebar-nav'
import { cn } from '@/lib/utils'
import { roles, type Role } from '@/lib/constants'
import { type SidebarNavItem } from '@/types'

interface DashboardSidebarProps
  extends HTMLAttributes<HTMLElement> {
    children?: ReactNode
    role: Role
}

export function DashboardSidebar ({
  children,
  className,
  role,
  ...props
}: DashboardSidebarProps) {
  const segments = useSelectedLayoutSegments()

  const sidebarNav: Record<Role, SidebarNavItem[]> = {
    root: [
      {
        title: 'Dashboard',
        href: `/${roles.root}`,
        icon: 'Dashboard',
        active: segments.length === 0
      },
      {
        title: 'Admins',
        href: `/${roles.root}/admins`,
        icon: 'Person',
        active: segments.includes('admins')
      },
      {
        title: 'Customers',
        href: `/${roles.root}/customers`,
        icon: 'Avatar',
        active: segments.includes('customers')
      },
      {
        title: 'Analytics',
        href: `/${roles.root}/analytics`,
        icon: 'Analytics',
        active: segments.includes('analytics')
      },
      {
        title: 'Settings',
        href: `/${roles.root}/settings`,
        icon: 'Settings',
        active: segments.includes('settings')
      }
    ],
    admin: [
      {
        title: 'Dashboard',
        href: `/${roles.admin}`,
        icon: 'Dashboard',
        active: segments.length === 0
      },
      {
        title: 'Stores',
        href: `/${roles.admin}/stores`,
        icon: 'Store',
        active: segments.includes('stores')
      },
      {
        title: 'Analytics',
        href: `/${roles.admin}/analytics`,
        icon: 'Analytics',
        active: segments.includes('analytics')
      },
      {
        title: 'Settings',
        href: `/${roles.admin}/settings`,
        icon: 'Settings',
        active: segments.includes('settings')
      }
    ],
    user: [
      {
        title: 'Dashboard',
        href: `/${roles.user}`,
        icon: 'Dashboard',
        active: segments.length === 0
      },
      {
        title: 'Settings',
        href: `/${roles.user}/settings`,
        icon: 'Settings',
        active: segments.includes('settings')
      }
    ]
  }

  return (
    <aside className={cn('h-screen w-full', className)} {...props}>
      <div className='hidden h-[3.55rem] items-center border-b border-secondary-foreground/60 px-4 lg:flex lg:px-6'>
        <Link
          href='/'
          className='flex w-fit items-center font-heading tracking-wider text-foreground/90 transition-colors hover:text-foreground'
        >
          <Icons.LogotypeAlt className='size-28' aria-hidden='true' />
        </Link>
      </div>
      <div className='flex flex-col gap-2.5 px-4 pt-2 lg:px-6 lg:pt-4'>
        {children}
      </div>
      <ScrollArea className='h-[calc(100vh-8rem)] px-3 py-2.5 lg:px-5'>
        <SidebarNav items={sidebarNav[role]} className='p-1 pt-4' />
      </ScrollArea>
    </aside>
  )
}
