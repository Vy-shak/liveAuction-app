"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import AuctionHeader from '@/components/live/AuctionHeader'
import ParticipantCard from '@/components/live/ParticipantCard'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'
import { UsefetchUser } from '@/app/hooks/UsefetchData'
import { useRouter } from 'next/navigation'
import { any } from 'zod'

function page() {
  const {selectedAuction} = UseSelectedAuction();
  const {userdata} = UsefetchUser("user/getData");
  const [membersList,setMembersList] = useState(null);
  console.log(membersList)
  const Router = useRouter()
  useEffect(()=>{
    if (!selectedAuction) {
      Router.back()
    };

    (function connectTows() {
      const auctionId = selectedAuction?.id;
      const token = localStorage.getItem("token")
      console.log(auctionId)
      if (!auctionId&&!token) {
        console.log("params not present")
        return 
      };

      const ws = new WebSocket(`ws://localhost:8080?token=${token}&auctionCode=${auctionId}`);

      ws.onmessage = function(event){
        const wsData = JSON.parse(event.data)
        if (wsData.type == 'member') {
          setMembersList(wsData.members)
        }
      }
    })();



  },[])

  return (
    <section className='w-full gap-y-8 flexStart flex-col h-screen pt-20 pl-20 pr-4 bg-neutral-200'>
      <AuctionHeader fullname={"dump"} price={'dump'} profileUrl={"dump"} />
      {membersList&&<ParticipantCard allMembers={membersList} />}

    </section>
  )
}

export default page
