'use client'
import { useParams, useRouter } from 'next/navigation'
import { useTransition } from 'react'
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifyEmail } from '@/lib/actions/auth'
import { type VerifyCodeInputs, verifyCodeSchema } from '@/lib/validations/verify-code'
import type { UUIDInputs } from '@/lib/validations/uuid'

export default function VerifyEmailForm () {
  const router = useRouter()
  const { id } = useParams<UUIDInputs>()
  const [isTransition, startTransition] = useTransition()

  const form = useForm<VerifyCodeInputs>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      id,
      code: undefined
    }
  })

  const onSubmit = (inputs: VerifyCodeInputs) => {
    startTransition(async () => {
      toast.message('Verificando..')
      const response = await verifyEmail(inputs)

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success('Verificación exitoso!')
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
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codigo de verificación</FormLabel>
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
            Verificar codigo
          </Button>
        </div>
      </form>
    </Form>
  )
}
