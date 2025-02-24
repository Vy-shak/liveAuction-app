"use client"
import React from 'react'
import { useCount } from '@/lib/stateStore'
import { useState } from 'react';



function Progressdiv() {
    const {count} = useCount();
    const[progress,setProgress] = useState([1,2,3,4])
  return (
    <div className='flex absolute top-32 left-20 flexCenter gap-x-4 w-fit h-fit'>
        {progress.map((item,index)=>(
            <div key={index} className={`${item<count?"bg-primaryGreen-600":"bg-neutral-500"} w-20 h-2 rounded-full`}></div>
        ))}
    </div>
  )
}

export default Progressdiv
