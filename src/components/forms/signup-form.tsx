'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import DatePicker from 'react-datepicker'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { format, subYears } from 'date-fns'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signup } from '@/lib/actions/auth'
import { type SignupInputs, signupSchema } from '@/lib/validations/auth/signup'
import { GENRE } from '@/config/app'
import 'react-datepicker/dist/react-datepicker.css'
// import { convertToSubcurrency } from '@/lib/utils'
// import {
//   PaymentElement as StripePaymentElement,
//   Elements as StripeElments
//   // useElements,
//   // useStripe
// } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
// import type { Amount } from '@/types'

// if (process.env.NEXT_PUBLIC_STRIPE_PK === undefined) {
//   throw new Error('NEXT_PUBLIC_STRIPE_PK is not defined')
// }

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

export default function SignupForm () {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const [isTransition, startTransition] = useTransition()
  // const stripe = useStripe()
  // const stripeElements = useElements()

  // const [errorMessage, setErrorMessage] = useState<string>()
  // const [clientSecret, setClientSecret] = useState<string>('')
  // const [loading, setLoading] = useState<boolean>(false)

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
      genreISO: '',
      birthday: subYears(new Date(), 16).toString(),
      terms: false
    }
  })

  const onSubmit = (inputs: SignupInputs) => {
    startTransition(async () => {
      toast.message('Registrando..')
      const response = await signup(inputs)

      if (response.error) {
        toast.error(response.error)
        return
      }

      toast.success('¡Registro exitoso!')
      form.reset()
      router.push(`/signup/verify-email/${response.data!.id}`)
    })
  }

  return (
    <Form {...form}>
      <form
        className='space-y-spacing-3'
        onSubmit={form.handleSubmit(onSubmit)}
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
          name='birthday'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de nacimiento</FormLabel>
              <FormControl>
                <DatePicker
                  {...field}
                  dateFormat='dd/MM/yyyy'
                  selected={new Date(field.value)}
                  onSelect={(date) => { date && field.onChange(date.toString()) }}
                  value={format(field.value, 'dd/MM/yyyy')}
                  className='w-full outline-offset-0 f-body-2 outline-2 text-inherit ring-shadow border rounded-lg bg-input p-2.5 sm:p-3 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-0 focus-visible:ring-ring focus-visible:border-ring/50 disabled:cursor-not-allowed disabled:opacity-50'
                  wrapperClassName='w-full'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='genreISO'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Genero</FormLabel>
              <Select onValueChange={((value: typeof field.value) => field.onChange(value))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder='Elige tu genero'
                      className='text-muted-foreground'
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {GENRE.map(
                      (genderItem) => (
                        <SelectItem
                          key={genderItem.title}
                          value={genderItem.iso}
                          className='rounded-lg hover:cursor-pointer group-hover:bg-secondary'
                        >
                          {genderItem.title}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between'>
                <FormLabel>Contraseña</FormLabel>
                <div className='flex items-center gap-x-spacing-2'>
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className='flex items-center gap-x-spacing-1 text-xs sm:text-sm text-secondary cursor-pointer'
                  >
                    {showPassword
                      ? (<>Ocultar <EyeClosedIcon className='w-3.5 sm:w-4 h-auto' /></>)
                      : (<>Mostrar <EyeOpenIcon className='w-3.5 sm:w-4 h-auto' /></>)}
                  </div>
                </div>
              </div>
              <FormControl>
                <Input
                  type={showPassword ? 'text' : 'password'}
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
              <div className='flex justify-between'>
                <FormLabel>Confirmar contraseña</FormLabel>
                <div className='flex items-center gap-x-spacing-2'>
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='flex items-center gap-x-spacing-1 text-xs sm:text-sm text-secondary cursor-pointer'
                  >
                    {showConfirmPassword
                      ? (<>Ocultar <EyeClosedIcon className='w-3.5 sm:w-4 h-auto' /></>)
                      : (<>Mostrar <EyeOpenIcon className='w-3.5 sm:w-4 h-auto' /></>)}
                  </div>
                </div>
              </div>
              <FormControl>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
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
          name='terms'
          render={({ field }) => (
            <FormItem className='w-full flex space-y-0 gap-x-spacing-2 pt-spacing-4'>
              <FormControl>
                <Checkbox
                  id='terms'
                  checked={field.value}
                  // eslint-disable-next-line react/jsx-handler-names
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='grid gap-y-spacing-1'>
                <FormLabel className='f-body-1 font-medium'>
                  Acepto los terminos y condiciones
                </FormLabel>
                <p className='f-body-2 text-muted-foreground'>
                  Aceptas nuestros{' '}
                  <Link href='/terms' className='font-medium text-ring'>Terminos de Servicio</Link>{' '}
                  y <Link href='/privacy' className='font-medium text-ring'>Politica de Privacidad</Link>.
                </p>
                <FormMessage />
              </div>
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
            className='lg:w-full flex items-center gap-x-spacing-2'
            size='full'
            disabled={isTransition}
          >
            Registrarse
          </Button>
        </div>
      </form>
    </Form>
  )
}
