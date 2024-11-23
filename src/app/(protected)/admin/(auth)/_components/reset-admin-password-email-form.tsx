'use client'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetAdminPasswordEmailCode } from '@/lib/actions/admin'
import { type EmailInputs, emailSchema } from '@/lib/validations/common/email'
import { redirects } from '@/lib/constants'

export default function ResetAdminPasswordEmailForm () {
  const router = useRouter()
  const [isTransition, startTransition] = useTransition()

  const form = useForm<EmailInputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (input: EmailInputs) => {
    startTransition(async () => {
      toast.message('Iniciando sesión..')
      const response = await resetAdminPasswordEmailCode(input)

      if (!response.data) {
        toast.error(response.error)
        return
      }

      toast.success('Ingresa el código enviado a tu correo electrónico')
      router.push(`/${redirects.admin.toVerify}/reset-password/confirm/${response.data.id}`)
    })
  }

  return (
    <div>
      <Form {...form}>
        <form
          className='space-y-spacing-3'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder='ej. correo@ejemplo.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='pt-spacing-4'>
            <Button
              className='lg:w-full'
              size='full'
              disabled={isTransition}
            >
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
