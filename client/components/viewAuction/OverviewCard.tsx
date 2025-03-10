import React from 'react'
import { convertUtcToLocal } from '@/app/utils/timeConvert'

interface Overview {
  startDate:string,
  endDate:string
}

function OverviewCard({startDate,endDate}:Overview) {
  startDate = convertUtcToLocal(startDate);
  endDate = convertUtcToLocal(endDate);
  return (
    <div className='w-full flex-1 gap-y-2 px-6 py-4 rounded-md bg-white flex justify-start items-start flex-col'>
      <div className='w-full flexStart h-8 border-b-2 border-neutral-400'>
        <span>Overview</span>
      </div>
      <div className='w-full gap-y-2 flexStart flex-col'>
        <span className='text-neutral-700'>{`START DATE  ${startDate}`}</span>
        <span className='text-neutral-700'>{`END DATE  ${endDate}`}</span>
      </div>
    </div>
  )
}

export {OverviewCard}
