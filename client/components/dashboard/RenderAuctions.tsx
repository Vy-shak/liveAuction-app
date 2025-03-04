'use client'
import React, { useEffect } from 'react'
import Auctioncard from '../home/Auctioncard';
import { UsefetchAuctions } from '@/app/hooks/Usefetchauction';
import { useAuctionlist } from '@/lib/stateStore/auctionsList';

interface renderType {
    renderType: 'ALL' | 'CAR' | 'BIKE'
}

function RenderAuctions({ renderType }: renderType) {
    const {updateAuctionList} = useAuctionlist()
    const { Auctions } = UsefetchAuctions("auctions/getAll");

    useEffect(()=>{
        updateAuctionList(Auctions)
    },[Auctions])
    console.log("auction", Auctions)
    return (
        <section className='w-full h-full'>
            <div className='w-full h-full flex text-black justify-start items-start gap-x-5'>
                {Auctions && Auctions.map((item:any) => {
                    if (renderType === 'ALL') {
                        return(
                            <Auctioncard key={item.id} year={item.year} endDate={item.endDate} startDate={item.startDate
                            } photo={item.photos[0]} kmCovered={item.kmCovered} model={item.model} price={item.price} brand={item.brand} /> 
                        )
                    }
                    else if (item.type === renderType) {
                        return (
                            <Auctioncard key={item.id} year={item.year} endDate={item.endDate} startDate={item.startDate
                            } photo={item.photos[0]} kmCovered={item.kmCovered} model={item.model} price={item.price} brand={item.brand} />
                        )
                    }
                }
                )}
            </div>
        </section>
    )
}

export { RenderAuctions }
