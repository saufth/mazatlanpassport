'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signinAdmin } from '@/lib/actions/admin'
import {
  signinSchema,
  type SigninInputs
} from '@/lib/validations/auth'
import { redirects, userStatus } from '@/lib/constants'

export default function SigninAdminForm () {
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
      const response = await signinAdmin(input)

      if (!response.data) {
        toast.error(response.error)
        return
      }

      if (response.error === userStatus.unverified) {
        toast.error('Ingresa el código enviado a tu correo electrónico')
        router.push(`${redirects.admin.toVerify}/${response.data.id}`)
        return
      }

      toast.success('Iniciaste sesión')
      form.reset()
      router.push(redirects.admin.afterSignin)
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
      <div className='flex justify-between mt-spacing-4'>
        <div className='f-body-2'>
          ¿Olvidaste tu contraseña? <Link className='text-ring font-medium' href='/signin/reset-password'>Recuperar</Link>
        </div>
      </div>
    </div>
  )
}
