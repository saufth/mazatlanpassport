import { notFound } from 'next/navigation'
import { UpdateAdminNameForm } from '@/app/(protected)/_components/update-admin-name-form'
import { UpdateAdminEmailForm } from '@/app/(protected)/_components/update-admin-email-form'
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

export default async function DashboardRootPage ({
  params
}: DashboardAdminPageProps) {
  const { adminId } = await params
  const admin = await getAdminById({ adminId })

  if (!admin) {
    notFound()
  }

  return (
    <div>
      <div className='py-gutter space-y-gutter'>
        <Card as='section' className='p-gutter space-y-4 bg-popover'>
          <CardHeader className='space-y-1 px-0 py-0'>
            <CardTitle className='text-2xl'>
              Nombre
            </CardTitle>
            <CardDescription>
              Actualiza el nombre del administrador.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateAdminNameForm name={admin.name} />
          </CardContent>
        </Card>
        <Card as='section' className='p-gutter space-y-4 bg-popover'>
          <CardHeader className='space-y-1 px-0 py-0'>
            <CardTitle className='text-2xl'>
              Correo electrónico
            </CardTitle>
            <CardDescription>
              Actualiza el correo electrónico del administrador.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateAdminEmailForm email={admin.email} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
