"use client"
import React, { ReactElement, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface menu {
    name:string,
    icons:ReactNode,
    path:string
}

function Sidebarmenu({name,icons,path}:menu) {
    const pathName = usePathname();
    console.log(pathName)
  return (
    <Link className='w-full' href={path}>
                <div className={`w-full cursor-pointer  ${pathName===path?"bg-primaryGreen-700 text-white":"bg-neutral-300 text-neutral-700"} rounded-lg py-2 gap-x-2 px-4  flex justify-start items-center`}>
                {icons}
                <span>{name}</span>
            </div>
    </Link>
  )
}

export default Sidebarmenu
