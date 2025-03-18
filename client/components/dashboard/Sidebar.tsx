"use client"
import React, { useState } from 'react'
import Sidebarmenu from './Sidebarmenu'
import { Home, TvMinimalPlay, CarFront, Bike, UserPlus  , BookKey ,Library } from 'lucide-react'
import { ChevronFirst  } from "lucide-react"

const menuItems1 = [
  {
    name: "Home",
    id: "home",
    startIcon: <Home />,
    path: "/dashboard/home"
  },
  {
    name: "Live auctions",
    id: "liveAuctions",
    startIcon: <TvMinimalPlay />,
    path: "/dashboard/live"
  },
  {
    name: "Cars",
    id: "cars",
    startIcon: <CarFront />,
    path: "/dashboard/cars"
  },
  {
    name: "Bikes",
    id: "bikes",
    startIcon: <Bike />,
    path: "/dashboard/bikes"
  },
  {
    name: "Registerd auctions",
    id: "sell",
    startIcon: <UserPlus />,
    path: "/dashboard/registered"
  },
];

const menuItems2 = [
  {
    name: "Create auctions",
    id: "createAuctions",
    startIcon: <BookKey />,
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
  const [collapse,setCollapse] = useState(false);


  return (
    <div onMouseLeave={()=>setCollapse(true)} onMouseEnter={()=>setCollapse(false)} className={`${collapse?"w-fit cursor-pointer transform duration-1000":"w-56 transform duration-1000"} ease-out pt-12 transform duration-1000  border-r-2 gap-y-3 border-neutral-200 fixed h-full top-0 left-0 z-50 bg-white flex justify-start items-start flex-col`}>
      <div className='w-full cursor-pointer h-fit flex mt-10 justify-end items-center pr-6'>
        <ChevronFirst   className={`${collapse?"rotate-180 transform duration-500":"rotate-0 transform duration-500"}`} onClick={()=>setCollapse((prev)=>!prev)} />
      </div>
      <div className='flex justify-start px-4 gap-y-6 items-start flex-col w-full'>
        <div className='w-full pt-4  flex justify-start items-start flex-col gap-y-4'>
          {menuItems1.map((item) => (
            <Sidebarmenu collapse={collapse} path={item.path} key={item.id} icons={item.startIcon} name={item.name} />
          ))}
        </div>
        <div className=' flex flex-col justify-start items-start w-full whitespace-nowrap'>
          <span className={`text-xs ml-4 font-semibold ${collapse?"w-0 hidden":null} text-neutral-500`}>BECOME SELLER</span>
          <div className='w-full pt-4  flex justify-start items-start flex-col gap-y-4'>
            {menuItems2.map((item) => (
              <Sidebarmenu collapse={collapse} path={item.path} key={item.id} icons={item.startIcon} name={item.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
