"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { VehicleIcon } from '@/public'
import { useRef } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
import { Calendar } from '../ui/calendar'
import useAuctiondata from '@/lib/stateStore/auctionDetails'
import AnimatedDatePicker from './popCalender'


enum dateType {
  start = "STARTDATE",
  end = "ENDDATE",
}

function VehicleImg() {
  const [photos,setphotos] = useState<any[]>([]);
  const priceRef = useRef<HTMLInputElement>(null)
  const {auctionData,updateAuctiondata} = useAuctiondata();

  const Register = ()=>{
     const price = priceRef.current?.value;
     if (price) {
       updateAuctiondata({type:'price',val:price})
     };
  }

  console.log(auctionData)
  const photosRef = useRef<HTMLInputElement>(null)

  const uploadPhotos = ()=>{
    photosRef.current?.click();
    console.log('clicked');
  }

  const uploadImg = async () => {

    const files = photosRef.current?.files;

    if (!files) {
        console.log("files is not present");
        return
    }
    const file = files[0];
    if (!file) {
        console.log("file is not present");
        return
    }

    if (!photos) {
      console.log("upload photos")
    };

    const randomId = Math.random();
    const profileName = `${randomId}customPhoto`;
    const upload = await supabase.storage.from('vehicleImages').upload(profileName, file);

    const { error } = upload;
    if (error) {
        console.log("unable to upload file")
    }

    const getUrl = await supabase.storage.from("vehicleImages").getPublicUrl(profileName);
    const profileUrl = getUrl.data.publicUrl;
    if (!profileUrl) {
      console.log('no url found')
      return
    }
    setphotos((prev)=>[...prev,profileUrl])
  }
  

  return (
    <section className='w-full px-28 flex flex-col justify-start items-start'>
      <div className='flex justify-start gap-y-6 w-full items-start flex-col'>
        <div className='w-full flex gap-y-6 flex-col justify-start items-start'>
          <div className='w-full flex gap-x-4 justify-start items-start'>
            {photos.map((item,index)=>(
              <Image key={index} width={50} height={50} className='w-20 h-20 rounded' alt='vehicleImg' src={item||VehicleIcon} />
            ))}
          </div>
          <div className='w-fit h-fit'>
          <input multiple onChange={uploadImg} className='hidden' type='file' ref={photosRef}/>
          <Button onClick={uploadPhotos}>Upload image</Button>
          </div>
        </div>
        <div className='w-full flex justify-start gap-x-6 items-center h-fit '>
          <div className='flex justify-start items-start flex-col w-fit h-fit'>
            <span className='whitespace-nowrap'>Start date</span>
            <AnimatedDatePicker selectedDate={dateType.start} />
          </div>
          <div className='flex justify-start flex-col items-start w-fit h-fit'>
            <span className='whitespace-nowrap' >End date</span>
            <AnimatedDatePicker selectedDate={dateType.end} />
          </div>
        </div>
        <div className='w-full justify-start flex items-start flex-col gap-y-6'>
          <div className='flex justify-start flex-col items-start w-fit h-fit'>
            <span className='whitespace-nowrap'>Price</span>
            <Input ref={priceRef} type='number' />
          </div>
          <Button onClick={Register}>Register auction</Button>
        </div>
      </div>
    </section>
  )
}

export default VehicleImg
