"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button';
import { Badge } from 'lucide-react';
import { Clock } from 'lucide-react';
import { convertUtcToLocal } from '@/app/utils/timeConvert';
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList';
import Link from 'next/link';
import { Card, CardContent } from '../ui/card';
import { useRouter } from 'next/navigation';

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
    auctionName: string
};

function Auctioncard({ price, auctionName, selection, startDate, endDate, model, photo, brand, year, kmCovered }: auctionData) {
    const { updateSelection } = UseSelectedAuction();
    const Router = useRouter()
    const handleSelection = () => {
        updateSelection(selection)
    }

    startDate = convertUtcToLocal(startDate);
    endDate = convertUtcToLocal(startDate);

    return (
        <Link href={"/dashboard/view"}>
            <Card onClick={handleSelection} className="overflow-hidden  min-w-96">
                <div className="relative w-full">
                    <Image
                        src={photo}
                        width={500}
                        height={300}
                        alt="1967 Porsche 911"
                        className="w-full h-[200px] object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-green-600">Active</Badge>
                </div>
                <CardContent className="p-6 w-full">
                    <div className="flex w-full justify-between items-center mb-3">
                        <div className='flexStart flex-col w-full'>
                            <span className='text-xl  font-semibold'>{auctionName}</span>
                            <h3 className="text-md text-neutral-800 font-semibold">{`${year} ${brand} ${model}`}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-green-600">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium whitespace-nowrap">2d 14h</span>
                        </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{kmCovered}km</p>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Current Bid</p>
                            <p className="text-xl font-bold">{price} INR</p>
                        </div>
                        <Button  className="bg-green-600 hover:bg-green-700">Bid Now</Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default Auctioncard
