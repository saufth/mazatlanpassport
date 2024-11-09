'use client'
import { FormEvent, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { managePlan } from '@/lib/actions/stripe'
import { type ManagePlanInputs } from '@/lib/validations/stripe'

type ManagePlanProps = ManagePlanInputs

export default function ManagePlan (props: ManagePlanProps) {
  const [isTransition, startTransition] = useTransition()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(async () => {
      toast.message('Procesando..')

      const { data, error } = await managePlan(props)

      if (data?.url) {
        window.location.href = data.url
        return
      }

      if (error) {
        toast.error(error)
      }
    })
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Button variant='secondary' disabled={isTransition}>
        ¡Obtener plan!
      </Button>
    </form>
  )
}
