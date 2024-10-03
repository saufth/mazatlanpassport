'use client'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { CompanyCard } from '@/components/company-card'

interface CompanyProps {
  id: string
  name: string
  description: string
  image: string
  reservation?: boolean
}

interface CompaniesCarouselProps {
  companies: CompanyProps[]
}

export function CompaniesCarousel ({ companies }: CompaniesCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      plugins={[
        Autoplay({
          delay: 5000
        })
      ]}
      className='w-full'
    >
      <div className='flex justify-end gap-x-2'>
        <CarouselPrevious className='static bg-white border-none translate-y-0' />
        <CarouselNext className='static bg-white border-none translate-y-0' />
      </div>
      <CarouselContent className='mt-spacing-3'>
        {companies.map((company, key) => (
          <CarouselItem key={key} className='md:basis-1/2 lg:basis-1/3'>
            <CompanyCard {...company} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
