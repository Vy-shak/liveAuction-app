import React from 'react'
import Image from 'next/image'
import { img } from 'motion/react-client'

interface members {
    imgUrl:string,
    fullname:string
}

function Members({imgUrl,fullname}:members) {
  return (
    <div className='flexCenter flex-col w-fit h-fit'>
      <Image width={80} height={80} alt='image' src={imgUrl} />
      <span>{fullname}</span>
    </div>
  )
}

export default Members
