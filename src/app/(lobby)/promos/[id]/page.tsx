import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Promoción',
  description: 'Lorem ipsum'
}

const promoTypes = [
  {
    id: 1,
    title: '2x1',
    description: 'En el plato principal'
  },
  {
    id: 2,
    title: '50%',
    description: 'En el plato principal'
  }
]

const promos = [
  {
    id: '104913f2-51bd-44b7-beca-8b3791e4e58e',
    name: 'Establecimiento 1',
    description: 'Descripción del establecimiento 1',
    image: {
      src: '/images/promo1.webp',
      alt: 'Platillo principal de Establecimiento 1',
      width: 1920,
      height: 1080
    },
    type: 1
  },
  {
    id: '04a14e6e-2b45-422d-9d68-227de40bece1',
    name: 'Establecimiento 2',
    description: 'Descripción del establecimiento 2',
    image: {
      src: '/images/promo2.webp',
      alt: 'Platillo principal de Establecimiento 2',
      width: 1920,
      height: 1080
    },
    type: 2
  },
  {
    id: '4991e6f2-cf04-46b1-8d71-5ca6442d6f07',
    name: 'Establecimiento 3',
    description: 'Descripción del establecimiento 3',
    image: {
      src: '/images/promo3.webp',
      alt: 'Platillo principal de Establecimiento 3',
      width: 1920,
      height: 1080
    },
    type: 1
  },
  {
    id: '1e91909c-4489-42cb-b761-50ba1871e3d9',
    name: 'Establecimiento 4',
    description: 'Descripción del establecimiento 4',
    image: {
      src: '/images/promo4.webp',
      alt: 'Platillo principal de Establecimiento 4',
      width: 1920,
      height: 1080
    },
    type: 2
  }
]

interface PromoPageProps {
  params: {
    id: string
  }
}

export default function PromoPage ({ params }: PromoPageProps) {
  const promoId = params.id

  const promo = promos.find(promoItem => promoItem.id === promoId)!
  const promoType = promoTypes.find(promoTypeItem => promoTypeItem.id === promo.type)!

  if (!promo) {
    notFound()
  }

  return (
    <section className='container py-spacing-6'>
      <div>{promo.id}</div>
      <div>{promo.name}</div>
      <div>{promo.description}</div>
      <div>{promo.image.src}</div>
      <div>{promoType.title}</div>
      <div>{promoType.description}</div>
    </section>
  )
}
