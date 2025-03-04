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
    description: string;
    photos: string[];
    startDate: Date;
    endDate: Date;
    price: number;
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
