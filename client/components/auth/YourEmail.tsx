"use client"

import React from 'react'
import { Input, Button } from '../index'
import { useUserStore ,useCount} from '@/lib/stateStore/index';
import { useRef } from 'react';
import { motion } from "motion/react"

function YourEmail() {
      const emailRef = useRef<HTMLInputElement>(null)
      const {updateCount} = useCount();
      const {updateUserData,userData} = useUserStore();


      const Uploademail = ()=>{
        if (emailRef.current?.value) {
          updateUserData({type:'email',val:emailRef.current?.value});
          updateCount()
        }
      }

    return (
        <motion.div initial={{opacity:50,x:0}} animate={{ opacity: 1,x:30 }} transition={{ duration: 1 }} className='w-1/2 flex justify-start items-start flex-col gap-y-6'>
            <h4 className='font-extrabold text-2xl text-neutral-700' > <span>{`Hello ${userData.fullname}`}</span><br/><span>Welcome to Biddify</span></h4>
            <div className='w-full  gap-y-4 flex justify-start items-start flex-col'>
                <span className='font-normal text-md text-neutral-700'>Please provide your email</span>
                <Input  ref={emailRef} />
                <Button onClick={Uploademail} size={"default"} className='bg-primaryGreen-700 w-full text-white' >Next</Button>
            </div>
            </motion.div>
        )
}

export default YourEmail
