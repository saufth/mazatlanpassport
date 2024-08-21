import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Hero } from '@/components/sections/hero'
import { SectionHeader } from '@/components/sections/section-header'
import { siteConfig } from '@/config/site'
import { faq } from '@/config/organization'

export default function IndexPage () {
  return (
    <>
      <Hero
        title={siteConfig.slogan}
        description={siteConfig.description}
        to='signin'
        src='/video/home-hero.mp4'
      />
      <section id='preguntas-frecuentes'>
        <div className='container pt-spacing-8'>
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
