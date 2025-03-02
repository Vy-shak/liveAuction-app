
import React from 'react'
import Userprofile from './Userprofile'

function NavbarD() {
  return (
    <div className='w-full h-16 absolute flex justify-between items-center px-6 top-0 bg-white border-b-2 border-neutral-100'>
      <span className='w-fit font-bold text-neutral-700 text-2xl'>Biddify</span>
      <Userprofile/>
    </div>
  )
}

export default NavbarD
