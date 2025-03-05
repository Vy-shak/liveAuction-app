"use client"
import React from 'react'
import Image from 'next/image';
import { UsefetchUser } from '@/app/hooks/UsefetchData';


export default function Userprofile() {
    const {userdata} = UsefetchUser("user/getData");
  return (
    <div className='flexCenter gap-x-2'>
        {userdata&&<Image width={50} height={50} alt='user profile' src={userdata.imgUrl} />}
        {userdata&&<span className='text-neutral-700 font-medium'>{userdata.fullname}</span>}
    </div>
  )
}
