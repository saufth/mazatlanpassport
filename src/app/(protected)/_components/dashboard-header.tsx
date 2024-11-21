import { type ReactNode } from 'react'
import DashboardAuthDropdown from '@/app/(protected)/_components/dashboard-auth-dropdown'
import { type NameInputs } from '@/lib/validations/common/name'
import { type ProtectedRole } from '@/lib/constants'

interface DashboardHeaderProps {
  user: NameInputs
  children?: ReactNode
  role: ProtectedRole
}

export function DashboardHeader ({
  children,
  user,
  role
}: DashboardHeaderProps) {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-secondary-foreground/60'>
      <div className='flex h-14 items-center px-6'>
        {children}
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            <DashboardAuthDropdown
              user={{
                name: user.name,
                role
              }}
            />
          </nav>
        </div>
      </div>
    </header>
  )
}
