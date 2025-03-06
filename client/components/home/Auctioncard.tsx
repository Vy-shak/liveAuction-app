"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button';
import { convertUtcToLocal } from '@/app/utils/timeConvert';
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList';
import Link from 'next/link';

type auctionData = {
    brand: string,
    model: string,
    year: number,
    kmCovered: number,
    photo: string,
    startDate: string
    endDate: string,
    price: number,
    selection: any
    auctionName:string
};

function Auctioncard({ price, auctionName, selection, startDate, endDate, model, photo, brand, year, kmCovered }: auctionData) {
    const { updateSelection } = UseSelectedAuction()
    const handleSelection = () => {
        updateSelection(selection)
    }

    startDate = convertUtcToLocal(startDate);
    endDate = convertUtcToLocal(startDate);

    return (
        <Link href={"/dashboard/view"}>
                <div onClick={handleSelection} className='w-full bg-white pt-6 px-4 flex justify-start rounded-lg items-start flex-col' >
            <div className='w-full flex justify-start items-start gap-y-2 flex-col'>
                <h3 className='text-lg font-bold'>{auctionName}</h3>
                <div className='w-full overflow-hidden rounded-lg h-40 '>
                    {photo && <Image className='w-full h-full object-cover' width={200} height={500} alt='vehicle Img' src={photo} />}
                </div>
            </div>
            <div className='w-full flex justify-between items-center'>
                <div className='w-fit flex justify-between flex-col items-start'>
                    <div className='w-fit h-fit flex flex-col justify-start items-start'>
                        <h4 className='font-bold text-neutral-800'>{`${brand} ${model}`}</h4>
                        <span className='font-light text-neutral-600 text-xs'>{`${year}-${kmCovered}`}</span>
                    </div>
                    <div className='w-fit h-fit flexCenter gap-x-4'>
                        <div className='flex justify-start items-start flex-col w-fit'>
                            <span className='font-semibold text-neutral-500 text-xs'>start in</span>
                            <span className='font-normal text-neutral-600 text-xs'>{startDate}</span>
                        </div>
                        <div className='flex justify-start items-start  flex-col w-fit'>
                            <span className='font-semibold text-neutral-500 text-xs'>ends in</span>
                            <span className='font-normal text-neutral-600 text-xs'>{startDate}</span>
                        </div>
                    </div>
                </div>
                <Button>{price}</Button>
            </div>
        </div>
        </Link>
    )
}

export default Auctioncard
