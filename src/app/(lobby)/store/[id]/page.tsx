import { type Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { PromoCard } from '@/components/promo-card'
// import { domain } from '@/config/site'
import { stores } from '@/config/stores'
import { promos } from '@/config/promos'
import type { UUIDInputs } from '@/lib/validations/uuid'

interface StorePageProps {
  params: UUIDInputs
}

// export async function generateMetadata ({ params }: StorePageProps): Promise<Metadata> {
//   const storeId = decodeURIComponent(params.id)
//   const store = stores.find(storeItem => storeItem.id === storeId)!

//   if (!store) { return {} }

//   return {
//     metadataBase: new URL(domain),
//     title: store.id,
//     description: store.description
//   }
// }

export default function StorePage ({ params }: StorePageProps) {
  const storeId = params.id

  const store = stores.find(storeItem => storeItem.id === storeId)!
  // const company = stores.find(companyItem => companyItem.id === storeId)!

  if (!store) {
    notFound()
  }

  return (
    <div className='fix-site-header-spacing pb-spacing-6'>
      <section>
        <div className='container'>
          <div className='h-36 xs:h-40 md:h-52 lg:h-60 xl:h-64 flex flex-col justify-center overflow-hidden rounded-2xl'>
            <AspectRatio ratio={21 / 9}>
              <Image
                src={store.image}
                alt={store.name}
                fill
                priority
              />
            </AspectRatio>
          </div>
          <div className='mt-spacing-3'>
            <div className='max-w-5xl'>
              <h1 className='f-heading-3 text-secondary font-semibold'>
                {store.name}
              </h1>
              <p className='f-body-1 text-secondary font-medium'>
                {store.description}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='cols-container mt-spacing-4 gap-y-gutter z-10'>
            {promos.map((promoItem, key) => {
              return (
                <div className='w-6-cols sm:w-3-cols md:w-4-cols lg:w-6-cols' key={key}>
                  <PromoCard {...promoItem} />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
