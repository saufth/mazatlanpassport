import { redirect } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import { DashboardHeader } from '@/app/(protected)/_components/dashboard-header'
import { DashboardSidebar } from '@/app/(protected)/_components/dashboard-sidebar'
import { SidebarProvider } from '@/components/layouts/sidebar-provider'
import { getCachedRoot } from '@/lib/queries/root'
import { protectedRoles } from '@/lib/constants'

export default async function DashboardRootLayout ({
  children
}: PropsWithChildren) {
  const root = await getCachedRoot()
  const rootRole = protectedRoles.root

  if (!root) {
    redirect(`/${rootRole}/signin`)
  }

  return (
    <SidebarProvider>
      <div className='grid min-h-screen w-full lg:grid-cols-[17.5rem_1fr]'>
        <DashboardSidebar
          role={rootRole}
          className='top-0 z-30 hidden flex-col gap-4 border-r border-secondary-foreground/60 lg:sticky lg:block'
        />
        <div className='flex flex-col'>
          <DashboardHeader
            user={{ name: root.username }}
            role={rootRole}
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
