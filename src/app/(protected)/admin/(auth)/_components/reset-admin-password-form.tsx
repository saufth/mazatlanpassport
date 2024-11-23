'use client'
import { useParams, useRouter } from 'next/navigation'
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
import { resetAdminPassword } from '@/lib/actions/admin'
import {
  resetPasswordSchema,
  type ResetPasswordInputs
} from '@/lib/validations/auth'
import { type UUIDInputs } from '@/lib/validations/common/uuid'
import { redirects } from '@/lib/constants'

export default function ResetAdminPasswordForm () {
  const router = useRouter()
  const { id } = useParams<UUIDInputs>()
  const [isTransition, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      id,
      password: '',
      confirmPassword: '',
      code: undefined
    }
  })

  const onSubmit = (inputs: ResetPasswordInputs) => {
    startTransition(async () => {
      toast.message('Procesando')
      const response = await resetAdminPassword(inputs)

      if (response.error) {
        toast.error(response.error)
        return
      }

      router.push(redirects.admin.toVerify)
      toast.success('Contraseña actualizada exitosamente')
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
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between'>
                <FormLabel>Contraseña nueva</FormLabel>
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
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de verificación</FormLabel>
              <FormControl>
                <Input
                  inputMode='numeric'
                  placeholder='169284'
                  {...field}
                  value={field.value || ''}
                  pattern='[0-9]*'
                  onChange={(e) => e.target.validity.valid && field.onChange(e.target.value)}
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
            type='submit'
          >
            Cambiar contraseña
          </Button>
        </div>
      </form>
    </Form>
  )
}
