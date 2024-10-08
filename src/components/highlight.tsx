import { cn } from '@/lib/utils'

export interface HighlightProps {
  children: string
  className?: string
  index?: number
  indexEnd?: number
}

export function Highlight ({
  children,
  className,
  index = -1,
  indexEnd = index
}: HighlightProps) {
  const textData = children.split(' ')

  const indexEndFixed = indexEnd >= textData.length ? textData.length - 1 : indexEnd
  const isIndexOk = index >= 0 && index < textData.length
  const isIndexEndOk = indexEndFixed >= 0 && indexEndFixed >= index

  let spaceHandler = ''

  return (
    <>
      {isIndexOk && isIndexEndOk
        ? textData.map((word, key) => {
          if (key === 1) { spaceHandler = ' ' }

          return key < index || key > indexEndFixed
            ? `${spaceHandler}${word}`
            : (
              <span key={key}>
                {key === index && textData.map((highlightItem, highlightItemKey) => {
                  return highlightItemKey >= index && highlightItemKey <= indexEndFixed && (
                    <span key={highlightItemKey}>
                      {spaceHandler}
                      <span className='inline-block relative z-10 text-white px-2'>
                        {highlightItem}
                        <span
                          className={cn(
                            'w-full h-[95%] bg-accent rounded-lg absolute inset-y-0 left-px -z-10 -rotate-1',
                            className
                          )}
                        />
                      </span>
                    </span>
                  )
                })}
              </span>
              )
        })
        : children}
    </>
  )
}
