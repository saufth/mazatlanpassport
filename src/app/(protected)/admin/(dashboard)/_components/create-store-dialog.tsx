'use client'
import { useRouter } from 'next/navigation'
import { useTransition, type ComponentPropsWithoutRef } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { CreateStoreForm } from '@/app/(protected)/admin/_components/create-store-form'
import { Icons } from '@/components/icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMediaQuery } from '@/hooks/use-media-query'
import { createStoreSchema, type CreateStoreInputs } from '@/lib/validations/store'
import { createStore } from '@/lib/actions/store'

interface CreateStoreDialogProps
  extends ComponentPropsWithoutRef<typeof Dialog> {
    adminId: string
}

export function CreateStoreDialog ({
  adminId,
  onOpenChange,
  ...props
}: CreateStoreDialogProps) {
  const router = useRouter()
  const [isTransitionPending, startTransition] = useTransition()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const form = useForm<CreateStoreInputs>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: '',
      slogan: '',
      description: '',
      countryCode: 52,
      phone: undefined,
      website: '',
      address: '',
      googleMapsId: '',
      reservation: false
    }
  })

  function onSubmit (input: CreateStoreInputs) {
    startTransition(async () => {
      const { data, error } = await createStore({ ...input, adminId })

      if (error) {
        toast.error(error)
        return
      }

      if (data) {
        router.push(`/root/admin/${data.id}`)
        toast.success('Administrador creado con exito')
      }

      onOpenChange?.(false)
      form.reset()
    })
  }

  if (isDesktop) {
    return (
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            form.reset()
          }
          onOpenChange?.(open)
        }}
        {...props}
      >
        {
          /**
           * If onOpenChange is provided, the drawer is controlled by the parent component.
           * In this case, we don't show the trigger button.
           */
          !onOpenChange && (
            <DialogTrigger asChild>
              <Button size='sm'>Crear establecimiento</Button>
            </DialogTrigger>
          )
        }
        <DialogContent className='max-w-lg h-full max-h-[calc(100dvh-var(--outer-gutter))] overflow-x-hidden'>
          <DialogHeader>
            <DialogTitle>Crea un nuevo establecimiento</DialogTitle>
            <DialogDescription>
              Crea un nuevo establecimiento y comienza a ofrecer tus productos en linea.
            </DialogDescription>
          </DialogHeader>
          <CreateStoreForm form={form} onSubmit={onSubmit}>
            <DialogFooter className='pt-4'>
              <DialogClose asChild>
                <Button type='button' variant='ghost'>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                variant='secondary'
                type='submit'
                disabled={isTransitionPending}
              >
                {isTransitionPending && (
                  <Icons.Spinner
                    className='mr-2 size-4 animate-spin'
                    aria-hidden='true'
                  />
                )}
                Crear establecimiento
              </Button>
            </DialogFooter>
          </CreateStoreForm>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      onOpenChange={(open) => {
        if (!open) {
          form.reset()
        }
        onOpenChange?.(open)
      }}
      {...props}
    >
      {!onOpenChange && (
        <DrawerTrigger asChild>
          <Button size='sm'>Crear establecimiento</Button>
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Crea un nuevo establecimiento</DrawerTitle>
          <DrawerDescription>
            Crea un nuevo establecimiento y comienza a ofrecer tus productos en linea.
          </DrawerDescription>
        </DrawerHeader>
        <CreateStoreForm form={form} onSubmit={onSubmit} className='px-4'>
          <DrawerFooter className='flex-col-reverse px-0'>
            <DrawerClose asChild>
              <Button type='button' variant='ghost'>
                Cancelar
              </Button>
            </DrawerClose>
            <Button
              variant='secondary'
              type='submit'
              disabled={isTransitionPending}
            >
              {isTransitionPending && (
                <Icons.Spinner
                  className='mr-2 size-4 animate-spin'
                  aria-hidden='true'
                />
              )}
              Crear establecimiento
            </Button>
          </DrawerFooter>
        </CreateStoreForm>
      </DrawerContent>
    </Drawer>
  )
}
