"use client"

import Image from 'next/image'
import React from 'react'
import Pricecard from './Pricecard'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'
import auctionPrice from '@/lib/stateStore/auctionPrice'

interface auctionHeader {
  price:string,
  fullname:string,
  profileUrl:string,
}

function  AuctionHeader() {
  const {selectedAuction} = UseSelectedAuction();
  const {priceData}  = auctionPrice()

  return (
    <div className='w-full flexStart rounded-lg px-12 py-4 flex-col  bg-white'>
      <div className='w-full h-fit justify-start items-center flex'>
        <span className='text-neutral-700 text-2xl font-bold'>{selectedAuction?.auctionName}</span>
      </div>
      <div className='w-full flex justify-between items-center'>
        <div className='w-fit flexStart gap-x-4 justify-start '>
          {selectedAuction?.photos && <Image className='rounded' width={150} height={50} alt='vehicleImage' src={selectedAuction.photos[0]} />}
          <div className='flexStart flex-col'>
          <span className='text-neutral-700 text-xl font-semibold'>{`${selectedAuction?.brand}${selectedAuction?.model}`}</span>
            <span className='text-neutral-700 text-sm font-semibold'>{selectedAuction?.year}</span>
            <span className='text-neutral-700 text-sm font-semibold'>{`${selectedAuction?.kmCovered} Km`}</span>
          </div>
        </div>
        {selectedAuction?.price&&<Pricecard price={priceData.price} />}
      </div>
    </div>
  )
}

export default AuctionHeader
