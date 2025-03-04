
import React from 'react'

interface price {
  price:string
}

function Pricecard({price}:price) {
  return (
    <div className='rounded flex-1 max-w-40 h-full px-3  py-3  flex flex-col justify-start  bg-white items-start'>
      <span className='text-neutral-800 text-lg font-semibold whitespace-nowrap'>Starting price</span>
      <span className='text-neutral-800 text-2xl font-semibold whitespace-nowrap'>{price}</span>
    </div>
  )
}

export {Pricecard}
