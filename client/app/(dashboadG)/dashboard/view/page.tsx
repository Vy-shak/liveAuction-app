"use client"
import React, { useEffect } from 'react'
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

function page() {
  const { selectedAuction } = UseSelectedAuction();
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
    },[selectedAuction])

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
  }

  console.log("hey",selectedAuction)
  return (
    <section className='w-full gap-y-6 flexCenter flex-col  pl-20 pr-4 pb-4  bg-neutral-200 pt-20'>
      <div className='w-full gap-x-6 flexCenter h-fit'>
        <ChevronLeftCircle/>
        <div className='w-1/3 h-96  rounded-xl overflow-hidden'>
        {selectedAuction&&selectedAuction.photos.map((link,index)=>(
          <Image key={index} className='w-full h-full object-cover' width={200} height={100} alt='vehicleimage' src={link}/>
        ))}
        </div>
        <ChevronRightCircle/>
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
