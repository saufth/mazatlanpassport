import Image from 'next/image'
import { CallToAction } from '@/components/call-to-action'
import { StoreCard } from '@/components/store-card'
import { PageHeader } from '@/components/page-header'
import { siteConfig } from '@/config/site'
import { howItWorks } from '@/config/organization'
import { stores } from '@/config/stores'
import { StoresCarousel } from '@/components/stores-carousel'
// import { StoresCarousel } from '@/components/stores-carousel'

export function Lobby () {
  return (
    <>
      <PageHeader
        title={siteConfig.slogan}
        description={`${siteConfig.description}.`}
        to='signup'
        toAlt='signin'
      />
      <section className='bg-gradient-to-b from-ring via-secondary/95 to-ring pt-32 -mt-36'>
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
                  <h3 className='f-heading-3 text-white font-extrabold text-center'>
                    {howItWorksItem.title}
                  </h3>
                  <p className='f-body-1 text-white font-medium mt-spacing-4 text-center'>
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
        className='bg-primary relative z-10'
      >
        <div className='container py-spacing-7 relative z-10'>
          <h2 className='max-w-3xl f-display-3 font-extrabold text-secondary text-balance'>
            ¡Promociones exclusivas <span className='text-accent'>para viajeros inteligentes!</span>
          </h2>
          <div className='cols-container mt-spacing-6 gap-y-gutter relative z-10'>
            {stores.map((storeItem, key) => {
              return (
                <div className='w-6-cols sm:w-3-cols md:w-4-cols lg:w-4-cols' key={key}>
                  <StoreCard {...storeItem} />
                </div>
              )
            })}
          </div>
          <div className='mt-spacing-4'>
            <StoresCarousel stores={stores} />
          </div>
        </div>
        <div className='absolute inset-0 bg-gradient-to-t from-accent/35 via-transparent to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-accent/35' />
      </section>
      {/* <section id='preguntas-frecuentes' className='bg-secondary'>
        <div className='container py-spacing-9'>
          <div className='flex flex-col gap-y-spacing-3'>
            <h2 className='f-body-1 uppercase text-primary font-medium text-center text-balance leading-none tracking-wider'>
              Preguntas frecuentes
            </h2>
            <p className='f-display-3 font-medium text-white text-center text-balance'>
              No te quedes con las dudas
            </p>
          </div>
          <div className='mt-spacing-6'>
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
      </section> */}
    </>
  )
}
