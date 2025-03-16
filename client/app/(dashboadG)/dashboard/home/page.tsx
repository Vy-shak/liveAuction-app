"use client"

import {RenderAuctions} from '../../../../components/index';

function page() {
  return(
  <section className='w-full flexStart mt-10 flex-col gap-y-6 pl-20 pt-24'>
    <h4 className='text-4xl font-semibold ml-4 text-neutral-800'><span>Hey Anamika! </span><br/><span>welcome back</span></h4>
        <RenderAuctions renderType='ALL'/>
  </section>
  )
}

export default page
