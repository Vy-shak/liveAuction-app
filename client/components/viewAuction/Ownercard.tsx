import React from 'react'
import { UsefetchUser } from '@/app/hooks/UsefetchData'
import Image from 'next/image'
import { Button } from '../ui/button'

function Ownercard() {
      const {userdata} = UsefetchUser("user/getData");
  console.log("the userdate",userdata)
  return (
    <div className='w-full flex-1 bg-white rounded py-4  px-5 h-full flex-1 min-w-64 '>
      <span className='text-neutral-600 font-semibold'>OWNER</span>
      <div className='w-full gap-y-4 flexStart flex-col'>
      <div className='w-full h-20 border-2 border-neutral-100 px-6 flex justify-start items-center gap-x-4 rounded'>
        {userdata&&<Image width={50} height={50} alt='ownerProfile' src={userdata.imgUrl} />}
        {userdata&&<span>{userdata.fullname}</span>}
      </div>
      <Button>Chat</Button>
      </div>
    </div>
  )
}

export {Ownercard}
