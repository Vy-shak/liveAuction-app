import { auctions,memberData,priceData } from "./ts-types";
import { PrismaClient } from "@prisma/client";

interface roomId {
    roomId:number
}

export class roomManager {
    private auctionStore: Map<number,auctions>;
    private prisma = new PrismaClient();
    private initialPrice:null|number = null

    constructor() {
        this.auctionStore = new Map();
    };

    async checkValidation (auctionId:number,socket:WebSocket) {
        const checkValidation = await this.prisma.auctions.findFirst({
            where:{
                id:auctionId
            }
        });

        if (!checkValidation) {
            let errMsg={type:"error",err:"this room does not exist! please try again later"};
            socket.send(JSON.stringify(errMsg));
            return
        }
        this.initialPrice = Number(checkValidation.price);
    }

    addAuction({userId,socket,fullName,profileUrl,roomId}:memberData&roomId){
        if (!this.auctionStore.has(roomId)) {
            const creator = [{userId,socket,fullName,profileUrl}]
            if (typeof this.initialPrice=="number") {
                this.auctionStore.set(roomId,{members:creator,price:[{price:this.initialPrice,userId}]})
            }
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

