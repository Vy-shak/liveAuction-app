import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

function VehicleImg() {
  return (
    <section>
      <div className='w-full flex justify-start items-start'>
      <div className='w-full flex justify-start items-start'>
        <Image />
        <Image />
        <Image />
        <Image />
      </div>
      <Button />
      </div>
      <div className='w-full flex justify-start items-start '>
        <div className='flexCenter w-fit h-fit'>
          <span>Start date</span>
          <Input />
        </div>
        <div className='flexCenter w-fit h-fit'>
          <span>End date</span>
          <Input />
        </div>
      </div>
      <div className='flexCenter w-fit h-fit'>
          <span>End date</span>
          <Input />
        </div>
        <Button>Register auction</Button>
    </section>
  )
}

export default VehicleImg
