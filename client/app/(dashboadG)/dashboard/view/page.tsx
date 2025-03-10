"use client"
import React, { useEffect, useState } from 'react'
import { Infocard } from '../../../../components/viewAuction/Infocard'
import { Pricecard } from '../../../../components/viewAuction/Pricecard'
import { OverviewCard } from '../../../../components/viewAuction/OverviewCard'
import { Discriptioncard } from '../../../../components/viewAuction/Discriptioncard'
import { UseSelectedAuction } from '@/lib/stateStore/auctionsList'
import { Ownercard } from '../../../../components/viewAuction/Ownercard'
import { Button } from '../../../../components/index'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import axios from 'axios'
import { SuccessAnimation } from '@/components/Loader/SuccessAnimation'
import CheveronBox from '@/components/icons/CheveronBox'
import { getTimeLeft } from '@/app/utils/getTimeleft'
import Link from 'next/link'
import { get } from 'http'

function page() {
  const { selectedAuction } = UseSelectedAuction();
  const [registered,setRegistered] = useState(false);
  const [renderImg,setRenderImg] = useState(0);
  const [fetchDone,setFetchdone] = useState(false);
  const Router = useRouter()

  useEffect(()=>{
    if (!selectedAuction) {
      Router.push("/dashboard/home")
    };
    const checkRegistration = async ()=>{
      const token = localStorage.getItem("token");
      const url = process.env.NEXT_PUBLIC_HTTP_URL;
      try {
        const check = await axios.post(`${url}auctions/checkRegistration`,{auctionId:selectedAuction?.id},{
          headers: {
            "Content-Type": "application/json",
            "authToken": token
          }
        });

        if (check.data.details) {
          console.log("bro",check.data.details)
          const currentDate = new Date();
          const startDate = check.data.details.auction.startDate;
          // const timeRemains = getTimeLeft(startDate,currentDate);
          // console.log("time",timeRemains)
          // // if (currentDate<startDate) {
          // //    const timeRemains = getTimeLeft(startDate,currentDate);
          // //    console.log("time",timeRemains)
          // // }
          setRegistered(true)
        }
      } catch (error) {
        console.log(error)
      }
    };
    checkRegistration();

  },[]);

  const handleRegister = async () => {
    const token = localStorage.getItem("token");
    const url = process.env.NEXT_PUBLIC_HTTP_URL;

    if (!token) {
      console.log("token is not defined")
    };

    if (!url) {
      console.log("url is not defined")
    };

    try {

      const req = await axios.post(`${url}auctions/registerAuctions`, { auctionId: selectedAuction?.id }, {
        headers: {
          "Content-Type": "application/json",
          "authToken": token
        }
      });

      if (req) {
        setFetchdone(true);
        setTimeout(()=>{
          Router.push("/dashboard/registered")
        },2000);
      }

      console.log(req);

    } catch (error) {
      throw error
    }
  };

  const nextImg = ()=>{
    if(!selectedAuction?.photos) {
      return
    }
    let maxVal = selectedAuction?.photos.length
    if(renderImg>=maxVal-1) {
       return
    };
    setRenderImg((prev)=>prev+1)
  }

  const prevImg = ()=>{
    if (renderImg<=0) {
       return
    };
    setRenderImg((prev)=>prev-1)
  }
  console.log("hey",selectedAuction)
  return (
    <section className='w-full gap-y-6 flexCenter flex-col  pl-20 pr-4 pb-4  bg-neutral-200 pt-20'>
      {fetchDone&&<SuccessAnimation/>}
      <div className='w-full gap-x-6 flexCenter h-fit'>
        <div onClick={prevImg} className='w-fit h-fit'>
        <CheveronBox type='left'/>
        </div>
        <div className='w-1/3 h-96  rounded-xl overflow-hidden'>
        {selectedAuction&&<Image  className='w-full h-full object-cover' width={200} height={100} alt='vehicleimage' src={selectedAuction?.photos[renderImg]}/>}
        </div>
        <div onClick={nextImg} className='w-fit h-fit'>
        <CheveronBox type='right'/>
        </div>
      </div>
      <div className='w-full h-24 justify-between gap-x-6 items-center flex'>
        {selectedAuction && <Infocard year={selectedAuction.year} model={selectedAuction.model} kmCovered={selectedAuction.kmCovered} auctionName={selectedAuction.auctionName} brand={selectedAuction.brand} />}
        {selectedAuction && <Pricecard price={selectedAuction.price} />}
      </div>
      <div className='w-full h-full  flexStart items-stretch gap-x-6'>
        <div className='w-full flex justify-start  flex-col gap-y-6'>
          {selectedAuction && <OverviewCard endDate={selectedAuction.endDate} startDate={selectedAuction.startDate} />}
          {selectedAuction && <Discriptioncard discription={selectedAuction.discription} />}
        </div>
        <Ownercard />
      </div>
      {!registered&&<Button onClick={handleRegister} className='w-full'>Register</Button>}
      {registered&&<Link className='w-full' href={"/dashboard/live"}>
      <Button className='w-full'>View auction</Button>
      </Link>}
    </section>
  )
}

export default page
