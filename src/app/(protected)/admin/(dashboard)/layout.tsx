import { redirect } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header'
import { DashboardSidebar } from '@/app/(protected)/_components/dashboard-sidebar'
import { SidebarProvider } from '@/components/layouts/sidebar-provider'
import { getCachedAdmin } from '@/lib/queries/admin'
import { protectedRoles, redirects } from '@/lib/constants'

export default async function DashboardAdminLayout ({
  children
}: PropsWithChildren) {
  const admin = await getCachedAdmin()
  const adminRole = protectedRoles.admin

  if (!admin) {
    redirect(redirects.admin.toSignin)
  }

  return (
    <SidebarProvider>
      <div className='grid min-h-screen w-full lg:grid-cols-[17.5rem_1fr]'>
        <DashboardSidebar
          role={adminRole}
          className='top-0 z-30 hidden flex-col gap-4 border-r border-secondary-foreground/60 lg:sticky lg:block'
        />
        <div className='flex flex-col'>
          <DashboardHeader
            user={{
              name: admin.name,
              role: adminRole
            }}
          />
          <div className='flex flex-col'>
            <main className='flex-1 overflow-hidden px-gutter'>
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
