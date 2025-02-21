import React from 'react'
import { Input,Button } from '../index'

function YourName() {
  return (
    <div className='w-1/2 flex justify-start items-start flex-col gap-y-6'>
    <h4 className='font-extrabold text-2xl text-neutral-700' ><span>Join Biddify for a smooth and seamless </span>bidding experience!</h4>
    <div className='w-full  gap-y-4 flex justify-start items-start flex-col'>
    <span className='font-normal text-md text-neutral-700'>What we should call you</span>
    <Input />
    <Button size={"default"} className='bg-primaryGreen-700 w-full text-white' >Next</Button>
    </div>
</div>
  )
}

export default YourName
