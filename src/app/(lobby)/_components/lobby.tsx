import Image from 'next/image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { CallToAction } from '@/components/call-to-action'
import { PageHeader } from '@/components/page-header'
import { siteConfig } from '@/config/site'
import { FAQ, howItWorks } from '@/config/organization'
import { companies } from '@/config/companies'
import { CompaniesCarousel } from '@/components/companies-carousel'

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
          <h2 className='max-w-5xl mx-auto f-display-3 font-header text-white text-center text-balance -rotate-6 sm:-rotate-3'>
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
      <section
        id='promociones-exclusivas'
        className='bg-primary relative'
      >
        <div className='container py-spacing-9 relative z-10'>
          <h2 className='f-display-3 font-semibold text-secondary text-balance'>
            ¡Promociones exclusivas <span className='text-accent'>para viajeros inteligentes!</span>
          </h2>
          <div className='mt-spacing-4'>
            <CompaniesCarousel companies={companies} />
          </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-bl from-accent/35 via-transparent to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-t from-accent/35 via-transparent to-transparent' />
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
