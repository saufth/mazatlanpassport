'use client'
import { useRef, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
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
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Inputs, contactSchema } from '@/lib/validations/email'

export default function SigninForm () {
  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: ''
    }
  })

  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit = async (data: Inputs) => {
    startTransition(async () => {
      const response = await fetch('/api/email/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        switch (response.status) {
          case 422:
            toast.error('Entrada invalida.')
            break
          case 500:
            toast.error('Algo salió mal. Inténtalo de nuevo más tarde.')
            break
          default:
            toast.error('Algo salió mal. Inténtalo de nuevo más tarde.')
        }
        return
      }

      toast.success('Hemos recibido tu mensaje. En breve serás atendido por un asesor.')
      form.reset()
    })
  }

  return (
    <Form {...form}>
      <form
        className='space-y-4'
        // eslint-disable-next-line no-void
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        ref={formRef}
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
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  className='rounded-none'
                  placeholder='Ingresa tu contraseña'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='pt-spacing-4'>
          <Button
            className='[&>*]:text-accent-foreground lg:w-full'
            size='full'
            disabled={isPending}
          >
            {isPending
              ? (
                <span className='flex items-center gap-x-2'>
                  Enviando <Icons.Spinner className='h-3 w-3' aria-hidden='true' />
                </span>)
              : (
                <span className='pt-px lg:pt-0 flex items-center gap-x-spacing-2 lg:font-medium text-xs lg:text-sm tracking-wider'>
                  Iniciar sesión <ArrowTopRightIcon className='h-3 xl:h-3 w-3.5 xl:w-3.5 [&>*]:fill-accent-foreground' aria-hidden='true' />
                </span>)}
          </Button>
        </div>
      </form>
    </Form>
  )
}
