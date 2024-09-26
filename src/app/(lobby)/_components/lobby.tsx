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
import { PageHeader } from '@/components/page-header'
import { SectionHeader } from '@/components/sections/section-header'
import { siteConfig } from '@/config/site'
import { FAQ } from '@/config/organization'
import { promos, promoTypes } from '@/config/promos'

export function Lobby () {
  return (
    <>
      <PageHeader
        title={siteConfig.slogan}
        description={`${siteConfig.description}.`}
        to='subscribe'
        toAlt='login'
      />
      <section id='promociones-exclusivas'>
        <div className='container pt-spacing-6'>
          <SectionHeader
            title='¡Promociones exclusivas!'
            description='Beneficios exclusivos para viajeros inteligentes'
          />
          <div className='cols-container mt-spacing-4 gap-y-gutter relative z-10'>
            {promos.map((promoItem, key) => {
              const promoTypeData = promoTypes.find((promoTypeItem) => promoTypeItem.id === promoItem.type)!

              return (
                <div className='w-6-cols xs:w-3-cols md:w-4-cols lg:w-3-cols' key={key}>
                  <NextLink href={`/promos/${promoItem.id}`}>
                    <Card as='article' className='group overflow-hidden border-0 shadow-none'>
                      <CardContent className='h-[130px] rounded-2xl overflow-hidden flex flex-col justify-center'>
                        <Image
                          src={promoItem.image.src}
                          alt={promoItem.image.alt}
                          width={promoItem.image.width}
                          height={promoItem.image.height}
                          loading='lazy'
                          quality={100}
                          className='object-cover'
                        />
                      </CardContent>
                      <CardHeader className='p-0 pt-spacing-3 px-0 space-y-0'>
                        <CardTitle className='f-body-1 font-medium'>
                          {promoItem.name}
                        </CardTitle>
                        <CardDescription className='f-body-2'>
                          {`${promoTypeData.title} ${promoTypeData.description}`}
                        </CardDescription>
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
            title={FAQ.title}
            description={FAQ.description}
          />
          <div className='mt-spacing-6'>
            <Accordion type='single' collapsible className='w-full space-y-spacing-4'>
              {FAQ.items.map((faqItem, key) => (
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
