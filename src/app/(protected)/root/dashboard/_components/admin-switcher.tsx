'use client'
import { useParams, usePathname, useRouter } from 'next/navigation'
import {
  use,
  useState,
  type ComponentPropsWithoutRef
} from 'react'
import {
  CaretSortIcon,
  CheckIcon,
  PersonIcon,
  PlusCircledIcon
} from '@radix-ui/react-icons'
import { CreateAdminDialog } from '@/app/(protected)/root/dashboard/_components/create-admin-dialog'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { type getAdminsByRootId } from '@/lib/queries/admin'
import { cn } from '@/lib/utils'

interface StoreSwitcherProps
  extends ComponentPropsWithoutRef<typeof PopoverTrigger> {
  rootId: string
  adminsPromise: ReturnType<typeof getAdminsByRootId>
}

export function AdminSwitcher ({
  rootId,
  adminsPromise,
  className,
  ...props
}: StoreSwitcherProps) {
  const { adminId } = useParams<{ adminId: string }>()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [showNewAdminDialog, setShowNewAdminDialog] = useState(false)

  const admins = use(adminsPromise)

  const selectedAdmin = admins?.find((admin) => admin.id === adminId)

  return (
    <>
      <CreateAdminDialog
        rootId={rootId}
        open={showNewAdminDialog}
        onOpenChange={setShowNewAdminDialog}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            role='combobox'
            aria-expanded={open}
            aria-label='Seleccionar admin'
            className={cn('w-full justify-between', className)}
            {...props}
          >
            {selectedAdmin?.name ?? 'Seleccionar admin'}
            <CaretSortIcon
              className='ml-auto size-4 shrink-0 opacity-50'
              aria-hidden='true'
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
          <Command>
            <CommandList>
              <CommandInput placeholder='Buscar administrador...' />
              <CommandEmpty>Sin administradores.</CommandEmpty>
              {admins
                ? (
                  <CommandGroup>
                    {admins?.map((admin) => (
                      <CommandItem
                        key={admin.id}
                        onSelect={() => {
                          setOpen(false)
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                          pathname.includes(admin.id)
                            ? router.replace(pathname.replace(adminId, admin.id))
                            : router.push(`/root/dashboard/admins/${admin.id}`)
                        }}
                      >
                        <PersonIcon
                          className='mr-2 size-4 text-muted-foreground'
                          aria-hidden='true'
                        />
                        {admin.name}
                        <CheckIcon
                          className={cn(
                            'ml-auto size-4',
                            selectedAdmin?.id === admin.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                          aria-hidden='true'
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>)
                : (
                  <div className='px-2 py-1.5 text-sm'>
                    Sin administradores
                  </div>)}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    setShowNewAdminDialog(true)
                  }}
                >
                  <PlusCircledIcon className='mr-2 size-4' aria-hidden='true' />
                  Crear administrador
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
