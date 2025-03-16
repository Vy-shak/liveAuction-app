"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import AuctionHeader from '@/components/live/AuctionHeader'
import ParticipantCard from '@/components/live/ParticipantCard'
import BiddingCard from '@/components/live/BiddingCard'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'
import { UsefetchUser } from '@/app/hooks/UsefetchData'
import { useRouter } from 'next/navigation'
import myUserstore from '@/lib/stateStore/myUserdetails'
import auctionPrice from '@/lib/stateStore/auctionPrice'

function page() {
  const {selectedAuction} = UseSelectedAuction();
  const {userdata} = UsefetchUser("user/getData");
  const {updatePrice} = auctionPrice()
  const {updateMyuser} = myUserstore();
  const [socket,setSocket] = useState<WebSocket|null>(null)
  const [membersList,setMembersList] = useState(null);
  const Router = useRouter()

  useEffect(()=>{
    if (userdata) {
      console.log(userdata)
      updateMyuser({type:"userId",val:userdata.id})
      updateMyuser({type:"profileUrl",val:userdata.imgUrl})
      updateMyuser({type:"fullname",val:userdata.fullname})
    }
  },[userdata]);


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
      ws.onopen = function(){
        setSocket(ws)
      }
      ws.onmessage = function(event){
        const wsData = JSON.parse(event.data)
        if (wsData.type == 'member') {
          setMembersList(wsData.members)
        }
        if (wsData.type == 'price') {
          const n = wsData.priceList.length;
          updatePrice(wsData.priceList[n-1])
        }
      }
    })();

  },[])


  return (
    <section className='w-full gap-y-8 flexStart flex-col h-screen pt-20 pl-20 pr-4 bg-neutral-200'>
      <AuctionHeader />
      {membersList&&<ParticipantCard allMembers={membersList} />}
      {socket&&userdata&&selectedAuction&&<BiddingCard  socket={socket} auctionId={selectedAuction?.id} />}
    </section>
  )
}

export default page
