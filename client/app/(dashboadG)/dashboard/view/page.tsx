"use client"
import React, { useEffect } from 'react'
import { Infocard } from '../../../../components/viewAuction/Infocard'
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
    <section className='w-full pl-20 pr-4 pb-4 h-fit bg-neutral-200 pt-20'>
      {selectedAuction&&<Infocard year={selectedAuction.year} model={selectedAuction.model} kmCovered={selectedAuction.kmCovered} auctionName={selectedAuction.auctionName} brand={selectedAuction.brand}/>}
    </section>
  )
}

export default page
