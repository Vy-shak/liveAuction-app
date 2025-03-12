"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import AuctionHeader from '@/components/live/AuctionHeader'
import ParticipantCard from '@/components/live/ParticipantCard'
import BiddingCard from '@/components/live/BiddingCard'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'
import { UsefetchUser } from '@/app/hooks/UsefetchData'
import { useRouter } from 'next/navigation'
import { any } from 'zod'
import usePrice from '@/lib/stateStore/priceStore'

function page() {
  const {selectedAuction} = UseSelectedAuction();
  const {userdata} = UsefetchUser("user/getData");
  const [socket,setSocket] = useState<WebSocket|null>(null)
  const {price,updatePrice} = usePrice()
  const [membersList,setMembersList] = useState(null);
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
      ws.onopen = function(){
        setSocket(ws)
      }
      ws.onmessage = function(event){
        const wsData = JSON.parse(event.data)
        if (wsData.type == 'member') {
          setMembersList(wsData.members)
        }
        if (wsData.type == 'price') {
          setMembersList(wsData.members)
        }
      }
    })();



  },[])

  useEffect(()=>{
    if (price<Number(selectedAuction?.price)) {
       updatePrice(Number(selectedAuction?.price));

    }
  },[selectedAuction?.price])

  return (
    <section className='w-full gap-y-8 flexStart flex-col h-screen pt-20 pl-20 pr-4 bg-neutral-200'>
      <AuctionHeader fullname={"dump"} price={"dump"} profileUrl={"dump"} />
      {membersList&&<ParticipantCard allMembers={membersList} />}
      {socket&&userdata&&selectedAuction&&<BiddingCard profileUrl={userdata.imgUrl} socket={socket} auctionId={selectedAuction?.id} userId={userdata.id} fullname={userdata.fullname}/>}
    </section>
  )
}

export default page
