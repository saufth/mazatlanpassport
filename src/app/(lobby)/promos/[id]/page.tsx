import { type Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { promos } from '@/config/promos'
import { domain } from '@/config/site'
import { companies } from '@/config/companies'

interface PromoPageProps {
  params: {
    id: string
  }
}
export async function generateMetadata ({ params }: PromoPageProps): Promise<Metadata> {
  const promoId = decodeURIComponent(params.id)
  const promo = promos.find(promoItem => promoItem.id === promoId)!

  if (!promo) {
    return {}
  }

  return {
    metadataBase: new URL(domain),
    title: promo.name,
    description: promo.description
  }
}

export default function PromoPage ({ params }: PromoPageProps) {
  const companyId = params.id

  const promo = promos.find(promoItem => promoItem.companyId === companyId)!
  const company = companies.find(companyItem => companyItem.id === companyId)!

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
                src={promo.image}
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
        <div>{promo.image}</div>
        <div>{company.id}</div>
        <div>{company.name}</div>
        <div>{company.description}</div>
      </section>
    </>
  )
}
