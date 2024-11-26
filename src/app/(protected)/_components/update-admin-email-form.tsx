'use client'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { updateAdminEmail } from '@/lib/actions/admin'
import { emailSchema, type EmailInputs } from '@/lib/validations/common/email'

export function UpdateAdminEmailForm ({ email }: EmailInputs) {
  const { adminId } = useParams<{ adminId: string }>()
  const [isTransition, startTransition] = useTransition()

  const form = useForm<EmailInputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email
    }
  })

  const onSubmit = async (input: EmailInputs) => {
    startTransition(async () => {
      toast.message('Actualizando..')
      const response = await updateAdminEmail(adminId, input)

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success('Correo electrónico actualizado con exito')
    })
  }

  return (
    <Form {...form}>
      <form
        className='grid w-full max-w-2xl gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder='Nombre del grupo o empresa.'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-spacing-3'>
          <Button
            className='flex items-center gap-x-spacing-2'
            size='lg'
            disabled={isTransition}
            type='submit'
          >
            Actualizar correo electrónico
          </Button>
        </div>
      </form>
    </Form>
  )
}
