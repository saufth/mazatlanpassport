import { cn } from '@/lib/utils'
import { ImageProps } from '@/types'
import Image from 'next/image'
import QRCode from 'qrcode'

interface QRCodeImageProps extends Omit<ImageProps, 'alt'> {
  className?: string
}

export default async function QRCodeImage ({
  src,
  width = 250,
  height = 250,
  className
}: QRCodeImageProps) {
  const qrcode = await QRCode.toDataURL(src)

  return (
    <Image
      src={qrcode}
      alt=''
      width={width}
      height={height}
      className={cn(
        'rounded-3xl',
        className
      )}
    />
  )
}