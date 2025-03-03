"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { CarIcon,BikeIcon } from '../../public/index'
import { Input } from '../ui/input'
import { useRef } from 'react'
import { Button } from '../ui/button'
import useAuctiondata from '@/lib/stateStore/auctionDetails';
import useSellCount from '@/lib/stateStore/sellCount'
import { vehicleSchema1 } from '@/lib/zod/zodSchema'

enum types {
  bike = "BIKE",
  car = "CAR"
}

function AuctionName() {
  const {auctionData,updateAuctiondata} = useAuctiondata();
  const {updateCount} = useSellCount();
  const auctionNameref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const zodCheck = vehicleSchema1.safeParse(auctionData);
    if (zodCheck.success) {
        updateCount();
    }
    else{
      console.log("inputError")
    }
}, [auctionData]);



  const addNameref = ()=>{
    const name = auctionNameref.current?.value;
    if (name) {
      updateAuctiondata({type:"auctionName",val:name});
    }
  }


  return (
    <div className='flexCenter w-full gap-y-8 max-w-lg flex-col'>
        <div className='w-full flexCenter flex-col gap-y-6'>
        <span className='whitespace-nowrap text-2xl font-semibold text-neutral-800'>What are you planning to sell on auction?</span>
        <div className='w-fit h-fit flexCenter gap-x-4'>
            <Image onClick={()=>updateAuctiondata({type:"type",val:types.car})}  className={`w-20 ${auctionData.type===types.car?"border-4 border-primaryGreen-600":null} rounded-lg cursor-pointer`} alt='carIcon' src={CarIcon} />
            <Image onClick={()=>updateAuctiondata({type:"type",val:types.bike})} className={`w-20 ${auctionData.type===types.bike?"border-4 border-primaryGreen-600":null} rounded-lg cursor-pointer`} alt='bikeIcon' src={BikeIcon} />
        </div>
        </div>
        <div className='flexCenter gap-y-6 flex-col w-full'>
        <div className='w-full flex justify-start items-start flex-col'>
            <span>Name your auction</span>
            <Input autoComplete="on" ref={auctionNameref} />
        </div>
        <Button onClick={addNameref} className='w-full'>Next</Button>
        </div>
    </div>
  )
}

export default AuctionName
