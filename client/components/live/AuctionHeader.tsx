"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import Pricecard from './Pricecard'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'
import { UsefetchUser } from '@/app/hooks/UsefetchData';
import axios from 'axios';
import { useRouter } from 'next/navigation'

interface auctionHeader {
  price:string,
  fullname:string,
  profileUrl:string
}

function AuctionHeader({ price,fullname,profileUrl }: auctionHeader) {
  const {selectedAuction} = UseSelectedAuction();
  const {userdata} = UsefetchUser("user/getData");
  const Router = useRouter()
  useEffect(()=>{
    if (!selectedAuction) {
      Router.back()
    };

    (function connectTows() {
      const auctionId = selectedAuction?.id;
      const token = localStorage.getItem("token")
      console.log(auctionId)
      if (!auctionId&&!token) {
        console.log("params not present")
        return 
      };

      const ws = new WebSocket(`ws://localhost:8080?token=${token}&auctionCode=${auctionId}`);

    })()

  },[])

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
        {selectedAuction?.price && userdata && <Pricecard price={selectedAuction.price} fullname={userdata.fullname} imgUrl={userdata.imgUrl} />}
      </div>
    </div>
  )
}

export default AuctionHeader
