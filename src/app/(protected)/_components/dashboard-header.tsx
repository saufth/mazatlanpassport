import { PropsWithChildren } from 'react'
import ProtectedAuthDropdown from '@/app/(protected)/_components/protected-auth-dropdown'
import { type NameInputs } from '@/lib/validations/common/name'
import { type ProtectedRole } from '@/lib/constants'

interface DashboardHeaderProps
  extends PropsWithChildren {
    user: NameInputs & { role: ProtectedRole }
}

export function DashboardHeader ({
  children,
  user
}: DashboardHeaderProps) {
  return (
    <header className='w-full sticky top-0 z-50 border-b border-secondary-foreground/60'>
      <div className='flex h-14 items-center justify-between px-gutter'>
        {children}
        <nav className='flex items-center space-x-2'>
          <ProtectedAuthDropdown user={user} />
        </nav>
      </div>
    </header>
  )
}
