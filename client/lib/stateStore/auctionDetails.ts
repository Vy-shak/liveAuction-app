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
    ownership:number,
    discription:string,
    photos:string[],
    startDate:Date
    endDate:Date,
    price:number
};


const initialVal: auctionData = {
    type:types.car,
    auctionName:"",
    brand:"",
    model:"",
    year:0,
    kmCovered:0,
    mileage:0,
    ownership:0,
    discription:"",
    photos:[],
    startDate:new Date(),
    endDate:new Date(),
    price:0
  };

  interface SetterProp {
    type: keyof auctionData
    val: auctionData[keyof auctionData]
  }

  interface Store {
    auctionData: auctionData;
    updateAuctiondata: (data: SetterProp) => void;
  }

  const UseAuctiondata = create<Store>((set) => ({
    auctionData: initialVal,
    updateAuctiondata: ({ type, val }) =>
      set((state) => {
        const updatedUser = {...state.auctionData};
        (updatedUser[type] as any) = val
        return { auctionData: updatedUser}
      }),
  }));


export default UseAuctiondata