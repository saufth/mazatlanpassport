'use client'
import { type ComponentPropsWithRef } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { type CreateStoreInputs } from '@/lib/validations/store'

interface CreateStoreFormProps
  extends Omit<ComponentPropsWithRef<'form'>, 'onSubmit'> {
    form: UseFormReturn<CreateStoreInputs>
    onSubmit: (data: CreateStoreInputs) => void
}

export function CreateStoreForm ({
  children,
  form,
  onSubmit,
  className,
  ...props
}: CreateStoreFormProps) {
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
                  placeholder='Nombre del establecimiento.'
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
          name='slogan'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slogan</FormLabel>
              <FormControl>
                <Input
                  placeholder='Slogan del establecimiento'
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Descripción del establecimiento'
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
              <FormLabel>Número de teléfono</FormLabel>
              <FormControl>
                <Input
                  inputMode='numeric'
                  placeholder='Número de teléfono del establecimiento'
                  {...field}
                  value={field.value ?? ''}
                  pattern='[0-9]*'
                  onChange={(e) => e.target.validity.valid && field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='website'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sitio web</FormLabel>
              <FormControl>
                <Input
                  placeholder='Sitio web del establecimiento'
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Dirección del establecimiento'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='googleMapsId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID de Google Maps</FormLabel>
              <FormControl>
                <Input
                  placeholder='ID de Google Maps del establecimiento'
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='reservation'
          render={({ field }) => (
            <FormItem className='w-full flex space-y-0 gap-x-spacing-2 pt-spacing-4'>
              <FormControl>
                <Checkbox
                  id='reservation'
                  checked={field.value}
                  // eslint-disable-next-line react/jsx-handler-names
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='grid gap-y-spacing-1'>
                <FormLabel className='f-body-1 font-medium'>
                  Reservación necesaria
                </FormLabel>
                <p className='f-body-2 text-muted-foreground'>
                  Puedes cambiar esta opción cuando sea necesario.
                </p>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  )
}
