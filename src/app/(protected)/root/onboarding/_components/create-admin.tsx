'use client'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { CreateAdminForm } from '@/app/(protected)/root/_components/create-admin-form'
import { StepHeader } from '@/app/(protected)/root/onboarding/_components/step-header'
import { createAdmin } from '@/lib/actions/admin'
import {
  createAdminSchema,
  type CreateAdminInputs
} from '@/lib/validations/admin'

interface CreateAdminProps {
  rootId: string
}

export function CreateAdmin ({ rootId }: CreateAdminProps) {
  const router = useRouter()
  const [isCreatePending, startCreateTransaction] = useTransition()

  const form = useForm<CreateAdminInputs>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  function onSubmit (input: CreateAdminInputs) {
    startCreateTransaction(async () => {
      const { data, error } = await createAdmin({ ...input, rootId })

      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        router.push(`/root/admin/${data.id}`)
      }

      form.reset()
    })
  }

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: 'spring' }}
    >
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        initial='hidden'
        animate='show'
        className='flex flex-col space-y-4 rounded-xl bg-background/60 p-8'
      >
        <StepHeader
          title='Comencemos creando un administrador'
          description='Puedes actualizar los datos del administrador en otro momento'
        />
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, type: 'spring' }
            }
          }}
        >
          <CreateAdminForm form={form} onSubmit={onSubmit}>
            <Button type='submit' disabled={isCreatePending}>
              {isCreatePending && (
                <Icons.Spinner className='mr-2 size-4 animate-spin' />
              )}
              Crear administrador
            </Button>
          </CreateAdminForm>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
