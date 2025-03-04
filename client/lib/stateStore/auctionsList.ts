import { create } from "zustand";

enum types {
    bike = "BIKE",
    car = "CAR"
}

type AuctionData = {
    type: types;
    auctionName: string;
    brand: string;
    model: string;
    year: number;
    kmCovered: number;
    mileage: number;
    ownership: number;
    description: string;
    photos: string[];
    startDate: Date;
    endDate: Date;
    price: number;
};

interface Store {
    auctionList: AuctionData[];
    updateAuctionList: (data: AuctionData[]) => void; 
}

const useAuctionlist = create<Store>((set) => ({
    auctionList: [],
    updateAuctionList: (data) =>
        set({ auctionList: data }), 
}));

export {useAuctionlist}
