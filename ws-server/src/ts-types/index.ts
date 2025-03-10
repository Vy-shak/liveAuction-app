import { WebSocket } from "ws"
interface Priceupdation {
    userId:number,
    roomId:number,
    price:number,
}

interface memberData {
    userId:number,
    fullName:string,
    profileUrl:string,
    socket:WebSocket,
}

interface priceData {
    price:number,
    userId:number,
}

interface auctions {
    members:memberData[],
    price:priceData[]
}



export {Priceupdation,memberData,auctions,priceData}