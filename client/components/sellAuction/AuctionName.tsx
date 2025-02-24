import React from 'react'
import Image from 'next/image'
import { CarIcon,BikeIcon } from '../../public/index'
import { Input } from '../ui/input'
import { Butcherman } from 'next/font/google'
import { Button } from '../ui/button'

function AuctionName() {
  return (
    <div className='flexCenter w-full gap-y-8 max-w-lg flex-col'>
        <div className='w-full flexCenter flex-col gap-y-6'>
        <span className='whitespace-nowrap text-2xl font-semibold text-neutral-800'>What are you planning to sell on auction?</span>
        <div className='w-fit h-fit flexCenter gap-x-4'>
            <Image className='w-20 rounded-lg cursor-pointer' alt='carIcon' src={CarIcon} />
            <Image className='w-20 rounded-lg' alt='bikeIcon' src={BikeIcon} />
        </div>
        </div>
        <div className='flexCenter gap-y-6 flex-col w-full'>
        <div className='w-full flex justify-start items-start flex-col'>
            <span>Name your auction</span>
            <Input />
        </div>
        <Button className='w-full'>next</Button>
        </div>
    </div>
  )
}

export default AuctionName
