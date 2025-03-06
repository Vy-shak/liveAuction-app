import React from 'react'
import Image from 'next/image'

interface register {
  imgUrl: string,
  brand: string,
  model: string,
  endDate: string,
  startDate: string
}

function RegisteredCard({ imgUrl, brand, model, endDate, startDate }: register) {
  return (
    <div className='w-full flexCenter bg-white'>
      <div className='w-full flexStart flex-col'>
        <Image width={100} height={50} alt='vehicle image' src={imgUrl} />
        <div className='w-full h-fit flexStart flex-col'>
          <span>{brand}</span>
          <span>{model}</span>
        </div>
      </div>
      <div className='w-fit flexCenter gap-x-3'>
        <div className='flexStart flex-col'>
          <span>Starts in</span>
          <span>{startDate}</span>
        </div>
        <div className='flexStart flex-col'>
          <span>Ends in</span>
          <span>{endDate}</span>
        </div>
      </div>
    </div>
  )
}

export {RegisteredCard}
