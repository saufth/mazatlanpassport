import {
  object as zodObject,
  string as zodString,
  type infer as zodInfer
} from 'zod'

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const phoneSchema = zodObject({
  phone: zodString({ required_error: 'El Número de teléfono es requqrido' })
    .regex(phoneRegExp, { message: 'El Número de teléfono no es valido' })
    .min(10, { message: 'El Número de teléfono debe tener 10 caracteres' })
    .max(10, { message: 'El Número de teléfono debe tener 10 caracteres' })
})

export type PhoneInputs = zodInfer<typeof phoneSchema>
