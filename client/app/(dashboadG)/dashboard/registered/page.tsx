"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { RegisteredCard } from '@/components/register/RegisteredCard';
import { auctionData } from '@/app/Types/auctionsType';

interface auction{
  auction:auctionData,
  auctionId:number,
  userId:number
}

function page() {
  const [Auctions,setAuctions] = useState<any[]|any>();
  
  useEffect(() => {
    (async function fetchAuction() {
      const url = process.env.NEXT_PUBLIC_HTTP_URL;
      const token = localStorage.getItem("token")
      if (!url) {
        console.log("url not present at auction");
        return
      }
      const { data } = await axios.get(`${url}${"auctions/getRegistrations"}`, {
        headers: {
          "Content-Type": "application/json",
          "authToken": token
        }
      });

      if (data) {
        setAuctions(data.details)
      }

    })()
  }, []);
  
  console.log("regiAuction",Auctions)
  return (
    <section className='w-full flexStart pl-24 pt-20 flex-col'>
      <div className='w-full flexStart gap-y-4 flex-col'>
      {Auctions&&Auctions.map(({auction}:auction)=>(
        <RegisteredCard item={auction} key={auction.id} endDate={auction.endDate.toString()} startDate={auction.startDate.toString()} model={auction.model} brand={auction.brand} imgUrl={auction.photos[0]}/>
      ))}
      </div>
    </section>
  )
}

export default page
