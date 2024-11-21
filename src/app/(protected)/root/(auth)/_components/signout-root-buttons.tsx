'use client'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { signoutRoot } from '@/lib/actions/root'
import { redirects } from '@/lib/constants'

export default function SignoutRootButtons () {
  const [isTransition, startTransition] = useTransition()
  const router = useRouter()

  const onClick = () => {
    startTransition(async () => {
      toast.message('Cerrando sesión..')
      const response = await signoutRoot()

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success('Cerraste sesión.')
      router.push(redirects.root.afterSignout)
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
