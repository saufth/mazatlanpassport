'use client'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { CreateStoreForm } from '@/app/(protected)/admin/_components/create-store-form'
import { StepHeader } from '@/app/(protected)/root/onboarding/_components/step-header'
import { createStore } from '@/lib/actions/store'
import { createStoreSchema, type CreateStoreInputs } from '@/lib/validations/store'

interface CreateStoreProps {
  adminId: string
}

export function CreateStore ({ adminId }: CreateStoreProps) {
  const router = useRouter()
  const [isCreatePending, startCreateTransaction] = useTransition()

  const form = useForm<CreateStoreInputs>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: '',
      slogan: '',
      description: '',
      email: '',
      countryCode: 52,
      phone: undefined,
      website: '',
      address: '',
      googleMapsId: '',
      reservation: false
    }
  })

  function onSubmit (input: CreateStoreInputs) {
    startCreateTransaction(async () => {
      const response = await createStore({ ...input, adminId })

      if (response.error) {
        toast.error(response.error)
        return
      }

      if (response.data) {
        router.push(`/admin/store/${response.data.id}`)
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
          title='Comencemos creando un nuevo establecimiento'
          description='Puedes actualizar los datos del establecimiento en otro momento'
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
          <CreateStoreForm form={form} onSubmit={onSubmit}>
            <Button type='submit' disabled={isCreatePending}>
              {isCreatePending && (
                <Icons.Spinner className='mr-2 size-4 animate-spin' />
              )}
              Crear establecimiento
            </Button>
          </CreateStoreForm>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
