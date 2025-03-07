import { ChevronLeftCircle,ChevronRightCircle } from "lucide-react";
import React from 'react'

interface cheveron {
  type:"left"|"right"
}



function CheveronLeftBox({type}:cheveron) {
  return (
    <div className="w-fit cursor-pointer bg-white h-fit px-2 py-4 rounded">
      {type==="left"&&<ChevronLeftCircle/>}
      {type==="right"&&<ChevronRightCircle/>}
    </div>
  )
}

export default CheveronLeftBox



