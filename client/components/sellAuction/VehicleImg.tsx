"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { VehicleIcon } from '@/public'
import { useRef } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
import useAuctiondata from '@/lib/stateStore/auctionDetails'
import axios from 'axios'
import { vehicleSchema3 } from '@/lib/zod/zodSchema'


enum dateType {
  start = "STARTDATE",
  end = "ENDDATE",
}

function VehicleImg() {
  const [photos,setphotos] = useState<any[]>([]);
  const priceRef = useRef<HTMLInputElement>(null)
  const {auctionData,updateAuctiondata} = useAuctiondata();



  useEffect(()=>{
    updateAuctiondata({type:"photos",val:photos})
  },[photos])


  const Register = async () => {
    const token = localStorage.getItem("token");
    const price = priceRef.current?.value;
    if (price) {
      updateAuctiondata({ type: 'price', val: price })
    };


    const url = process.env.NEXT_PUBLIC_HTTP_URL;
    if (!url) {
      console.log("url not present");
      return
    }
    if (auctionData.photos[0]) {
      const {data} = await axios.post(`${url}auctions/createAuction`,{...auctionData},{headers:{
        "Content-Type":"application/json",
        "authToken":token}});
      console.log(data)
    }
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
    console.log(getUrl)
    const profileUrl = getUrl.data.publicUrl;
    if (!profileUrl) {
      console.log('no url found')
      return
    }
    setphotos((prev)=>[...prev,profileUrl]);
  }
  

  return (
    <section className='w-full px-28 flex flex-col justify-start items-start'>
      <div className='flex justify-start gap-y-6 w-full items-start flex-col'>
        <div className='w-full flex gap-y-6 flex-col justify-start items-start'>
          <div className='w-full flex gap-x-4 justify-start items-start'>
          <Image  width={50} height={50} className='w-20 h-20 rounded object-cover' alt='vehicleImg' src={photos[0]||VehicleIcon} />
          <Image  width={50} height={50} className='w-20 h-20 rounded object-cover' alt='vehicleImg' src={photos[1]||VehicleIcon} />
          <Image  width={50} height={50} className='w-20 h-20 rounded object-cover' alt='vehicleImg' src={photos[2]||VehicleIcon} />
          <Image  width={50} height={50} className='w-20 h-20 rounded object-cover' alt='vehicleImg' src={photos[3]||VehicleIcon} />
          </div>
          <div className='w-fit h-fit'>
          <input multiple onChange={uploadImg} className='hidden' type='file' ref={photosRef}/>
          <Button onClick={uploadPhotos}>Upload image</Button>
          </div>
        </div>
        <div className='w-full flex justify-start gap-x-6 items-center h-fit '>
          <div className='flex justify-start items-start flex-col w-fit h-fit'>
            <span className='whitespace-nowrap'>Start date</span>
          </div>
          <div className='flex justify-start flex-col items-start w-fit h-fit'>
            <span className='whitespace-nowrap' >End date</span>

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
