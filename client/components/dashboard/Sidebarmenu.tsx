import React, { ReactElement, ReactNode } from 'react'


interface menu {
    name:string,
    icons:ReactNode
}

function Sidebarmenu({name,icons}:menu) {
  return (
            <div className='w-full cursor-pointer rounded py-2 gap-x-2 px-4 bg-neutral-200 flex justify-start items-center'>
                {icons}
                <span>{name}</span>
            </div>
  )
}

export default Sidebarmenu
