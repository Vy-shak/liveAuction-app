"use client"
import React from 'react'
import AuctionHeader from '@/components/live/AuctionHeader'
import ParticipantCard from '@/components/live/ParticipantCard'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

function page() {
  return (
    <section className='w-full gap-y-8 flexStart flex-col h-screen pt-20 pl-20 pr-4 bg-neutral-200'>
      <AuctionHeader fullname={"dump"} price={'dump'} profileUrl={"dump"} />
      <ParticipantCard />

    </section>
  )
}

export default page
