import React from 'react'
import { Minus, Plus } from "lucide-react"
import { Button } from '../ui/button'
import usePrice from '@/lib/stateStore/priceStore'


function BiddingCard() {
    const {price,updatePrice} = usePrice();
    const addPrice = ()=>{
      updatePrice(price+1)
    }
    const reducePrice = ()=>{
      updatePrice(price-1)
    }
    return (
        <div className='w-full bg-white py-16 rounded-lg flexCenter'>
            <div className='flexCenter flex-col gap-y-2'>
                <div className='flexCenter cursor-pointer gap-x-2'>
                    <Minus onClick={reducePrice} />
                    <span className='font-bold text-6xl'>{price}</span>
                    <Plus onClick={addPrice} />
                </div>
                <Button className='w-full'>Bid</Button>
            </div>
        </div>
    )
}

export default BiddingCard
