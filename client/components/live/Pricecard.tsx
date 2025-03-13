import React from 'react'
import Image from 'next/image'
import myUserstore from '@/lib/stateStore/myUserdetails'

interface pricecard {
    price:number
}

function Pricecard({price}:pricecard) {
  const {myuser} = myUserstore()
  return (
    <div className='flexStart  flex-col'>
        <div className='flexCenter'>
            {myuser.profileUrl&&<Image width={40} height={40} alt='no image' src={myuser.profileUrl}/>}
            <span>{myuser.fullname} </span>
        </div>
        <div className='w-fit h-fit px-6 py-3 border-2 border-primaryGreen-600 rounded'>
            <span className='text-6xl font-bold text-neutral-800'>{price}</span>
        </div>
    </div>
  )
}

export default Pricecard
