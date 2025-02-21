import {create} from "zustand";

type store ={
    count:number,
    updateCount:()=>void
}

const useCount = create<store>()((set)=>({
    count:1,
    updateCount:()=>set((state)=>({count:state.count+1}))
}))

export default useCount