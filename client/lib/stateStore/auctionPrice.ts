import { create } from "zustand";

type Pricestore = {
    priceData: {
    price: number;
    fullName: string;
    profileUrl: string;
    userId: string;
  };
  updatePrice: (updates: Partial<Pricestore["priceData"]>) => void;
};

const auctionPrice = create<Pricestore>((set) => ({
  priceData: {
    price: 0,
    fullName: "",
    profileUrl: "",
    userId: "",
  },
  updatePrice: (updates) =>
    set((state) => ({
      priceData: { ...state.priceData, ...updates },
    })),
}));

export default auctionPrice;