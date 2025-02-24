import React from 'react'
import Sidebarmenu from './Sidebarmenu'
import { Home,TvMinimalPlay,CarFront,Bike,ShoppingBag } from 'lucide-react'
import {ArrowLeftToLine } from "lucide-react"

const menuItems = [
    {
      name: "home",
      id: "home",
      startIcon: <Home/>,
    },
    {
      name: "live auctions",
      id: "liveAuctions",
      startIcon: <TvMinimalPlay/>,
    },
    {
      name: "cars",
      id: "cars",
      startIcon: <CarFront/>,
    },
    {
      name: "bikes",
      id: "bikes",
      startIcon: <Bike/>,
    },
    {
      name: "sell items",
      id: "sell",
      startIcon: <ShoppingBag />,
    },
  ];

function Sidebar() {
  return (
    <div className='w-56     pt-12 gap-y-4 border-r-2 border-neutral-300 absolute h-full top-0 left-0 bg-white flex justify-start items-start flex-col'>
        <div className='w-full flex justify-between items-center px-4 border-b-2'>
        <span className='whitespace-nowrap font-bold text-3xl w-fit'>Biddify</span>
        <ArrowLeftToLine />
        </div>
        <div className='w-full pt-4 px-4 flex justify-start items-start flex-col gap-y-3'>
        {menuItems.map((item)=>(
            <Sidebarmenu key={item.id} icons={item.startIcon} name={item.name}/>
      ))}
        </div>
    </div>
  )
}

export default Sidebar
