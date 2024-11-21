import SignoutRootButtons from '@/app/(protected)/root/(auth)/_components/signout-root-buttons'

export default function SignoutRootPage () {
  return (
    <div>
      <div className='container screen-container flex items-center justify-center'>
        <div className='w-full max-w-md relative'>
          <div className='space-y-spacing-2'>
            <div className='f-heading-2 font-extrabold text-secondary text-center'>
              Cerrar sesión
            </div>
          </div>
          <div className='mt-spacing-4'>
            <SignoutRootButtons />
          </div>
        </div>
      </div>
    </div>
  )
}
