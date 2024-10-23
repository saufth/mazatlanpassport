'use client'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
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
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signin } from '@/lib/actions/auth'
import { type SigninInputs, signinSchema } from '@/lib/validations/auth/signin'
import { userStatus } from '@/lib/constants'

export default function SigninForm () {
  const router = useRouter()
  const [isTransition, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SigninInputs>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (input: SigninInputs) => {
    startTransition(async () => {
      toast.message('Iniciando sesión..')
      const response = await signin(input)

      if (!response.data) {
        toast.error(response.error)
        return
      }

      if (response.error === userStatus.unverified) {
        toast.error('Ingresa el codigo enviado a tu correo electrónico')
        router.push(`/signup/verify-email/${response.data.id}`)
        return
      }

      toast.success('Iniciaste sesión')
      form.reset()
      router.push('/profile')
    })
  }

  return (
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between'>
                <FormLabel>Contraseña</FormLabel>
                <div className='flex items-center gap-x-spacing-2'>
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className='flex items-center gap-x-spacing-1 text-xs sm:text-sm text-secondary cursor-pointer'
                  >
                    {showPassword
                      ? (<>Ocultar <EyeClosedIcon className='w-3.5 sm:w-4 h-auto' /></>)
                      : (<>Mostrar <EyeOpenIcon className='w-3.5 sm:w-4 h-auto' /></>)}
                  </div>
                </div>
              </div>
              <FormControl>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••••••'
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
            Iniciar sesión
          </Button>
        </div>
      </form>
    </Form>
  )
}
