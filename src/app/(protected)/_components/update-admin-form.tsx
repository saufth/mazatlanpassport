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
import {
  updateAdminSchema,
  type UpdateAdminInputs
} from '@/lib/validations/admin'
import { updateAdmin } from '@/lib/actions/admin'
import { Button } from '@/components/ui/button'

interface UpdateAdminFormProps {
  admin: UpdateAdminInputs
}

export function UpdateAdminForm ({ admin }: UpdateAdminFormProps) {
  const { adminId } = useParams<{ adminId: string }>()
  const [isTransition, startTransition] = useTransition()

  const form = useForm<UpdateAdminInputs>({
    resolver: zodResolver(updateAdminSchema),
    defaultValues: {
      name: admin.name,
      email: admin.email
    }
  })

  const onSubmit = async (input: UpdateAdminInputs) => {
    startTransition(async () => {
      toast.message('Actualizando..')
      const response = await updateAdmin(adminId, input)

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success('Administrador actualizado con exito')
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
          name='name'
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
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  placeholder='Correo electrónico del grupo o empresa.'
                  autoFocus
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
            Actualizar administrador
          </Button>
        </div>
      </form>
    </Form>
  )
}
