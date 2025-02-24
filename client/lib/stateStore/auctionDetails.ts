import {create} from "zustand";


enum types {
    bike = "BIKE",
    car = "CAR"
}

type auctionData ={
    type:types
    brand:string,
    model:string,
    // year:number,
    // kmCovered:number,
    // mileage:number,
    // owner:number,
    discription:string
}

const initialVal: auctionData = {
    type:types.car,
    brand:"",
    model:"",
    // year:0,
    // kmCovered:0,
    // mileage:0,
    // owner:0,
    discription:""
  };

  interface SetterProp {
    type: keyof auctionData |types
    val: string|types
  }

  interface Store {
    userData: auctionData;
    updateUserData: (data: SetterProp) => void;
  }

  const useAuctiondata = create<Store>((set) => ({
    userData: initialVal,
    updateUserData: ({ type, val }) =>
      set((state) => {
        const updatedUser = {...state.userData};
        updatedUser[type] = val
        return { userData: updatedUser}
      }),
  }));


export default auctionData