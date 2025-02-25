"use client"
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function Vehicledetails() {
    return (
        <section className='w-full h-full px-40 bg-white flexCenter flex-col gap-y-10'>
            <div className='w-full flex gap-x-10 justify-between items-center'>
                <div className='flex w-full justify-start gap-y-3 items-start flex-col'>
                    <label>Brand name</label>
                    <Input title='Brand name' placeholder='Yamaha' />
                </div>
                <div className='flex w-full justify-start gap-y-3 items-start flex-col'>
                    <label>Brand name</label>
                    <Input title='Model name' placeholder='rx 100' />
                </div>
            </div>
            <div className='w-full flex gap-x-10 justify-between items-center'>
                <div className='flex w-full justify-start gap-y-3 items-start flex-col'>
                    <label>Brand name</label>
                    <Input title='Year' placeholder='1947' />
                </div>
                <div className='flex w-full justify-start gap-y-3 items-start flex-col'>
                    <label>Brand name</label>
                    <Input title='Km covered' placeholder='16000' />
                </div>
            </div>
            <div className='w-full flex gap-x-10 justify-between items-start'>
                <div className='w-full flex justify-between h-full items-start gap-y-5 '>
                    <div className='flex w-full justify-start gap-y-3 items-start flex-col'>
                        <label>Brand name</label>
                        <Input className='h-40 flex justify-start items-start' title='Discription' placeholder='1947' />
                    </div>
                    <div>
                    <Input title='Km covered' placeholder='16000' />
                    <Input />
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
