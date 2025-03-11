import { number } from "zod";
import {create} from "zustand";



type store ={
    price:number,
    updatePrice:(val:number)=>void
}



const usePrice = create<store>()((set)=>({
    price:0,
    updatePrice:(val)=>set((state)=>({price:val}))
}))

export default usePrice