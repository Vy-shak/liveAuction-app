import React from 'react'
import { UsefetchUser } from '@/app/hooks/UsefetchData'
import Image from 'next/image'
import { Button } from '../ui/button'

function Ownercard() {
  const {userdata} = UsefetchUser("user/getData");
  console.log(userdata)
  return (
    <div className='w-full bg-white rounded px-5 h-full flex-1 min-w-40'>
      <span>OWNER</span>
      {/* <div className='w-full h-20 border-2 border-neutral-600 rounded'>
        {userdata.imgUrl&&<Image alt='ownerProfile' src={userdata.imgUrl} />}
        {userdata.fullname&&<span>{userdata.fullname}</span>}
      </div> */}
      <Button>Chat</Button>
    </div>
  )
}

export {Ownercard}
