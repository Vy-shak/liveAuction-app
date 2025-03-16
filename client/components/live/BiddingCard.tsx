import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import myUserstore from '@/lib/stateStore/myUserdetails'
import auctionPrice from '@/lib/stateStore/auctionPrice'
import { useRef } from 'react'

interface biddingDetails {
    auctionId:number,
    socket:WebSocket
}


function BiddingCard({auctionId,socket}:biddingDetails) {
    const myPriceRef = useRef<HTMLInputElement>(null);
    const  {priceData}= auctionPrice()
    const {myuser} = myUserstore();

    const handlePrice = ()=>{
        if(!myuser.fullname&&!myuser.profileUrl&&!myuser.userId&&myPriceRef.current?.value) {
            console.log("returning")
            return
        }
        const priceData = {type:"price",fullname:myuser.fullname,userId:myuser.userId,auctionId,profileUrl:myuser.profileUrl,price:myPriceRef.current?.value};
        socket.send(JSON.stringify(priceData))
    }
    return (
        <div className='w-full bg-white py-16 rounded-lg flexCenter'>
            <div className='flexCenter flex-col gap-y-2'>
                <div className='flexCenter cursor-pointer gap-x-6'>
                    {/* <Minus onClick={reducePrice} /> */}
                    <Input placeholder={priceData.price.toString()}   type='number' ref={myPriceRef}/>
                    {/* <Plus scale={1.5} onClick={addPrice} /> */}
                </div>  
                <Button onClick={handlePrice} className='w-full'>Bid</Button>
            </div>
        </div>
    )
}

export default BiddingCard
