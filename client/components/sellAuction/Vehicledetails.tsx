"use client"
import React, { useEffect } from 'react'
import { Input,Button,Textarea } from '../index'
import useAuctiondata from '@/lib/stateStore/auctionDetails'
import { useRef } from 'react'
import useSellCount from '@/lib/stateStore/sellCount'
import { ChevronDown } from 'lucide-react'
import { vehicleSchema2 } from '@/lib/zod/zodSchema'
import { toast } from 'sonner'

interface details {
    brand: string,
    model: string,
    year:number,
    kmCovered:number,
    discription:string,
    mileage:number,
    ownership:number,
}

function Vehicledetails() {
    const {auctionData,updateAuctiondata} = useAuctiondata();
      const {count,updateCount} = useSellCount()
    console.log(auctionData)

    const vehicleDetails = useRef<details>({
        brand: "",
        model: "",
        year:0,
        kmCovered:0,
        discription:"",
        mileage:0,
        ownership:0,
    });


    const addvehicleData = ()=>{
        const {brand,model,year,kmCovered,discription,mileage,ownership} = vehicleDetails.current;
        const zodCheck = vehicleSchema2.safeParse(vehicleDetails.current);
        const path = zodCheck.error?.issues[0].path[0];
        if (!zodCheck.success) {
           toast.warning(`There seems to be a problem with ${path}. Kindly review it.`);
           return 
        };

        for(const key in vehicleDetails.current) {
                    //@ts-ignore
            const value = vehicleDetails.current[key];
                    //@ts-ignore
            updateAuctiondata({type:key,val:value});
        };

        updateCount()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        //@ts-ignore
        vehicleDetails.current[name] = value;
    };


    return (
        <section className='w-full h-full px-40 bg-white flexCenter flex-col gap-y-10'>
            <div className='w-full flex gap-x-10 justify-between items-center'>
                <div className='flex w-full justify-start gap-y-2    items-start flex-col'>
                    <label >Brand name</label>
                    <Input onChange={handleInputChange} name='brand' title='Brand name' placeholder='Yamaha' />
                </div>
                <div className='flex w-full justify-start gap-y-2 items-start flex-col'>
                    <label>Model</label>
                    <Input onChange={handleInputChange} name='model'  title='Model name' placeholder='rx 100' />
                </div>
            </div>
            <div className='w-full flex gap-x-10 justify-between items-center'>
                <div className='flex w-full justify-start gap-y-2 items-start flex-col'>
                    <label>year</label>
                    <Input name='year' className='w-40' type='number' onChange={handleInputChange} title='Year' placeholder='1947' />
                </div>
                <div className='flex w-full justify-start gap-y-2 items-start flex-col'>
                    <label>Km covered</label>
                    <Input name='kmCovered' className='w-40' type='number'  onChange={handleInputChange} title='Km covered' placeholder='16000' />
                </div>
            </div>
            <div className='w-full flex justify-between items-start'>
                <div className='w-full flex justify-between h-full items-start gap-x-10 '>
                    <div className='flex  w-1/2 justify-start gap-y-2 items-start flex-col'>
                        <label>Discription</label>
                        <Input name='discription' onChange={handleInputChange} className='h-40 text-left' title='Discription' placeholder='1947' />
                    </div>
                    <div className='flex w-1/2 flex-col justify-between items-center h-full'>
                        <div className='flex w-full justify-start gap-y-2 items-start flex-col'>
                            <label>Mileage</label>
                            <Input name='mileage' className='w-40' type='number' onChange={handleInputChange} title='Km covered' placeholder='16000' />
                        </div>
                        <div className='flex w-full justify-start gap-y-2 items-start flex-col'>
                            <label>Ownership</label>
                            <div className='w-fit flexCenter'>
                            <Input name='ownership' className='w-40' type='number' onChange={handleInputChange} />
                            <ChevronDown color='grey'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flexCenter px-20'>
                <Button  onClick={addvehicleData} className='w-full'>Finish vehicle details</Button>
            </div>
        </section>
    )
}

export default Vehicledetails
