import { notFound } from 'next/navigation'
import { UpdateAdminForm } from '@/app/(protected)/_components/update-admin-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { getAdminById } from '@/lib/queries/admin'

interface DashboardAdminPageProps {
  params: Promise<{
    adminId: string
  }>
}

export default async function DashboardAdminPage ({
  params
}: DashboardAdminPageProps) {
  const { adminId } = await params
  const admin = await getAdminById({ adminId })

  if (!admin) {
    notFound()
  }

  return (
    <div>
      <div className='py-gutter'>
        <Card as='section' className='p-gutter space-y-4 bg-popover'>
          <CardHeader className='space-y-1 px-0 py-0'>
            <CardTitle className='text-2xl'>Actualizar administrador</CardTitle>
            <CardDescription>
              Actualiza el nombre y correo electrónico del administrador.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateAdminForm admin={admin} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
