import SiteHeaderContent from '@/components/layouts/site-header-content'
import { getSession } from '@/lib/actions/session'
import { getUserFullName } from '@/lib/actions/users'
import { roles } from '@/lib/constants'

interface SiteHeaderProps {
  actions?: boolean
}

export default async function SiteHeader ({ actions = true }: SiteHeaderProps) {
  const session = await getSession(roles.user)
  const userId = !session.error ? { id: String(session.data!.id) } : null
  const userFullName = userId ? await getUserFullName(userId) : null

  return (
    <SiteHeaderContent
      actions={actions}
      user={userFullName?.data}
    />
  )
}
