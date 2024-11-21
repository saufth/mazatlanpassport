import {
  string as zodString,
  object as zodObject,
  type infer as zodInfer
} from 'zod'
import { genre } from '@/lib/constants'

export const genreISOSchema = zodObject({
  genreISO: zodString({ required_error: 'El Genero es requqrido' })
    .refine((genreISO) => genre.find(genreItem => genreISO === genreItem.iso),
      { message: 'El Genero es ivalido' }
    )
})

export type GenreISOInputs = zodInfer<typeof genreISOSchema>
