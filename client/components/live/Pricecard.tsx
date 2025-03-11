import React from 'react'
import Image from 'next/image'

interface pricecard {
    imgUrl:string,
    fullname:string,
    price:string
}

function Pricecard({imgUrl,fullname,price}:pricecard) {
  return (
    <div className='flexStart flex-col'>
        <div className='flexCenter'>
            <Image width={40} height={40} alt='no image' src={imgUrl}/>
            <span>{fullname} </span>
        </div>
        <div className='w-fit h-fit px-6 py-3 border-2 border-primaryGreen-600 rounded'>
            <span className='text-6xl font-bold text-neutral-800'>{price}</span>
        </div>
    </div>
  )
}

export default Pricecard
