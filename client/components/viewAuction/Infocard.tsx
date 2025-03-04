import React from 'react'

interface infoCard {
    auctionName:string,
    brand:string,
    kmCovered:string,
    model:string
    year:string
}

function Infocard({auctionName,brand,kmCovered,year,model}:infoCard) {
  return (
    <div className='w-full px-6 py-4 rounded-md bg-white flex justify-start items-start flex-col'>
      <h4 className='text-neutral-700 font-semibold text-lg'>{auctionName}</h4>
      <span className='text-neutral-700 font-bold'>{`${brand} ${model}`}</span>
      <div className='flex justify-start items-start gap-x-6'>
        <span className='text-neutral-700'>{kmCovered}</span>
        <span className='text-neutral-700'>{year}</span>
      </div>
    </div>
  )
}

export {Infocard}
