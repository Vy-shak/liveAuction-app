"use client"
import React from 'react'
import { AuctionName,Vehicledetails,VehicleImg } from '../../../components/index'
import useSellCount from '@/lib/stateStore/sellCount'

function page() {
  const {count,updateCount} = useSellCount()
  return (
    <section className='w-full flexCenter h-screen'>
        {count==1&&<AuctionName />}
        {count==2&&<Vehicledetails />}
        {count==3&&<VehicleImg />}
    </section>
  )
}

export default page
