import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { convertUtcToLocal } from '@/app/utils/timeConvert'
import { auctionData } from '@/app/Types/auctionsType'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { it } from 'node:test'

interface register {
  imgUrl: string,
  brand: string,
  model: string,
  endDate: string,
  startDate: string
  item: auctionData
}

function RegisteredCard({ imgUrl, brand, item, model, endDate, startDate }: register) {
  const { selectedAuction, updateSelection } = UseSelectedAuction();
  console.log("item",item)
  console.log("item",model)
  const [update, setUpdate] = useState(false)
  const Router = useRouter();
  endDate = convertUtcToLocal(endDate);
  startDate = convertUtcToLocal(startDate);



  const viewAuction = () => {
    updateSelection(item);
    setUpdate(true);
  }
  return (
    <Link className='w-full' href={"/dashboard/view"}>
      <div onClick={viewAuction} className='w-full flexCenter rounded-md bg-white'>
        <div className='w-full flexStart flex-col'>
          <div className='w-fit h-fit flexCenter gap-y-2 flex-col'>
            <Image className='rounded-lg flex-shrink-0 overflow-hidden w-24 h-20 object-cover' width={100} height={50} alt='vehicle image' src={imgUrl} />
            <div className='w-full h-fit flexCenter gap-x-3 '>
              <span className='text-sm font-semibold text-neutral-600'>{brand}</span>
              <span className='text-sm font-semibold text-neutral-600' >{model}</span>
            </div>
          </div>
        </div>
        <div className='w-fit flexCenter gap-x-3'>
          <div className='flexCenter w-fit h-fit flex-col'>
            <span className='whitespace-nowrap text-neutral-800 font-semibold'>Starts in</span>
            <span className='whitespace-nowrap'>{startDate}</span>
          </div>
          <div className='flexCenter flex-col'>
            <span className='whitespace-nowrap text-neutral-700 font-semibold'>Ends in</span>
            <span className='whitespace-nowrap'>{endDate}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export { RegisteredCard }
