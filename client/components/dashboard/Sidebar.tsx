"use client"
import React from 'react'
import Sidebarmenu from './Sidebarmenu'
import { Home, TvMinimalPlay, CarFront, Bike, ShoppingBag, Library } from 'lucide-react'
import { ArrowLeftToLine } from "lucide-react"

const menuItems1 = [
  {
    name: "home",
    id: "home",
    startIcon: <Home />,
    path: "/dashboard/home"
  },
  {
    name: "live auctions",
    id: "liveAuctions",
    startIcon: <TvMinimalPlay />,
    path: "/dashboard/live"
  },
  {
    name: "cars",
    id: "cars",
    startIcon: <CarFront />,
    path: "/dashboard/cars"
  },
  {
    name: "bikes",
    id: "bikes",
    startIcon: <Bike />,
    path: "/dashboard/bike"
  },
  {
    name: "sell items",
    id: "sell",
    startIcon: <ShoppingBag />,
    path: "/dashboard/sell"
  },
];

const menuItems2 = [
  {
    name: "Create auctions",
    id: "createAuctions",
    startIcon: <ShoppingBag />,
    path: "/dashboard/create"
  },
  {
    name: "My auctions",
    id: "Myauctions",
    startIcon: <Library />,
    path: "/dashboard/myAuctions"
  },
];



function Sidebar() {
  return (
    <div className='w-56 pt-12  border-r-2 gap-y-3 border-neutral-300 absolute h-full top-0 left-0 bg-white flex justify-start items-start flex-col'>
      <div className='w-full h-fit flex mt-10 justify-end items-center pr-6'>
        <ArrowLeftToLine />
      </div>
      <div className='flex justify-start gap-y-6 items-start flex-col w-full'>
        <div className='w-full pt-4 px-4 flex justify-start items-start flex-col gap-y-4'>
          {menuItems1.map((item) => (
            <Sidebarmenu path={item.path} key={item.id} icons={item.startIcon} name={item.name} />
          ))}
        </div>
        <div className=' flex flex-col justify-start items-start w-full whitespace-nowrap'>
          <span className='text-xs ml-4 font-semibold text-neutral-500'>BECOME SELLER</span>
          <div className='w-full pt-4 px-4 flex justify-start items-start flex-col gap-y-4'>
            {menuItems2.map((item) => (
              <Sidebarmenu path={item.path} key={item.id} icons={item.startIcon} name={item.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
