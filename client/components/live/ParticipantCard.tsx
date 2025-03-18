import React from 'react'
import { Button } from '../ui/button'
import Members from './Members'
import { useRouter } from 'next/navigation'

interface members {
  fullname:string,
  profileUrl:string,
  socket:WebSocket,
  userId:string
}

interface membersList {
  allMembers:members[],
  socket:WebSocket,
  userId:number,
  auctionId:number
}


function ParticipantCard({allMembers,socket,userId,auctionId}:membersList) {
  const Router = useRouter();
  const LeaveRoom = ()=>{
     if (!socket||!userId!||!auctionId) {
        console.log("bad props");
        return
     };

     const metaData = {type:"leaveRoom",userId:userId,auctionId:auctionId};
     socket.send(JSON.stringify(metaData));
     Router.push("dashboard/home")
  }
  return (
    <div className='w-full bg-white flexStart flex-col gap-y-3 rounded-lg px-5 py-4'>
      <div className='w-full h-fit flex justify-between items-center'>
        <span className='text-neutral-700 text-xl font-semibold'>Participants</span>
        <Button onClick={LeaveRoom}>Leave</Button>
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
