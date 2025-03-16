"use client"
import React from 'react'
import { RegisteredCard } from '@/components/register/RegisteredCard';
import { UsefetchAuctions } from '@/app/hooks/Usefetchauction';
import { auctionData } from '@/app/Types/auctionsType';

function page() {
  const { Auctions } = UsefetchAuctions("auctions/getMyauctions");
  const currentDate = new Date()
  console.log(Auctions)
  return (
    <section className='w-full px-20 gap-y-4 pt-20 h-full flex flex-col'>
      <div className='flexStart gap-y-1 py-2 px-4 flex-col bg-white'>
        <span className='text-neutral-800 text-lg font-semibold'>ongoing</span>
        {Auctions && Auctions.details.map((item: auctionData) => {
          const itemDateStart = new Date(item.startDate)
          const itemDateEnd = new Date(item.endDate)
          if (itemDateStart <= currentDate && itemDateEnd >= currentDate) {
            return (
              <RegisteredCard key={item.id} model={item.model} endDate={item.endDate} item={item} startDate={item.startDate} brand={item.brand} imgUrl={item.photos[0]} />
            )
          }
        })}
      </div>
      <div className='flexStart gap-y-1 py-2 px-4 flex-col bg-white'>
        <span className='text-neutral-800 text-lg font-semibold'>upcoming</span>
        {Auctions && Auctions.details.map((item: auctionData) => {
          const itemDateStart = new Date(item.startDate)
          const itemDateEnd = new Date(item.endDate)
          if (itemDateStart >= currentDate && itemDateEnd >= currentDate) {
            return (
              <RegisteredCard key={item.id} model={item.model} endDate={item.endDate} item={item} startDate={item.startDate} brand={item.brand} imgUrl={item.photos[0]} />
            )
          }
        })}
      </div>
      <div className='flexStart gap-y-1 py-2 px-4 flex-col bg-white'>
        <span className='text-neutral-800 text-lg font-semibold'>finished</span>
        {Auctions && Auctions.details.map((item: auctionData) => {
          const itemDateStart = new Date(item.startDate)
          const itemDateEnd = new Date(item.endDate)
          if (itemDateStart <= currentDate && itemDateEnd <= currentDate) {
            return (
              <RegisteredCard key={item.id} model={item.model} endDate={item.endDate} item={item} startDate={item.startDate} brand={item.brand} imgUrl={item.photos[0]} />
            )
          }
        })}
      </div>
    </section>
  )
}

export default page
