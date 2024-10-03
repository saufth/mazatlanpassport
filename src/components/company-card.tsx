import Image from 'next/image'
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface CompanyCardProps {
  id: string
  name: string
  description: string
  image: string
  reservation?: boolean
}

export function CompanyCard ({
  id,
  name,
  description,
  image,
  reservation = false
} : CompanyCardProps) {
  return (
    <Card
      as='article'
      className='group border-0 shadow-none bg-transparent rounded-2xl overflow-hidden'
    >
      <Link href={`/promos/${id}`} className='relative block'>
        <CardContent className='relative z-10 flex flex-col justify-center overflow-hidden'>
          {reservation && (
            <div className='w-fit py-1 px-1.5 absolute top-2 right-2 z-10 text-sm leading-none uppercase font-medium text-white bg-accent rounded-md'>
              Reservación necesaria
            </div>
          )}
          <AspectRatio ratio={21 / 9}>
            <Image
              src={image}
              alt={name}
              className='object-cover group-hover:scale-105 transition-transform duration-300'
              sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
              fill
            />
          </AspectRatio>
        </CardContent>
        <CardHeader className='p-4 -mt-px relative z-10 overflow-hidden bg-gradient-to-t from-secondary via-secondary/95 to-secondary/80 backdrop-filter backdrop-blur-lg backdrop-saturate-200'>
          <CardTitle
            className='text-xl text-white font-medium'
            title={name}
          >
            {name}
          </CardTitle>
          <CardDescription
            className='f-body-2 text-secondary-foreground'
            title={description}
          >
            {description}
          </CardDescription>
        </CardHeader>
        <div className='absolute inset-x-0 bottom-0'>
          <AspectRatio ratio={21 / 9} className='relative'>
            <Image
              src={image}
              alt={name}
              className='object-cover relative group-hover:scale-105 transition-transform duration-300'
              sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
              fill
              quality={10}
            />
          </AspectRatio>
        </div>
      </Link>
    </Card>
  )
}
