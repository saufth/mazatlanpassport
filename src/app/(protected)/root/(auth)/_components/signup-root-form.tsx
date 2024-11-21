'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
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
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createRoot } from '@/lib/actions/root'
import {
  createRootSchema,
  type CreateRootInputs
} from '@/lib/validations/root'

export default function SignupRootForm () {
  const router = useRouter()
  const [isTransition, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<CreateRootInputs>({
    resolver: zodResolver(createRootSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = (inputs: CreateRootInputs) => {
    startTransition(async () => {
      toast.message('Registrando..')
      const response = await createRoot(inputs)

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success('Registro exitoso')
      form.reset()
      router.push('/root/admins')
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
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input
                    placeholder='ej. admin'
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
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <div className='flex justify-between'>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <div className='flex items-center gap-x-spacing-2'>
                    <div
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='flex items-center gap-x-spacing-1 text-xs sm:text-sm text-secondary cursor-pointer'
                    >
                      {showConfirmPassword
                        ? (<>Ocultar <EyeClosedIcon className='w-3.5 sm:w-4 h-auto' /></>)
                        : (<>Mostrar <EyeOpenIcon className='w-3.5 sm:w-4 h-auto' /></>)}
                    </div>
                  </div>
                </div>
                <FormControl>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
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
              className='lg:w-full flex items-center gap-x-spacing-2'
              size='full'
              disabled={isTransition}
            >
              Registrar
            </Button>
          </div>
        </form>
      </Form>
      <div className='f-body-2 mt-spacing-4'>
        <Link href='/root/signin' className='text-ring font-medium'>
          Inicia sesión
        </Link>
      </div>
    </div>
  )
}
