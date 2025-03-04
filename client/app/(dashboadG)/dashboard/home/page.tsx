"use client"

import React, { useEffect } from 'react'
import {RenderAuctions} from '../../../../components/index';

function page() {
  return(
  <section className='w-full pl-20 pt-24'>
        <RenderAuctions renderType='ALL'/>
  </section>
  )
}

export default page
