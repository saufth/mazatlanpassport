export function TailwindIndicator () {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className='fixed bottom-1 left-1 z-50 flex size-6 items-center justify-center rounded-full bg-foreground p-3 font-mono text-xs [&>div]:text-background'>
      <div className='block xs:hidden'>2xs</div>
      <div className='hidden xs:block sm:hidden'>xs</div>
      <div className='hidden sm:block md:hidden'>sm</div>
      <div className='hidden md:block lg:hidden'>md</div>
      <div className='hidden lg:block xl:hidden'>lg</div>
      <div className='hidden xl:block 2xl:hidden'>xl</div>
      <div className='hidden 2xl:block 3xl:hidden'>2xl</div>
      <div className='hidden 3xl:block'>3xl</div>
    </div>
  )
}
