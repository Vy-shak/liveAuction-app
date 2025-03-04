"use client"
import React from 'react'
import { Infocard } from '../../../../components/viewAuction/Infocard'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'

function page() {
  const {selectedAuction} = UseSelectedAuction();
  console.log(selectedAuction)
  return (
    <section className='w-full'>
      {selectedAuction&&<Infocard year={selectedAuction.year} model={selectedAuction.model} kmCovered={selectedAuction.kmCovered} auctionName={selectedAuction.auctionName} brand={selectedAuction.brand}/>}
    </section>
  )
}

export default page
