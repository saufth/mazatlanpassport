'use client'
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
import { signinRoot } from '@/lib/actions/root'
import {
  signinRootSchema,
  type SigninRootInputs
} from '@/lib/validations/auth'
import { redirects } from '@/lib/constants'

export default function SigninForm () {
  const router = useRouter()
  const [isTransition, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SigninRootInputs>({
    resolver: zodResolver(signinRootSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (input: SigninRootInputs) => {
    startTransition(async () => {
      toast.message('Iniciando sesión..')
      const response = await signinRoot(input)

      if (!response.data) {
        toast.error(response.error)
        return
      }

      toast.success('Iniciaste sesión')
      form.reset()
      router.push(redirects.root.afterSignin)
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
                    placeholder='Tu nombre de usuario'
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
    </div>
  )
}
