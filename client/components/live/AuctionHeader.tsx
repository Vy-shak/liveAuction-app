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
    <div className='w-full h-96 bg-white'>
      <div className='w-full h-fit justify-start items-center flex'>
        <span className='text-neutral-900'>{selectedAuction?.auctionName}</span>
      </div>
      <div className='w-full flex justify-between items-center'>
        {selectedAuction?.photos&&<Image width={200} height={100} alt='vehicleImage' src={selectedAuction.photos[0]} />}
        <div className='flexStart flex-col'>
          <div className='w-fit h-fit flexCenter'>
            <span>{selectedAuction?.brand}</span>
            <span>{selectedAuction?.model}</span>
          </div>
          <span>{selectedAuction?.year}</span>
          <span>{selectedAuction?.kmCovered}</span>
        </div>
        {/* <Pricecard price={"dump"} fullname={"dump"} imgUrl={"dump"}/> */}
      </div>
    </div>
  )
}

export default AuctionHeader
