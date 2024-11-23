'use client'
import { useRouter } from 'next/navigation'
import { useTransition, type ComponentPropsWithoutRef } from 'react'
import { CreateAdminForm } from '@/app/(protected)/root/dashboard/_components/create-admin-form'
import { Icons } from '@/components/icons'
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMediaQuery } from '@/hooks/use-media-query'
import {
  createAdminSchema,
  type CreateAdminInputs
} from '@/lib/validations/admin'
import { toast } from 'sonner'
import { createAdmin } from '@/lib/actions/admin'

interface CreateAdminDialogProps
  extends ComponentPropsWithoutRef<typeof Dialog> {
    rootId: string
}

export function CreateAdminDialog ({
  rootId,
  onOpenChange,
  ...props
}: CreateAdminDialogProps) {
  const router = useRouter()
  const [isCreatePending, startCreateTransaction] = useTransition()
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const form = useForm<CreateAdminInputs>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      email: '',
      name: '',
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
        router.push('/root/dashboard')
        toast.success('Administrador creado')
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
              <Button size='sm'>Crear administrador</Button>
            </DialogTrigger>
          )
        }
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Crea un nuevo administrador</DialogTitle>
            <DialogDescription>
              Crea un nuevo administrador para gestionar tiendas.
            </DialogDescription>
          </DialogHeader>
          <CreateAdminForm form={form} onSubmit={onSubmit}>
            <DialogFooter className='pt-4'>
              <DialogClose asChild>
                <Button type='button' variant='ghost'>
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                variant='secondary'
                type='submit'
                disabled={isCreatePending}
              >
                {isCreatePending && (
                  <Icons.Spinner
                    className='mr-2 size-4 animate-spin'
                    aria-hidden='true'
                  />
                )}
                Crear administrador
              </Button>
            </DialogFooter>
          </CreateAdminForm>
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
          <Button size='sm'>Crear administrador</Button>
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Crea un nuevo administrador</DrawerTitle>
          <DrawerDescription>
            Crea un nuevo administrador para gestionar tiendas.
          </DrawerDescription>
        </DrawerHeader>
        <CreateAdminForm form={form} onSubmit={onSubmit} className='px-4'>
          <DrawerFooter className='flex-col-reverse px-0'>
            <DrawerClose asChild>
              <Button type='button' variant='ghost'>
                Cancelar
              </Button>
            </DrawerClose>
            <Button
              variant='secondary'
              type='submit'
              disabled={isCreatePending}
            >
              {isCreatePending && (
                <Icons.Spinner
                  className='mr-2 size-4 animate-spin'
                  aria-hidden='true'
                />
              )}
              Crear administrador
            </Button>
          </DrawerFooter>
        </CreateAdminForm>
      </DrawerContent>
    </Drawer>
  )
}
