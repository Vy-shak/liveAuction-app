import Image from 'next/image'
import React from 'react'
import Pricecard from './Pricecard'

interface auctionHeader {
  auctionName: string,
  brand: string,
  year: string,
  model: string,
  ImgUrl: string,
  yearCovered: string,


}

function AuctionHeader({ auctionName, brand, yearCovered, year, model, ImgUrl }: auctionHeader) {
  return (
    <div className='w-full h-96 bg-white'>
      <div className='w-full h-fit justify-start items-center flex'>
        <span>{auctionName}</span>
      </div>
      <div className='w-full flex justify-between items-center'>
        <Image alt='vehicleImage' src={ImgUrl} />
        <div className='flexStart flex-col'>
          <div className='w-fit h-fit flexCenter'>
            <span>{brand}</span>
            <span>{model}</span>
          </div>
          <span>{year}</span>
          <span>{yearCovered}</span>
        </div>
        <Pricecard price={"dump"} fullname={"dump"} imgUrl={"dump"}/>
      </div>
    </div>
  )
}

export default AuctionHeader
