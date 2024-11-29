'use client'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
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
import { CreateStoreDialog } from '@/app/(protected)/admin/(dashboard)/_components/create-store-dialog'
import { type getStoresByAdminId } from '@/lib/queries/store'
import { cn } from '@/lib/utils'

interface StoreSwitcherProps {
  adminId: string
  storesPromise: ReturnType<typeof getStoresByAdminId>
}

export function StoreSwitcher ({ adminId, storesPromise }: StoreSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { storeId } = useParams<{ storeId: string }>()

  const stores = use(storesPromise)

  const [activeStore, setActiveStore] = useState(stores?.find((storeItem) => storeItem.id === storeId))
  const [showNewStoreDialog, setShowNewStoreDialog] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const { isMobile } = useSidebar()

  useEffect(() => {
    setActiveStore(stores?.find((storeItem) => storeItem.id === storeId))
  }, [storeId, stores])

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
                    {activeStore?.name}
                  </span>
                  {activeStore?.slogan && (
                    <span className='truncate text-xs'>
                      {activeStore.slogan}
                    </span>
                  )}
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
                Establecimientos
              </DropdownMenuLabel>
              <Command>
                <CommandList>
                  <CommandInput placeholder='Buscar administrador...' />
                  <CommandEmpty>Sin establecimiento.</CommandEmpty>
                  {stores
                    ? (
                      <CommandGroup>
                        {stores?.map((store) => (
                          <CommandItem
                            key={store.id}
                            onSelect={() => {
                              setActiveStore(store)
                              setOpen(false)
                              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                              pathname.includes(store.id)
                                ? router.replace(pathname.replace(storeId, store.id))
                                : router.push(`/admin/store/${store.id}`)
                            }}
                          >
                            <div className='flex size-6 items-center justify-center bg-popover rounded-sm border'>
                              <Icons.Person className='size-4 shrink-0' />
                            </div>
                            {store.name}
                            <Icons.Check
                              className={cn(
                                'ml-auto size-4',
                                activeStore?.id === store.id
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
                        Sin establecimientos
                      </div>)}
                </CommandList>
                <CommandSeparator />
                <CommandList>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => { setShowNewStoreDialog(true) }}
                      className='text-muted-foreground font-medium group'
                    >
                      <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                        <Icons.Plus className='size-4' />
                      </div>
                      Crear establecimiento
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <CreateStoreDialog
        adminId={adminId}
        open={showNewStoreDialog}
        onOpenChange={setShowNewStoreDialog}
      />
    </>
  )
}
