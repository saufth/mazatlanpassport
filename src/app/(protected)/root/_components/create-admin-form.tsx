'use client'
import { useState, type ComponentPropsWithRef } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type UseFormReturn } from 'react-hook-form'
import { type CreateAdminInputs } from '@/lib/validations/admin'
import { cn } from '@/lib/utils'

interface CreateAdminFormProps
  extends Omit<ComponentPropsWithRef<'form'>, 'onSubmit'> {
    form: UseFormReturn<CreateAdminInputs>
    onSubmit: (data: CreateAdminInputs) => void
}

export function CreateAdminForm ({
  children,
  form,
  onSubmit,
  className,
  ...props
}: CreateAdminFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <Form {...form}>
      <form
        className={cn('grid w-full gap-4', className)}
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='off'
        {...props}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder='Nombre del grupo o empresa.'
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  placeholder='Correo electrónico del grupo o empresa.'
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
        {children}
      </form>
    </Form>
  )
}
