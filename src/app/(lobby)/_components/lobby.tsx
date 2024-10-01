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
import { siteConfig } from '@/config/site'
import { FAQ, howItWorks } from '@/config/organization'
import { promos, promoTypes } from '@/config/promos'
import { CallToAction } from '@/components/call-to-action'

export function Lobby () {
  return (
    <>
      <PageHeader
        title={siteConfig.slogan}
        description={`${siteConfig.description}.`}
        to='subscribe'
        toAlt='login'
      />
      <section className='bg-gradient-to-b from-ring via-secondary to-ring pt-32 -mt-36'>
        <div className='container py-spacing-9'>
          <h2 className='max-w-5xl mx-auto f-display-3 font-header text-secondary-foreground text-center text-balance -rotate-6 sm:-rotate-3'>
            ¡Obten tu membresía hoy mismo y disfruta de <b className='text-primary font-normal'>beneficios exclusivos</b>!
          </h2>
          <div className='cols-container mt-spacing-7 justify-center gap-y-spacing-6'>
            {howItWorks.map((howItWorksItem, howItWorksItemKey) => (
              <div className='w-6-cols xs:w-4-cols md:px-gutter' key={`how-it-works-${howItWorksItemKey}`}>
                <Image
                  src={howItWorksItem.image.src}
                  alt={howItWorksItem.image.alt}
                  width={howItWorksItem.image.width}
                  height={howItWorksItem.image.height}
                  className='px-gutter'
                />
                <div className='mt-spacing-2'>
                  <h3 className='f-subhead-1 text-white font-medium text-center'>
                    {howItWorksItem.title}
                  </h3>
                  <p className='f-body-1 text-white mt-spacing-2 text-center'>
                    {howItWorksItem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center mt-spacing-7'>
            <CallToAction size='full' />
          </div>
        </div>
      </section>
      <section id='promociones-exclusivas' className='bg-primary'>
        <div className='container py-spacing-9'>
          <h2 className='f-display-3 font-semibold text-secondary text-center text-balance'>
            ¡Promociones exclusivas <span className='text-accent'>para viajeros inteligentes!</span>
          </h2>
          <div className='cols-container mt-spacing-7 gap-y-gutter relative z-10'>
            {promos.map((promoItem, key) => {
              const promoTypeData = promoTypes.find((promoTypeItem) => promoTypeItem.id === promoItem.type)!

              return (
                <div className='w-6-cols xs:w-3-cols md:w-4-cols lg:w-4-cols' key={key}>
                  <NextLink href={`/promos/${promoItem.id}`}>
                    <Card
                      as='article'
                      className='relative border-0 shadow-none bg-transparent rounded-2xl overflow-hidden hover:scale-105 transition-transform'
                    >
                      <CardContent className='relative z-10 flex flex-col justify-center aspect-video overflow-hidden'>
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
                      <CardHeader className='p-0 py-spacing-4 space-y-0 relative z-10 overflow-hidden bg-secondary/90 backdrop-filter backdrop-blur backdrop-saturate-200'>
                        <CardTitle className='text-white font-medium'>
                          {promoItem.name}
                        </CardTitle>
                        <CardDescription className='f-body-2 text-white'>
                          {`${promoTypeData.title} ${promoTypeData.description}`}
                        </CardDescription>
                      </CardHeader>
                      <div className='absolute inset-x-0 bottom-0 aspect-video'>
                        <Image
                          src={promoItem.image.src}
                          alt={promoItem.image.alt}
                          width={promoItem.image.width}
                          height={promoItem.image.height}
                          loading='lazy'
                          quality={10}
                          className='relative'
                        />
                      </div>
                    </Card>
                  </NextLink>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section id='preguntas-frecuentes' className='bg-secondary'>
        <div className='container py-spacing-9'>
          <div className='flex flex-col gap-y-spacing-3'>
            <h2 className='f-body-1 uppercase text-primary font-medium text-center text-balance leading-none tracking-wider'>
              Preguntas frecuentes
            </h2>
            <p className='f-display-3 font-medium text-white text-center text-balance'>
              No te quedes con las dudas
            </p>
          </div>
          <div className='mt-spacing-7'>
            <Accordion type='single' collapsible className='w-full space-y-spacing-4'>
              {FAQ.items.map((faqItem, key) => (
                <AccordionItem value={`item-${key}`} key={`item-${key}`}>
                  <AccordionTrigger className='f-subhead-3 text-left text-white pt-0 pb-spacing-4 [&>svg]:stroke-white'>
                    {faqItem.title}
                  </AccordionTrigger>
                  <AccordionContent className='f-body-1 pb-spacing-4 text-white'>
                    {typeof faqItem.description === 'string'
                      ? faqItem.description
                      : (
                        <div className='space-y-spacing-3'>
                          {faqItem.description.map((descriptionItem, key) => (
                            <div key={key} className='text-white'>
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
