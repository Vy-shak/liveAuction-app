"use client"
import React from 'react'
import { Input } from '../ui/input'

function Vehicledetails() {
  return (
    <section className='w-full h-full bg-white'>
        <div className='w-full flex justify-between items-center'>
            <Input title='Brand name' placeholder='Yamaha' />
            <Input title='Model name' placeholder='rx 100' />
        </div>
    </section>
  )
}

export default Vehicledetails
