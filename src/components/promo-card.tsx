import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { cn, formatPrice } from '@/lib/utils'

interface PromoCardProps {
  // id: string
  name: string
  description: string
  price: number
  discount: number
  image: string
  className?: string
}

export function PromoCard ({
  // id,
  name,
  description,
  price,
  discount,
  image,
  className
} : PromoCardProps) {
  return (
    <Card
      as='article'
      className={cn(
        'flex border-0 shadow-none bg-transparent rounded-2xl overflow-hidden group',
        className
      )}
    >
      <CardHeader className='p-0 relative overflow-hidden'>
        <div className='p-4 w-full h-full relative z-10 bg-gradient-to-r from-secondary via-secondary to-secondary/80 backdrop-filter backdrop-blur-lg backdrop-saturate-200'>
          <CardTitle
            className='f-body-1 leading-none text-white font-extrabold'
            title={name}
          >
            {name}
          </CardTitle>
          <div className='flex gap-x-spacing-2'>
            <div className='f-body-2 text-[#8EC78D] font-medium'>
              {formatPrice({
                price: price - (price * (discount / 100)),
                minimumFractionDigits: 2
              })}
            </div>
            <div className='f-body-2 text-secondary-foreground font-medium line-through'>
              {formatPrice({
                price,
                minimumFractionDigits: 2
              })}
            </div>
            <div className='f-body-2 text-primary'>
              {`-${discount}%`}
            </div>
          </div>
          <CardDescription
            className='f-body-2 leading-none text-white'
            title={description}
          >
            {description}
          </CardDescription>
        </div>
        <div className='absolute inset-0 overflow-hidden'>
          <Image
            src={image}
            alt={name}
            className='object-cover relative group-hover:scale-105 transition-transform duration-300'
            sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
            fill
            quality={0}
          />
        </div>
      </CardHeader>
      <CardContent className='w-1/2 xs:w-1/3 sm:w-3/4 md:w-1/2 lg:w-1/3 flex flex-col justify-center overflow-hidden bg-secondary'>
        <AspectRatio ratio={1 / 1}>
          <Image
            src={image}
            alt={name}
            className='object-cover group-hover:scale-105 transition-transform duration-300'
            sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
            fill
          />
        </AspectRatio>
      </CardContent>
    </Card>
  )
}
