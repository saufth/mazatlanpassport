import { CardError } from '@/components/cards/card-error'
import { Shell } from '@/components/shells/shell'

export default function ProductNotFound () {
  return (
    <Shell variant='centered' className='max-w-md'>
      <CardError
        title='No hemos encontrado este producto'
        description='Probablemente el producto ha expirado'
        retryLink='/'
        retryLinkText='Regresar al Inicio'
      />
    </Shell>
  )
}
