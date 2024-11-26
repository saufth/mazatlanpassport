'use client'
import {
  useParams,
  usePathname,
  useRouter
} from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { CreateAdminDialog } from '@/app/(protected)/root/(dashboard)/_components/create-admin-dialog'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Icons } from '@/components/icons'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar'
import { type getAdminsByRootId } from '@/lib/queries/admin'
import { cn } from '@/lib/utils'

interface StoreSwitcherProps {
  rootId: string
  adminsPromise: ReturnType<typeof getAdminsByRootId>
}

export function AdminSwitcher ({ rootId, adminsPromise }: StoreSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { adminId } = useParams<{ adminId: string }>()

  const admins = use(adminsPromise)
  const [activeAdmin, setActiveAdmin] = useState(admins?.find((adminItem) => adminItem.id === adminId))
  const [showNewAdminDialog, setShowNewAdminDialog] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const { isMobile } = useSidebar()

  useEffect(() => {
    setActiveAdmin(admins?.find((adminItem) => adminItem.id === adminId))
  }, [adminId, admins])

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu open={isOpen} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Icons.Person className='size-5 [&_*]:fill-white' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {activeAdmin?.name}
                  </span>
                  <span className='truncate text-xs'>
                    {activeAdmin?.email}
                  </span>
                </div>
                <Icons.ChevronsUpDown className='ml-auto' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
              align='start'
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuLabel className='text-xs text-muted-foreground'>
                Administradores
              </DropdownMenuLabel>
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
                              setActiveAdmin(admin)
                              setOpen(false)
                              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                              pathname.includes(admin.id)
                                ? router.replace(pathname.replace(adminId, admin.id))
                                : router.push(`/root/admin/${admin.id}`)
                            }}
                          >
                            <div className='flex size-6 items-center justify-center bg-popover rounded-sm border'>
                              <Icons.Person className='size-4 shrink-0' />
                            </div>
                            {admin.name}
                            <Icons.Check
                              className={cn(
                                'ml-auto size-4',
                                activeAdmin?.id === admin.id
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
                      onSelect={() => { setShowNewAdminDialog(true) }}
                      className='text-muted-foreground font-medium group'
                    >
                      <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                        <Icons.Plus className='size-4' />
                      </div>
                      Crear administradores
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <CreateAdminDialog
        rootId={rootId}
        open={showNewAdminDialog}
        onOpenChange={setShowNewAdminDialog}
      />
      {/* <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='ghost'
            role='combobox'
            aria-expanded={open}
            aria-label='Seleccionar admin'
            className={cn('w-full justify-between', className)}
            {...props}
          >
            {activeAdmin?.name ?? 'Seleccionar admin'}
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
                            : router.push(`/root/admin/${admin.id}`)
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
                            activeAdmin?.id === admin.id
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
      {admins?.map((admin, index) => (
        <DropdownMenuItem
          key={admin.name}
          onClick={() => setActiveAdmin(admin)}
          className='gap-2 p-2'
        >
          <div className='flex size-6 items-center justify-center bg-popover rounded-sm border'>
            <Icons.Person className='size-4 shrink-0' />
          </div>
          {admin.name}
          <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
        </DropdownMenuItem>
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem className='gap-2 p-2 group'>
        <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
          <Icons.Plus className='size-4' />
        </div>
        <div className='font-medium text-muted-foreground group-hover:text-accent-foreground'>
          Crear administrador
        </div>
      </DropdownMenuItem> */}
    </>
  )
}
