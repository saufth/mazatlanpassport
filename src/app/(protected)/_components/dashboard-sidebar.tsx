'use client'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import { type ComponentProps } from 'react'
import { Icons } from '@/components/icons'
import DashboardAuthDropdown from '@/app/(protected)/_components/dashboard-auth-dropdown'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'
import { type NameInputs } from '@/lib/validations/common/name'
import { type EmailInputs } from '@/lib/validations/common/email'
import { roles, type ProtectedRole } from '@/lib/constants'
import { type SidebarNavItem } from '@/types'

interface DashboardSidebarProps
  extends ComponentProps<typeof Sidebar> {
      user: NameInputs & Partial<EmailInputs> & { role: ProtectedRole }
}

export function DashboardSidebar ({ children, user }: DashboardSidebarProps) {
  const segments = useSelectedLayoutSegments()

  const sidebarNav: Record<ProtectedRole, SidebarNavItem[]> = {
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
    ]
  }

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        {children}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Administradores
          </SidebarGroupLabel>
          <SidebarMenu>
            {sidebarNav[user.role].map((item) => {
              const Icon = Icons[item.icon ?? 'ChevronsUpDown']

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <Icon />
                      <span>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DashboardAuthDropdown user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
