import React from 'react'
import Image from 'next/image'
import { Button } from 'react-day-picker'

type auctionData ={
    brand:string,
    model:string,
    year:number,
    kmCovered:number,
    photo:string,
    startDate:string
    endDate:string,
    price:number
};

function Auctioncard({price,startDate,endDate,model, photo,brand,year,kmCovered}:auctionData) {
  return (
      <div className='w-96 h-56 bg-white flex justify-start items-start flex-col' >
          <h3>Yamaha rx-100 fully custom made mysore</h3>
          <Image alt='vehicle Img' src={photo} />
          <div className='w-full flex justify-normal items-center'>
          <div className='w-fit flex justify-between flex-col items-start'>
              <div className='w-fit h-fit flex flex-col justify-start items-start'>
                  <h4>{`${brand} ${model}`}</h4>
                  <span>{`${year}-${kmCovered}`}</span>
              </div>
              <div className='w-fit h-fit flexCenter'>
                  <span>{startDate}</span>
                  <span>{endDate}</span>
              </div>
          </div>
          <Button>{price}</Button>
          </div>
      </div>
  )
}

export default Auctioncard
