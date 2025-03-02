"use client"

import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'



function UsefetchAuctions(category:string) {
    const [Auctions,setAuctions] = useState<any[]>();

    useEffect(()=>{
        (async function fetchAuction() {
            const url = process.env.NEXT_PUBLIC_HTTP_URL;
            const token = localStorage.getItem("token")
            if(!url){
                console.log("url not present at auction");
                return
            }
            const {data} = await axios.get(`${url}${category}`,{headers:{
                "Content-Type":"application/json",
                "authToken":token
            }});

            if (data) {
                setAuctions(data.msg)
            }

        })()
    },[]);

    return {Auctions,setAuctions}
}

export {UsefetchAuctions}
