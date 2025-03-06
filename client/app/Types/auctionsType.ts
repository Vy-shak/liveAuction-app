export enum types {
    bike = "BIKE",
    car = "CAR"
}


export type auctionData ={
    id:number
    type:types
    auctionName:string,
    brand:string,
    model:string,
    year:string,
    kmCovered:string,
    mileage:string,
    ownership:string,
    discription:string,
    photos:string[],
    startDate:Date
    endDate:Date,
    price:number
};
