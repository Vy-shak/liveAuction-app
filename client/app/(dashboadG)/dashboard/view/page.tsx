"use client"
import React, { useEffect } from 'react'
import { Infocard } from '../../../../components/viewAuction/Infocard'
import { Pricecard } from '../../../../components/viewAuction/Pricecard'
import { OverviewCard } from '../../../../components/viewAuction/OverviewCard'
import { Discriptioncard } from '../../../../components/viewAuction/Discriptioncard'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'
import {Ownercard} from '../../../../components/viewAuction/Ownercard'
import { useRouter } from 'next/navigation'
import { Button } from '../../../../components/index'

function page() {
  const { selectedAuction } = UseSelectedAuction();
  console.log("selectedAuction", selectedAuction)
  const Router = useRouter();

  useEffect(() => {
    if (!selectedAuction) {
      Router.push("/dashboard/home")
    }
  }, [selectedAuction]);


  console.log(selectedAuction?.discription)
  return (
    <section className='w-full gap-y-6 flexCenter flex-col  pl-20 pr-4 pb-4  bg-neutral-200 pt-20'>
      <div className='w-full h-24 justify-between gap-x-6 items-center flex'>
        {selectedAuction && <Infocard year={selectedAuction.year} model={selectedAuction.model} kmCovered={selectedAuction.kmCovered} auctionName={selectedAuction.auctionName} brand={selectedAuction.brand} />}
        {selectedAuction && <Pricecard price={selectedAuction.price} />}
      </div>
      <div className='w-full flexStart gap-x-6'>
        <div className='w-full flexStart flex-col gap-y-6'>
          {selectedAuction && <OverviewCard endDate={selectedAuction.endDate} startDate={selectedAuction.startDate} />}
          {selectedAuction && <Discriptioncard discription={selectedAuction.discription} />}
        </div>
        <Ownercard/>
      </div>
      <Button className='w-full'>Register</Button>
    </section>
  )
}

export default page
