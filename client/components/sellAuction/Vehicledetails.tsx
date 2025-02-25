"use client"
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import useAuctiondata from '@/lib/stateStore/auctionDetails'
import { useRef } from 'react'

interface details {
    brandName: string,
    model: string,
    year:number,
    kmCovered:number,
    discription:string,
    mileage:number,
    ownership:number,
}

function Vehicledetails() {
    const {auctionData,updateAuctiondata} = useAuctiondata();

    const vehicleDetails = useRef<details>({
        brandName: "",
        model: "",
        year:0,
        kmCovered:0,
        discription:"",
        mileage:0,
        ownership:0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        vehicleDetails.current[name] = value;
        console.log(vehicleDetails.current)
    };


    return (
        <section className='w-full h-full px-40 bg-white flexCenter flex-col gap-y-10'>
            <div className='w-full flex gap-x-10 justify-between items-center'>
                <div className='flex w-full justify-start gap-y-2    items-start flex-col'>
                    <label >Brand name</label>
                    <Input onChange={handleInputChange} name='brandName' title='Brand name' placeholder='Yamaha' />
                </div>
                <div className='flex w-full justify-start gap-y-2 items-start flex-col'>
                    <label>Model</label>
                    <Input onChange={handleInputChange} name='model'  title='Model name' placeholder='rx 100' />
                </div>
            </div>
            <div className='w-full flex gap-x-10 justify-between items-center'>
                <div className='flex w-full justify-start gap-y-2 items-start flex-col'>
                    <label>year</label>
                    <Input name='year' onChange={handleInputChange} title='Year' placeholder='1947' />
                </div>
                <div className='flex w-full justify-start gap-y-2 items-start flex-col'>
                    <label>Km covered</label>
                    <Input name='kmCovered'  onChange={handleInputChange} title='Km covered' placeholder='16000' />
                </div>
            </div>
            <div className='w-full flex justify-between items-start'>
                <div className='w-full flex justify-between h-full items-start gap-x-10 '>
                    <div className='flex  w-1/2 justify-start gap-y-2 items-start flex-col'>
                        <label>Discription</label>
                        <Input name='discription' onChange={handleInputChange} className='h-40 flex justify-start items-start' title='Discription' placeholder='1947' />
                    </div>
                    <div className='flex w-1/2 flex-col justify-between items-center h-full'>
                        <div className='flex w-full justify-start gap-y-2 items-start flex-col'>
                            <label>Milage</label>
                            <Input name='milage' onChange={handleInputChange} title='Km covered' placeholder='16000' />
                        </div>
                        <div className='flex w-full justify-start gap-y-2 items-start flex-col'>
                            <label>Ownership</label>
                            <Input name='ownership' onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flexCenter px-20'>
                <Button className='w-full'>Finish vehicle details</Button>
            </div>
        </section>
    )
}

export default Vehicledetails
