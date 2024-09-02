import Image from 'next/image'
import NextLink from '@/components/ui/next-link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Hero } from '@/components/sections/hero'
import { SectionHeader } from '@/components/sections/section-header'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { v4 as uuidv4 } from 'uuid'
import { siteConfig } from '@/config/site'
import { faq } from '@/config/organization'

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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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
    id: uuidv4(),
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

export default function IndexPage () {
  return (
    <>
      <Hero
        title={siteConfig.slogan}
        description={`${siteConfig.description}.`}
        to='signin'
        src='/video/home-hero.mp4'
      />
      <section id='promociones'>
        <div className='container pt-spacing-7'>
          <SectionHeader
            title='Promociones exclusivas'
            description='Beneficios exclusivos para viajeros inteligentes'
          />
          <div className='cols-container mt-spacing-6 gap-y-gutter relative z-10'>
            {promos.map((promoItem, key) => {
              const promoTypeData = promoTypes.find((promoTypeItem) => promoTypeItem.id === promoItem.type)!

              return (
                <div className='w-6-cols xs:w-3-cols md:w-4-cols lg:w-6-cols' key={key}>
                  <NextLink href={`/promos/${promoItem.id}`}>
                    <Card as='article' className='group'>
                      <CardContent>
                        <Image
                          src={promoItem.image.src}
                          alt={promoItem.image.alt}
                          width={promoItem.image.width}
                          height={promoItem.image.height}
                        />
                      </CardContent>
                      <CardHeader>
                        <CardTitle className='font-header'>
                          {promoItem.name}
                        </CardTitle>
                        <CardDescription>
                          {`${promoTypeData.title} ${promoTypeData.description}`}
                        </CardDescription>
                        <div className='pt-spacing-4'>
                          <div className='f-body-1 group-hover:underline flex items-center gap-x-2'>
                            Promoción
                            <ArrowRightIcon />
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </NextLink>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section id='preguntas-frecuentes'>
        <div className='container pt-spacing-7'>
          <SectionHeader
            title={faq.title}
            description={faq.description}
          />
          <div className='mt-spacing-6'>
            <Accordion type='single' collapsible className='w-full space-y-spacing-4'>
              {faq.items.map((faqItem, key) => (
                <AccordionItem value={`item-${key}`} key={`item-${key}`}>
                  <AccordionTrigger className='f-subhead-3 text-left text-balance pt-0 pb-spacing-4'>
                    {faqItem.title}
                  </AccordionTrigger>
                  <AccordionContent className='f-body-1 text-balance pb-spacing-4 text-muted-foreground'>
                    {typeof faqItem.description === 'string'
                      ? faqItem.description
                      : (
                        <div className='space-y-spacing-3 text-muted-foreground'>
                          {faqItem.description.map((descriptionItem, key) => (
                            <div key={key}>
                              {descriptionItem}
                            </div>
                          ))}
                        </div>
                        )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}
