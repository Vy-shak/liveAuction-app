import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Members from './Members'

interface members {
  fullname:string,
  profileUrl:string,
  socket:WebSocket,
  userId:string
}

interface membersList {
  allMembers:members[]
}


function ParticipantCard({allMembers}:membersList) {
  return (
    <div className='w-full bg-white flexStart flex-col gap-y-3 rounded-lg px-5 py-4'>
      <div className='w-full h-fit flex justify-between items-center'>
        <span className='text-neutral-700 text-xl font-semibold'>Participants</span>
        <Button>Leave</Button>
      </div>
      <div className='w-full flexStart gap-x-2 overflow-hidden'>
        {allMembers.map((item,index)=>(
          <Members key={index} fullname={item.fullname}  imgUrl={item.profileUrl} />
        ))}
      </div>
    </div>
  )
}

export default ParticipantCard
