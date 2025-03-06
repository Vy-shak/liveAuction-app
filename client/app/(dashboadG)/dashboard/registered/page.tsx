"use client"
import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
function page() {
  const [Auctions,setAuctions] = useState<any[]|any>();
  
  useEffect(() => {
    (async function fetchAuction() {
      const url = process.env.NEXT_PUBLIC_HTTP_URL;
      const token = localStorage.getItem("token")
      if (!url) {
        console.log("url not present at auction");
        return
      }
      const { data } = await axios.get(`${url}${"auctions/getRegistrations"}`, {
        headers: {
          "Content-Type": "application/json",
          "authToken": token
        }
      });

      if (data) {
        setAuctions(data)
      }

    })()
  }, []);
  
  console.log("regiAuction",Auctions)
  return (
    <section className='w-full flexStart flex-col'>
    </section>
  )
}

export default page
