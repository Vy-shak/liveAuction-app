import React from 'react'
import { Input,Button } from '../index'
import { useUserStore ,useCount} from '../../lib/stateStore/index';
import { useRef } from 'react';

function YourPassword() {
    const PasswordRef = useRef<HTMLInputElement>(null)
    const ConfirmPassref = useRef<HTMLInputElement>(null)
    const { updateCount } = useCount();
    const { updateUserData } = useUserStore();


    const UploadName = () => {
        if (PasswordRef.current?.value) {
            updateUserData({ type: 'password', val: PasswordRef.current?.value });
            updateCount()
        }
    }

  return (
    <div className='w-1/2 flex justify-start items-start flex-col gap-y-6'>
    <h4 className='font-extrabold text-2xl text-neutral-700' ><span>Secure you account with</span><br/><span>strong with passwords</span></h4>
    <div className='w-full  gap-y-4 flex justify-start items-start flex-col'>
    <Input className='text-neutral-700' placeholder='Confirm Password' title='Password' ref={PasswordRef} />
    <Input placeholder='Confirm Password' title='Confirm password' ref={ConfirmPassref} />
    <Button  onClick={UploadName} size={"default"} className='bg-primaryGreen-700 w-full text-white' >Launch app</Button>
    </div>
    </div>
  )
}

export default YourPassword
