import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CarImg } from '@/public';
import axios from 'axios';


const Loginform = () => {
    return (
        <div className='w-full flexCenter h-screen px-12'>
            <div className='w-1/2 px-28'>
            <div className='w-full flex gap-5  justify-start items-start flex-col'>
                <div className='w-full gap-y-3 flex justify-start items-start flex-col'>
                    <h3 className='text-2xl font-bold'><span>Start your</span><br /><span>Engines!</span></h3>
                    <h2 className='text-md font-normal text-neutral-500'>Log in to bid on timeless classics and rare finds</h2>
                </div>
            <div className="w-full flexCenter flex-col bg-white  gap-y-4">
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button className="w-full">Login</Button>
            </div>
            </div>
            </div>
            <div className='w-1/2 px-20 z-50'>
                <Image alt='carimage' src={CarImg} />
            </div>
        </div>
    );
};

export default Loginform