'use client'
import { useRef, useTransition } from 'react'
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
import { toast } from 'sonner'
import { Icons } from '@/components/icons'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'
// import {
//   PaymentElement as StripePaymentElement,
//   Elements as StripeElments
//   // useElements,
//   // useStripe
// } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { convertToSubcurrency } from '@/lib/utils'
import { type SignupInputs, signupSchema } from '@/lib/validations/auth/signup'
import type { Amount } from '@/types'

if (process.env.NEXT_PUBLIC_STRIPE_PK === undefined) {
  throw new Error('NEXT_PUBLIC_STRIPE_PK is not defined')
}

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK)

// const suscriptionTypes = [
//   {
//     title: 'Semanal',
//     price: 399,
//     days: 7
//   },
//   {
//     title: 'Mensual',
//     price: 1199,
//     days: 30
//   }
// ]

export default function SignupForm ({ amount }: Amount) {
  // const stripe = useStripe()
  // const stripeElements = useElements()

  // const [errorMessage, setErrorMessage] = useState<string>()
  // const [clientSecret, setClientSecret] = useState<string>('')
  // const [loading, setLoading] = useState<boolean>(false)

  const [isPending, startTransition] = useTransition()

  // useEffect(() => {
  //   fetch('/api/create-payment-intent', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ amount: convertToSubcurrency(amount) })
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret))
  // }, [amount])

  const form = useForm<SignupInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      genreISO: 0
    }
  })

  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit = async (data: SignupInputs) => {
    startTransition(async () => {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        switch (response.status) {
          case 422:
            toast.error('Entrada invalida.')
            break
          case 500:
            toast.error('Algo salió mal. Inténtalo de nuevo más tarde.')
            break
          default:
            toast.error('Algo salió mal. Inténtalo de nuevo más tarde.')
        }
        return
      }

      form.reset()
    })
  }

  return (
    <Form {...form}>
      <form
        className='space-y-4'
        // eslint-disable-next-line no-void
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        ref={formRef}
      >
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre(s)</FormLabel>
              <FormControl>
                <Input
                  placeholder='Nombre(s)'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido(s)</FormLabel>
              <FormControl>
                <Input
                  placeholder='Apellido(s)'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  placeholder='ej. correo@ejemplo.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='••••••••••••'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input
                  type='confirmPassword'
                  placeholder='••••••••••••'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div>
          <div className='cols-container pb-spacing-4'>
            {suscriptionTypes.map((suscriptionTypeItem, key) => {
              return (
                <div
                  className='w-1/2-cols p-spacing-2 border-b-2 border-ring last:border-muted-foreground shadow-lg shadow-black/30'
                  key={`${suscriptionTypeItem.title}-${key}`}
                >
                  <div>
                    Plan {suscriptionTypeItem.title}
                  </div>
                  <div className='text-lg font-medium'>
                    {formatPrice(suscriptionTypeItem.price)}
                  </div>
                </div>
              )
            })}
          </div>
          <StripeElments
            stripe={stripePromise}
            options={{
              mode: 'payment',
              amount: convertToSubcurrency(amount),
              currency: 'mxn'
            }}
          >
            {clientSecret && <StripePaymentElement />}
          </StripeElments>
        </div> */}
        <div className='pt-spacing-4'>
          <Button
            className='[&>*]:text-accent-foreground lg:w-full'
            size='full'
            disabled={isPending}
          >
            {isPending
              ? (
                <span className='flex items-center gap-x-2'>
                  Procesando.. <Icons.Spinner className='h-3 w-3' aria-hidden='true' />
                </span>)
              : (
                <span className='pt-px lg:pt-0 flex items-center gap-x-spacing-2 lg:font-medium text-xs lg:text-sm tracking-wider'>
                  Comprar membresia <ArrowTopRightIcon className='h-3 xl:h-3 w-3.5 xl:w-3.5 [&>*]:fill-accent-foreground' aria-hidden='true' />
                </span>)}
          </Button>
        </div>
      </form>
    </Form>
  )
}
