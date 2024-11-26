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
import { Button } from '@/components/ui/button'
import { updateAdminName } from '@/lib/actions/admin'
import { nameSchema, type NameInputs } from '@/lib/validations/common/name'

export function UpdateAdminNameForm ({ name }: NameInputs) {
  const { adminId } = useParams<{ adminId: string }>()
  const [isTransition, startTransition] = useTransition()

  const form = useForm<NameInputs>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name
    }
  })

  const onSubmit = async (input: NameInputs) => {
    startTransition(async () => {
      toast.message('Actualizando..')
      const response = await updateAdminName(adminId, input)

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success('Nombre actualizado con exito')
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
        <div className='mt-spacing-3'>
          <Button
            className='flex items-center gap-x-spacing-2'
            size='lg'
            disabled={isTransition}
            type='submit'
          >
            Actualizar nombre
          </Button>
        </div>
      </form>
    </Form>
  )
}
