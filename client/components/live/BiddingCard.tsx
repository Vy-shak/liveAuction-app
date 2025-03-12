import React from 'react'
import { Minus, Plus } from "lucide-react"
import { Button } from '../ui/button'
import usePrice from '@/lib/stateStore/priceStore'
import { Socket } from 'dgram'

interface biddingDetails {
    fullname:string,
    userId:number,
    auctionId:number,
    profileUrl:string,
    socket:WebSocket
}


function BiddingCard({fullname,userId,auctionId,profileUrl,socket}:biddingDetails) {
    const {price,updatePrice} = usePrice();
    const addPrice = ()=>{
      updatePrice(price+1)
    }
    const reducePrice = ()=>{
      updatePrice(price-1)
    }

    const handlePrice = ()=>{
        const priceData = {type:"price",fullname,userId,auctionId,profileUrl,price}
        socket.send(JSON.stringify(priceData))
    }
    return (
        <div className='w-full bg-white py-16 rounded-lg flexCenter'>
            <div className='flexCenter flex-col gap-y-2'>
                <div className='flexCenter cursor-pointer gap-x-6'>
                    <Minus onClick={reducePrice} />
                    <span className='font-bold text-6xl'>{price}</span>
                    <Plus scale={1.5} onClick={addPrice} />
                </div>
                <Button onClick={handlePrice} className='w-full'>Bid</Button>
            </div>
        </div>
    )
}

export default BiddingCard
