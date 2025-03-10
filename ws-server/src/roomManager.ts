import { auctions,memberData,priceData } from "./ts-types";
import WebSocket from "ws";
import { PrismaClient } from "@prisma/client";

interface addAuction {
    userId: number,
    socket: WebSocket,
    auctionId: number,
    fullname: string,
    profileUrl: string,
    price: string
}

interface updatePrice {
    userId:number,
    socket:WebSocket,
    price:number,
    fullname:string,
    profileUrl:string,
    auctionId:number
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
        const {fullname} = checkRegistration.user;
        const profileUrl = "dummy url";
        const {price} = checkRegistration.auction;
        return {auctionId,fullname,profileUrl,price,userId}
    };



    addAuction({userId,socket,fullname,profileUrl,auctionId,price}:addAuction){
        const priceInt = Number(price)
        if (!this.auctionStore.has(auctionId)) {
            const creator = [{userId,socket,fullname,profileUrl}]
            this.auctionStore.set(auctionId,{members:creator,price:[{price:priceInt,userId}]})
        }
        else {
            const existingAuction = this.auctionStore.get(auctionId);
            const newMember = {userId,socket,fullname,profileUrl}
            if (!existingAuction?.members) {
                return
            };
            const updatedMembers = [...existingAuction?.members,newMember];
            this.auctionStore.set(auctionId,{members:updatedMembers,price:existingAuction.price})
        };
        // console.log(this.auctionStore)
        // console.log(this.auctionStore.get(auctionId)?.members)
        // console.log(this.auctionStore.get(auctionId)?.price)
    }

    updatePrice ({price,userId,socket,profileUrl,auctionId,fullname}:updatePrice){
        const existingPrices = this.auctionStore.get(auctionId)?.price;
        const existingMembers = this.auctionStore.get(auctionId)?.members;
        const n = existingPrices?.length;
        if (!n) {
            return
        }

        if (n&&n<1) {
            return
        }

        if(existingPrices&&price<=existingPrices[n-1].price) {
            return
        }

        if (!existingMembers) {
            return
        }

        const newPrice = [...existingPrices,{price:price,userId:userId}];
        this.auctionStore.set(auctionId,{members:existingMembers,price:newPrice});

        const updatedPrice = this.auctionStore.get(auctionId)?.price[n-1];

        socket.send(JSON.stringify(updatedPrice))
    }
}

