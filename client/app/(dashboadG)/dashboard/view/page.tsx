"use client"
import React, { useEffect } from 'react'
import { Infocard } from '../../../../components/viewAuction/Infocard'
import { Pricecard } from '../../../../components/viewAuction/Pricecard'
import { OverviewCard } from '../../../../components/viewAuction/OverviewCard'
import { Discriptioncard } from '../../../../components/viewAuction/Discriptioncard'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'
import { Ownercard } from '../../../../components/viewAuction/Ownercard'
import { useRouter } from 'next/navigation'
import { Button } from '../../../../components/index'
import axios from 'axios'
import { url } from 'inspector'

function page() {
  const { selectedAuction } = UseSelectedAuction();
  console.log("selectedAuction", selectedAuction);
  const Router = useRouter();

  useEffect(() => {
    if (!selectedAuction) {
      Router.push("/dashboard/home")
    }
  }, [selectedAuction]);

  const handleRegister = async () => {
    const token = localStorage.getItem("token");
    const url = process.env.NEXT_PUBLIC_HTTP_URL;


    if (!token) {
      console.log("token is not defined")
    };

    if (!url) {
      console.log("url is not defined")
    };

    try {

      const req = await axios.post(`${url}auctions/registerAuctions`, {auctionId:selectedAuction?.id}, {
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
        <Ownercard />
      </div>
      <Button onClick={handleRegister} className='w-full'>Register</Button>
    </section>
  )
}

export default page
