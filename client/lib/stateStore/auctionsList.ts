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
    year: string;
    kmCovered: string;
    mileage: string;
    ownership: string;
    discription: string;
    photos: string[];
    startDate: string;
    endDate: string;
    price: string;
};

interface Store {
    selectedAuction: AuctionData|null;
    updateSelection: (data: AuctionData) => void; 
}

const UseSelectedAuction = create<Store>((set) => ({
    selectedAuction: null,
    updateSelection: (data) =>
        set({ selectedAuction: data }), 
}));

export {UseSelectedAuction}
