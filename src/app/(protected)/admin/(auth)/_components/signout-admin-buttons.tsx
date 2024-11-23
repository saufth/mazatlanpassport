'use client'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { signoutAdmin } from '@/lib/actions/admin'
import { redirects } from '@/lib/constants'

export default function SignoutAdminButtons () {
  const [isTransition, startTransition] = useTransition()
  const router = useRouter()

  const onClick = () => {
    startTransition(async () => {
      toast.message('Cerrando sesión..')
      const response = await signoutAdmin()

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success('Cerraste sesión.')
      router.push(redirects.admin.afterSignout)
    })
  }

  return (
    <div className='flex justify-center gap-spacing-2'>
      <Button
        variant='ghost'
        onClick={() => router.back()}
        className='w-full lg:w-full'
        disabled={isTransition}
      >
        Regresar
      </Button>
      <Button
        onClick={onClick}
        className='w-full lg:w-full'
        disabled={isTransition}
      >
        Cerrar sesión
      </Button>
    </div>
  )
}
