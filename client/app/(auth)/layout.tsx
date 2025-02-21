import React, { ReactNode } from 'react'
import Image from 'next/image';
import { Input,Button } from '@/components';


function layout({children}: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <section className='w-full h-screen'>
        <div className='w-1/2'>
        <h4 ><span>Join Biddify for a smooth and seamless </span>bidding experience!</h4>
        <span>What we should call you</span>
        <Input />
        <Button></Button>
        </div>
        <div className='w-1/2 bg-neutral-500'>

        </div>
    </section>
  )
}

export default layout
