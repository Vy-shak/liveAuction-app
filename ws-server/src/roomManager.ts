import { auctions,memberData,priceData } from "./ts-types";
import WebSocket from "ws";
import { PrismaClient } from "@prisma/client";

interface roomId {
    roomId:number,
    price:number
}

export class roomManager {
    private auctionStore: Map<number,auctions>;
    private prisma = new PrismaClient();

    constructor() {
        this.auctionStore = new Map();
    };

    async checkValidation (auctionId:number, userId:number,socket:WebSocket) {

        const checkRegistration = await this.prisma.auctionRegistration.findFirst({
            where:{
                userId:userId,
                auctionId:auctionId
            },
            include:{
                user:true,
                auction:true
            }
        });

        if (!checkRegistration) {
            let errMsg={type:"error",err:"this room does not exist! please try again later"};
            socket.send(JSON.stringify(errMsg));
            return
        }

        return checkRegistration
    };



    addAuction({userId,socket,fullName,profileUrl,roomId,price}:memberData&roomId){
        if (!this.auctionStore.has(roomId)) {
            const creator = [{userId,socket,fullName,profileUrl}]
            this.auctionStore.set(roomId,{members:creator,price:[{price:price,userId}]})
        }
        else {
            const existingAuction = this.auctionStore.get(roomId);
            const newMember = {userId,socket,fullName,profileUrl}
            if (!existingAuction?.members) {
                return
            };
            const updatedMembers = [...existingAuction?.members,newMember];
            this.auctionStore.set(roomId,{members:updatedMembers,price:existingAuction.price})
        }
    }
}

