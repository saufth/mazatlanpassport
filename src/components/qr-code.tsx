import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import QRCode from 'qrcode'
import { cn } from '@/lib/utils'

interface QRCodeImageProps {
  data: string
  className?: string
}

export default async function QRCodeImage ({
  data,
  className
}: QRCodeImageProps) {
  const qrcode = await QRCode.toDataURL(data)

  return (
    <AspectRatio
      ratio={1 / 1}
      className='aspect-square'
    >
      <Image
        src={qrcode}
        alt=''
        sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
        fill
        className={cn(
          'object-cover',
          className
        )}
      />
    </AspectRatio>
  )
}
