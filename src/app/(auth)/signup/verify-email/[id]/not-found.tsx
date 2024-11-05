import { ErrorCard } from '@/components/error-card'
import { Shell } from '@/components/shell'

export default function ProductNotFound () {
  return (
    <Shell variant='centered' className='max-w-md'>
      <ErrorCard
        title='Error al verificar cuenta'
        description='Esta cuenta ya esta verificada o el código ha expirado'
        retryLink='/'
        retryLinkText='Página principal'
      />
    </Shell>
  )
}
