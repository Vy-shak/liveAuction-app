"use client"
import React, { ReactElement, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface menu {
    name:string,
    icons:ReactNode,
    path:string,
    collapse:boolean
}

function Sidebarmenu({name,icons,path,collapse}:menu) {
    const pathName = usePathname();
    console.log(pathName)
  return (
    <Link className='w-full' href={path}>
                <div className={` ${collapse?"w-fit px-2":"w-full px-4"} cursor-pointer transform duration-300  ${pathName===path?"bg-primaryGreen-700 text-white":"bg-neutral-100 text-neutral-700"} rounded-lg py-2 gap-x-2  flex justify-start items-center`}>
                {icons}
                {!collapse&&<span className='whitespace-nowrap'>{name}</span>}
            </div>
    </Link>
  )
}

export default Sidebarmenu
