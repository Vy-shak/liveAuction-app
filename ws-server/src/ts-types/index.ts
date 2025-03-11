import { WebSocket } from "ws"
interface Priceupdation {
    userId:number,
    auctionId:number,
    price:number,
}

interface memberData {
    userId:number,
    fullname:string,
    profileUrl:string,
    socket:WebSocket,
}

interface priceData {
    price:number,
    userId:number,
    fullname:string,
    profileUrl:string,
}

interface auctions {
    members:memberData[],
    price:priceData[]
}



export {Priceupdation,memberData,auctions,priceData}