import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import Members from './Members'

function ParticipantCard() {
  return (
    <div className='w-full bg-white'>
      <div className='w-full h-fit flex justify-between items-center'>
        <span>Participants</span>
        <Button>Leave</Button>
      </div>
      <div className='w-full flexStart'>
        <Members fullname={"dump"}  imgUrl={"dump"} />
      </div>
    </div>
  )
}

export default ParticipantCard
