"use client"
import React, { useEffect } from 'react'
import { Infocard } from '../../../../components/viewAuction/Infocard'
import {Pricecard} from '../../../../components/viewAuction/Pricecard'
import { OverviewCard } from '../../../../components/viewAuction/OverviewCard'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'
import { useRouter } from 'next/navigation'

function page() {
  const {selectedAuction} = UseSelectedAuction();
  const Router = useRouter();

  useEffect(()=>{
    if(!selectedAuction){
      Router.push("/dashboard/home")
    }
  },[selectedAuction])
  console.log(selectedAuction)
  return (
    <section className='w-full gap-y-6 flexCenter flex-col  pl-20 pr-4 pb-4  bg-neutral-200 pt-20'>
      <div className='w-full h-24 justify-between gap-x-6 items-center flex'>
      {selectedAuction&&<Infocard year={selectedAuction.year} model={selectedAuction.model} kmCovered={selectedAuction.kmCovered} auctionName={selectedAuction.auctionName} brand={selectedAuction.brand}/>}
      {selectedAuction&&<Pricecard price={selectedAuction.price}/>}
      </div>
      {selectedAuction&&<OverviewCard endDate={selectedAuction.endDate} startDate={selectedAuction.startDate}/>}
    </section>
  )
}

export default page
