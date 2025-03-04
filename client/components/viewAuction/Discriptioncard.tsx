import React from 'react';

interface Discription {
  discription:string
}


function Discriptioncard({discription}:Discription) {
  return (
    <div className='w-full flex-1 gap-y-2 px-6 py-4 rounded-md bg-white flex justify-start items-start flex-col'>
      <div className='w-full flexStart h-8 border-b-2 border-neutral-400'>
        <span>Discription</span>
      </div>
      <div className='w-full h-full min-h-52'>
        <p className='text-neutral-800'>{discription}</p>
      </div>
    </div>
  )
}

export {Discriptioncard}
