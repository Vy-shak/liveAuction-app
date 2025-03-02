"use client"

import React from 'react'
import {RenderAuctions} from '../../../../components/index';
import { div } from 'motion/react-client';

function page() {
  return(
  <section className='w-full pl-20 pt-24'>
        <RenderAuctions renderType='ALL'/>
  </section>
  )
}

export default page
