"use client"
import React from 'react'
import { RegisteredCard } from '@/components/register/RegisteredCard';
import { UsefetchAuctions } from '@/app/hooks/Usefetchauction';
import { auctionData } from '@/app/Types/auctionsType';

function page() {
    const {Auctions} = UsefetchAuctions("auctions/getMyauctions");

    console.log(Auctions)
  return (
    <section className='w-full h-full flex flex-col'>
        {Auctions&&Auctions.details.map((item:auctionData)=>(
            <RegisteredCard key={item.id} model={item.model} endDate={item.endDate} item={item} startDate={item.startDate} brand={item.brand} imgUrl={item.photos[0]}/>
        ))}
    </section>
  )
}

export default page
