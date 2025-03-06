import React from 'react'
import Image from 'next/image'
import { convertUtcToLocal } from '@/app/utils/timeConvert'

interface register {
  imgUrl: string,
  brand: string,
  model: string,
  endDate: string,
  startDate: string
}

function RegisteredCard({ imgUrl, brand, model, endDate, startDate }: register) {
  endDate = convertUtcToLocal(endDate);
  startDate = convertUtcToLocal(startDate)
  return (
    <div className='w-full flexCenter rounded-md bg-white px-8 py-4'>
      <div className='w-full flexStart flex-col'>
        <div className='w-fit h-fit flexCenter gap-y-2 flex-col'>
          <Image className='rounded-lg flex-shrink-0 overflow-hidden w-24 h-20 object-cover' width={100} height={50} alt='vehicle image' src={imgUrl} />
          <div className='w-full h-fit flexCenter gap-x-3 '>
            <span className='text-sm font-semibold text-neutral-600'>{brand}</span>
            <span className='text-sm font-semibold text-neutral-600' >{model}</span>
          </div>
        </div>
      </div>
      <div className='w-fit flexCenter gap-x-3'>
        <div className='flexCenter w-fit h-fit flex-col'>
          <span className='whitespace-nowrap text-neutral-800 font-semibold'>Starts in</span>
          <span className='whitespace-nowrap'>{startDate}</span>
        </div>
        <div className='flexCenter flex-col'>
          <span className='whitespace-nowrap text-neutral-700 font-semibold'>Ends in</span>
          <span className='whitespace-nowrap'>{endDate}</span>
        </div>
      </div>
    </div>
  )
}

export { RegisteredCard }
