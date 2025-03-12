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
        if (!auctionId) {
            socket.send("auctionId missing")
            return
        }
        if (!userId) {
            socket.send(" Userid missing")
            return
        }
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
        const {fullname,imgUrl} = checkRegistration.user;
        const profileUrl = imgUrl;
        const {price} = checkRegistration.auction;
        return {auctionId,fullname,profileUrl,price,userId}
    };



    addAuction({userId,socket,fullname,profileUrl,auctionId,price}:addAuction){
        const priceInt = Number(price)
        if (!this.auctionStore.has(auctionId)) {
            const creator = [{userId,socket,fullname,profileUrl}]
            this.auctionStore.set(auctionId,{members:creator,price:[{price:priceInt,userId,fullname,profileUrl}]})
            
            const allData = {type:"member",members:this.auctionStore.get(auctionId)?.members}
            const stringfyAll = JSON.stringify(allData)
            socket.send(stringfyAll)
        }
        else {
            let existingAuction = this.auctionStore.get(auctionId);
            const newMember = {userId,socket,fullname,profileUrl}
            if (!existingAuction?.members) {
                return
            };
            const filterExisting = existingAuction?.members.filter((item)=>item.userId!==userId)
            const updatedMembers = [...filterExisting,newMember];
            this.auctionStore.set(auctionId,{members:updatedMembers,price:existingAuction.price});

            const allData = {type:"member",members:this.auctionStore.get(auctionId)?.members}
            const stringfyAll = JSON.stringify(allData)
            socket.send(stringfyAll)
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
            let errMsg={type:"error",err:"internal error on price"};
            socket.send(JSON.stringify(errMsg));
            return
        }

        if (n&&n<1) {
            let errMsg={type:"error",err:"internal error on price2"};
            socket.send(JSON.stringify(errMsg));
            return
        }

        if(existingPrices&&price<=existingPrices[n-1].price) {
            console.log(existingPrices[n-1].price)
            let errMsg={type:"error",err:"the bidding price is smaller than the current one"};
            socket.send(JSON.stringify(errMsg));
            return
        }

        if (!existingMembers) {
            return
        }

        const newPrice = [...existingPrices,{price:price, fullname:fullname, profileUrl: profileUrl, userId:userId}];
        this.auctionStore.set(auctionId,{members:existingMembers,price:newPrice});

        const priceList = this.auctionStore.get(auctionId)?.price;
        const priceData = {type:'price',priceList:priceList}
        socket.send(JSON.stringify(priceData))
    }
}

