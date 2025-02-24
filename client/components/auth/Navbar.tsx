import { div } from 'motion/react-client'
import React from 'react'
import Link from 'next/link'

function Navbar() {
    return (
        <div className='w-full cursor-pointer absolute top-3 px-6 flexCenter h-11'>
            <div className='w-full h-full bg-white border-2 border-neutral-300 rounded-md px-6 flex justify-between items-center'>
                <span className='font-bold text-lg'>Biddify</span>
                <div className='flexCenter gap-x-3 w-fit'>
                    <span className='font-semibold hover:text-primaryGreen-700 text-neutral-600 whitespace-nowrap'>Pricing</span>
                    <Link href={"/login"}>
                    <span className='font-semibold hover:text-primaryGreen-700 text-neutral-600  whitespace-nowrap'>Login</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
