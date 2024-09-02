import { Header } from '@/types'

export const SectionHeader = ({ title, description } : Header) => {
  return (
    <div className='flex flex-col gap-y-spacing-3'>
      <h2 className='text-[0.625rem] sm:text-[0.875rem] xl:text-[1rem] uppercase text-ring font-medium text-balance leading-none tracking-wider'>
        {title}
      </h2>
      <p className='f-heading-1 text-balance'>
        {description}
      </p>
    </div>
  )
}
