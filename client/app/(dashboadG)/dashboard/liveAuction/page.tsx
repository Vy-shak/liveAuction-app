import React from 'react'
import AuctionHeader from '@/components/live/AuctionHeader'
import ParticipantCard from '@/components/live/ParticipantCard'

function page() {
  return (
    <section className='w-full h-full bg-neutral-200'>
      <AuctionHeader fullname={"dump"} price={'dump'} profileUrl={"dump"}/>
      <ParticipantCard />
    </section>
  )
}

export default page
