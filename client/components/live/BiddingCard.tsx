import React from 'react'
import { Minus, Plus } from "lucide-react"
import { Button } from '../ui/button'

interface Price {
    price: number
}

function BiddingCard({ price }: Price) {
    return (
        <div className='w-full bg-white flexCenter'>
            <div>
                <div className='flexCenter gap-x-2'>
                    <Minus />
                    <span className='font-bold text-6xl'>{price}</span>
                    <Plus />
                </div>
                <Button>Bid</Button>
            </div>
        </div>
    )
}

export default BiddingCard
