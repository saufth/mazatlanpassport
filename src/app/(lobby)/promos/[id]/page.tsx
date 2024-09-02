import { promos, promoTypes } from '@/config/promos'
import { type Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Promoción',
  description: 'Lorem ipsum'
}

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
    <>
      <section>
        <div className='container'>
          <div className='h-52 md:h-64 xl:h-72 overflow-hidden rounded-2xl mt-spacing-1'>
            <div className='w-[130%] sm:w-full -ml-[15%] sm:ml-0'>
              <Image
                src={promo.image.src}
                alt={promo.name}
                width={1920}
                height={1080}
              />
            </div>
          </div>
          <div className='mt-spacing-4'>
            <h1 className='f-heading-3 font-medium'>
              {promo.name}
            </h1>
            <p className='f-body-1 text-balance mt-spacing-3'>
              {promo.description}
            </p>
          </div>
        </div>
      </section>
      <section className='container py-spacing-6'>
        <div>{promo.id}</div>
        <div>{promo.name}</div>
        <div>{promo.description}</div>
        <div>{promo.image.src}</div>
        <div>{promoType.title}</div>
        <div>{promoType.description}</div>
      </section>
    </>
  )
}
