import SigninRootForm from '@/app/(protected)/root/(auth)/_components/signin-root-form'

export default function SigninRootPage () {
  return (
    <section>
      <div className='container screen-container flex items-center justify-center'>
        <div className='w-full max-w-md relative'>
          <div className='space-y-spacing-2'>
            <div className='f-heading-2 font-extrabold text-secondary'>
              Inica sesión
            </div>
          </div>
          <div className='mt-spacing-4'>
            <SigninRootForm />
          </div>
        </div>
      </div>
    </section>
  )
}
