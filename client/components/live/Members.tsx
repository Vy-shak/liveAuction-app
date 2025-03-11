import React from 'react'
import Image from 'next/image'
import { img } from 'motion/react-client'

interface members {
    imgUrl:string,
    fullname:string
}

function Members({imgUrl,fullname}:members) {
  return (
    <div className='flexCenter w-fit h-fit'>
      <Image alt='image' src={imgUrl} />
      <span>{fullname}</span>
    </div>
  )
}

export default Members
