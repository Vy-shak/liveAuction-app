import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import useSellCount from '@/lib/stateStore/sellCount'
import { VehicleIcon } from '@/public'

function VehicleImg() {
  return (
    <section className='w-full px-28'>
      <div className='flex justify-start w-full items-start flex-col'>
      <div className='w-full flex gap-y-6 flex-col justify-start items-start'>
        <div className='w-full flex gap-x-4 justify-start items-start'>
          <Image className='w-20 h-20 rounded' alt='vehicleImg' src={VehicleIcon} />
          <Image className='w-20 h-20 rounded' alt='vehicleImg' src={VehicleIcon} />
          <Image className='w-20 h-20 rounded' alt='vehicleImg' src={VehicleIcon} />
          <Image className='w-20 h-20 rounded' alt='vehicleImg' src={VehicleIcon} />
        </div>
        <Button>Upload image</Button>
      </div>
      <div className='w-full flex justify-start gap-x-6 items-center h-fit '>
        <div className='flex justify-start items-start flex-col w-fit h-fit'>
          <span className='whitespace-nowrap'>Start date</span>
          <Input />
        </div>
        <div className='flex justify-start flex-col items-start w-fit h-fit'>
          <span className='whitespace-nowrap' >End date</span>
          <Input />
        </div>
      </div>
      <div className='w-full justify-start flex items-start flex-col gap-y-6'>
        <div className='flex justify-start flex-col items-start w-fit h-fit'>
          <span className='whitespace-nowrap'>Price</span>
          <Input />
        </div>
        <Button>Register auction</Button>
      </div>
      </div>
    </section>
  )
}

export default VehicleImg
