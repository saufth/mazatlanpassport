import {
  number as ZodNumber,
  object as zodObject,
  type infer as zodInfer
} from 'zod'
import { GENRE } from '@/config/app'

export const genreISOSchema = zodObject({
  genreISO: ZodNumber({ required_error: 'El Genero es requqrido' })
    .refine((genreISO) => !GENRE.find(genreItem => genreISO === genreItem.iso),
      { message: 'El Genero es ivalido' }
    )
})

export type GenreISOInputs = zodInfer<typeof genreISOSchema>
