'use client'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { signout } from '@/lib/actions/auth'
import { redirects, roles } from '@/lib/constants'

export default function SignoutButtons () {
  const router = useRouter()
  const [isTransition, startTransition] = useTransition()

  const role = roles.user

  const onClick = () => {
    startTransition(async () => {
      toast.message('Cerrando sesión..')
      const response = await signout(role)

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success('Cerraste sesión.')
      router.push(redirects.afterSignout)
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
