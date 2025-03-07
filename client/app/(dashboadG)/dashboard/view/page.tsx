"use client"
import React, { useEffect, useState } from 'react'
import { Infocard } from '../../../../components/viewAuction/Infocard'
import { Pricecard } from '../../../../components/viewAuction/Pricecard'
import { OverviewCard } from '../../../../components/viewAuction/OverviewCard'
import { Discriptioncard } from '../../../../components/viewAuction/Discriptioncard'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'
import { Ownercard } from '../../../../components/viewAuction/Ownercard'
import { Button } from '../../../../components/index'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import { ChevronRightCircle ,ChevronLeftCircle } from 'lucide-react'
import CheveronBox from '@/components/icons/CheveronBox'

function page() {
  const { selectedAuction } = UseSelectedAuction();
  const [renderImg,setRenderImg] = useState(0)
  console.log("selectedAuction", selectedAuction);
  const Router = useRouter()

  const handleRegister = async () => {
    const token = localStorage.getItem("token");
    const url = process.env.NEXT_PUBLIC_HTTP_URL;


    if (!token) {
      console.log("token is not defined")
    };

    if (!url) {
      console.log("url is not defined")
    };

    useEffect(()=>{
      if (!selectedAuction) {
        Router.push("/dashboard/home")
      }
    },[])

    try {

      const req = await axios.post(`${url}auctions/registerAuctions`, { auctionId: selectedAuction?.id }, {
        headers: {
          "Content-Type": "application/json",
          "authToken": token
        }
      });

      console.log(req);

    } catch (error) {
      throw error
    }
  };

  const nextImg = ()=>{
    if(!selectedAuction?.photos) {
      return
    }
    let maxVal = selectedAuction?.photos.length
    if(renderImg>=maxVal-1) {
       return
    };
    setRenderImg((prev)=>prev+1)
  }

  const prevImg = ()=>{
    if (renderImg<=0) {
       return
    };
    setRenderImg((prev)=>prev-1)
  }
  console.log("hey",selectedAuction)
  return (
    <section className='w-full gap-y-6 flexCenter flex-col  pl-20 pr-4 pb-4  bg-neutral-200 pt-20'>
      <div className='w-full gap-x-6 flexCenter h-fit'>
        <div onClick={prevImg} className='w-fit h-fit'>
        <CheveronBox type='left'/>
        </div>
        <div className='w-1/3 h-96  rounded-xl overflow-hidden'>
        {selectedAuction&&<Image  className='w-full h-full object-cover' width={200} height={100} alt='vehicleimage' src={selectedAuction?.photos[renderImg]}/>}
        </div>
        <div onClick={nextImg} className='w-fit h-fit'>
        <CheveronBox type='right'/>
        </div>
      </div>
      <div className='w-full h-24 justify-between gap-x-6 items-center flex'>
        {selectedAuction && <Infocard year={selectedAuction.year} model={selectedAuction.model} kmCovered={selectedAuction.kmCovered} auctionName={selectedAuction.auctionName} brand={selectedAuction.brand} />}
        {selectedAuction && <Pricecard price={selectedAuction.price} />}
      </div>
      <div className='w-full flexStart gap-x-6'>
        <div className='w-full flexStart flex-col gap-y-6'>
          {selectedAuction && <OverviewCard endDate={selectedAuction.endDate} startDate={selectedAuction.startDate} />}
          {selectedAuction && <Discriptioncard discription={selectedAuction.discription} />}
        </div>
        <Ownercard />
      </div>
      <Button onClick={handleRegister} className='w-full'>Register</Button>
    </section>
  )
}

export default page
