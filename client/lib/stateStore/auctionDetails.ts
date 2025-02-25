import {create} from "zustand";


enum types {
    bike = "BIKE",
    car = "CAR"
}

type auctionData ={
    type:types
    auctionName:string,
    brand:string,
    model:string,
    year:number,
    kmCovered:number,
    mileage:number,
    owner:number,
    discription:string
}

const initialVal: auctionData = {
    type:types.car,
    auctionName:"",
    brand:"",
    model:"",
    year:0,
    kmCovered:0,
    mileage:0,
    owner:0,
    discription:""
  };

  interface SetterProp {
    type: keyof auctionData
    val: auctionData[keyof auctionData]
  }

  interface Store {
    auctionData: auctionData;
    updateAuctiondata: (data: SetterProp) => void;
  }

  const useAuctiondata = create<Store>((set) => ({
    auctionData: initialVal,
    updateAuctiondata: ({ type, val }) =>
      set((state) => {
        const updatedUser = {...state.auctionData};
        (updatedUser[type] as any) = val
        return { auctionData: updatedUser}
      }),
  }));


export default useAuctiondata