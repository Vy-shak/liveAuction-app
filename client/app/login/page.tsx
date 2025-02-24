
import React from 'react';
import { CarImg } from '@/public';
import Image from 'next/image';
import { Signinform } from "../../components/index";


const Loginform = () => {


    return (
        <div className='w-full flexCenter h-screen px-12'>
            <div className='w-1/2 px-28'>
            <Signinform />
            </div>
            <div className='w-1/2 px-20 z-50'>
                <Image alt='carimage' src={CarImg} />
            </div>
        </div>
    );
};

export default Loginform