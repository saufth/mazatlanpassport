import { ErrorCard } from '@/components/error-card'
import { Shell } from '@/components/shell'

export default function ProductNotFound () {
  return (
    <Shell variant='centered' className='max-w-md'>
      <ErrorCard
        title='No hemos encontrado este producto'
        description='Probablemente el producto ha expirado'
        retryLink='/'
        retryLinkText='Regresar al Inicio'
      />
    </Shell>
  )
}
