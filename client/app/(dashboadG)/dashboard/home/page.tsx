"use client"
import { Auctioncard } from '../../../../components/index'
import React from 'react'
import {UsefetchAuctions} from '../../../hooks/Usefetchauction';

function page() {
  const {Auctions} = UsefetchAuctions("auctions/getAll");
  console.log("auction",Auctions)
  return (
    <section className='w-full h-full'>
      {/* {Auctions&&Auctions.map((item)=>(
      ))} */}

    </section>
  )
}

export default page
