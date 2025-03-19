"use client"
import React from 'react'
import { Input,Button } from '../index'
import { useUserStore ,useCount} from '../../lib/stateStore/index';
import { useRef } from 'react';
import { motion } from "motion/react"
import { toast } from 'sonner';


function YourPassword() {
    const PasswordRef = useRef<HTMLInputElement>(null)
    const ConfirmPassref = useRef<HTMLInputElement>(null)
    const { updateCount } = useCount();
    const { updateUserData,userData } = useUserStore();

    console.log(userData);


    const UploadName = () => {
        if (PasswordRef.current?.value!==ConfirmPassref.current?.value!) {
          toast.warning("passwords does not match")
          return
        }
        if (PasswordRef.current?.value) {
            updateUserData({ type: 'password', val: PasswordRef.current?.value });
            updateCount()
        }
    }


  return (
    <motion.div initial={{opacity:50,x:0}} animate={{ opacity: 1,x:30}} transition={{ duration: 1}} className='w-1/2 flex justify-start items-start flex-col gap-y-6'>
    <h4 className='font-extrabold text-2xl text-neutral-700' ><span>Secure you account with</span><br/><span>strong with passwords</span></h4>
    <div className='w-full  gap-y-4 flex justify-start items-start flex-col'>
    <Input type='password' className='text-neutral-700' placeholder='Password' title='Password' ref={PasswordRef} />
    <Input type='password' placeholder='Confirm Password' title='Confirm password' ref={ConfirmPassref} />
    <Button  onClick={UploadName} size={"default"} className='bg-primaryGreen-700 w-full text-white' >Launch app</Button>
    </div>
    </motion.div>
  )
}

export default YourPassword
