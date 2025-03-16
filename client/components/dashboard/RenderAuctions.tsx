'use client'
import React  from 'react'
import Auctioncard from '../home/Auctioncard';
import { UsefetchAuctions } from '@/app/hooks/Usefetchauction';
import Loadingbox from '../Loader/LoadingBox';

interface renderType {
    renderType: 'ALL' | 'CAR' | 'BIKE'
}

function RenderAuctions({ renderType }: renderType) {
    const { Auctions } = UsefetchAuctions("auctions/getAll");
    if (Auctions) {
        return (
            <section className='w-full h-full'>
                <div className='w-full h-full flex-wrap  flex text-black justify-start items-start gap-x-5'>
                    {Auctions && Auctions.msg.map((item:any) => {
                        if (renderType === 'ALL') {
                            return(
                                <Auctioncard auctionName={item.auctionName} selection = {item}  key={item.id} year={item.year} endDate={item.endDate} startDate={item.startDate
                                } photo={item.photos[0]} kmCovered={item.kmCovered} model={item.model} price={item.price} brand={item.brand} /> 
                            )
                        }
                        else if (item.type === renderType) {
                            return (
                                <Auctioncard auctionName={item.auctionName} selection = {item} key={item.id} year={item.year} endDate={item.endDate} startDate={item.startDate
                                } photo={item.photos[0]} kmCovered={item.kmCovered} model={item.model} price={item.price} brand={item.brand} />
                            )
                        }
                    }
                    )}
                </div>
            </section>
        )
    }
    else {
        <Loadingbox/>
    }
}

export { RenderAuctions }
