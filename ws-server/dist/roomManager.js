"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomManager = void 0;
const client_1 = require("@prisma/client");
class roomManager {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.auctionStore = new Map();
    }
    ;
    checkValidation(auctionId, userId, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!auctionId) {
                const errMsg = { type: 'error', err: "auctionId is missing" };
                socket.send(JSON.stringify(errMsg));
                socket.close();
                return;
            }
            if (!userId) {
                const errMsg = { type: 'error', err: "userId is missing" };
                socket.send(JSON.stringify(errMsg));
                socket.close();
                return;
            }
            const checkRegistration = yield this.prisma.auctionRegistration.findFirst({
                where: {
                    userId: userId,
                    auctionId: auctionId
                },
                include: {
                    user: true,
                    auction: true
                }
            });
            if (!checkRegistration) {
                let errMsg = { type: "error", err: "this room does not exist! please try again later" };
                socket.send(JSON.stringify(errMsg));
                return;
            }
            const { fullname, imgUrl } = checkRegistration.user;
            const profileUrl = imgUrl;
            const { price } = checkRegistration.auction;
            return { auctionId, fullname, profileUrl, price, userId };
        });
    }
    ;
    addAuction({ userId, socket, fullname, profileUrl, auctionId, price }) {
        var _a, _b, _c, _d;
        const priceInt = Number(price);
        if (!this.auctionStore.has(auctionId)) {
            const creator = [{ userId, socket, fullname, profileUrl }];
            this.auctionStore.set(auctionId, { members: creator, price: [{ price: priceInt, userId, fullname, profileUrl }] });
            const membersData = { type: "member", members: (_a = this.auctionStore.get(auctionId)) === null || _a === void 0 ? void 0 : _a.members };
            const priceData = { type: "price", priceList: (_b = this.auctionStore.get(auctionId)) === null || _b === void 0 ? void 0 : _b.price };
            const strMembers = JSON.stringify(membersData);
            const strPrices = JSON.stringify(priceData);
            socket.send(strMembers);
            socket.send(strPrices);
        }
        else {
            let existingAuction = this.auctionStore.get(auctionId);
            const newMember = { userId, socket, fullname, profileUrl };
            if (!(existingAuction === null || existingAuction === void 0 ? void 0 : existingAuction.members)) {
                return;
            }
            ;
            const filterExisting = existingAuction === null || existingAuction === void 0 ? void 0 : existingAuction.members.filter((item) => item.userId !== userId);
            const updatedMembers = [...filterExisting, newMember];
            this.auctionStore.set(auctionId, { members: updatedMembers, price: existingAuction.price });
            const membersData = { type: "member", members: (_c = this.auctionStore.get(auctionId)) === null || _c === void 0 ? void 0 : _c.members };
            const priceData = { type: "price", priceList: (_d = this.auctionStore.get(auctionId)) === null || _d === void 0 ? void 0 : _d.price };
            const strMembers = JSON.stringify(membersData);
            const strPrices = JSON.stringify(priceData);
            socket.send(strMembers);
            socket.send(strPrices);
        }
        ;
        // console.log(this.auctionStore)
        // console.log(this.auctionStore.get(auctionId)?.members)
        // console.log(this.auctionStore.get(auctionId)?.price)
    }
    updatePrice({ price, userId, socket, profileUrl, auctionId, fullname }) {
        var _a, _b, _c;
        const existingPrices = (_a = this.auctionStore.get(auctionId)) === null || _a === void 0 ? void 0 : _a.price;
        const existingMembers = (_b = this.auctionStore.get(auctionId)) === null || _b === void 0 ? void 0 : _b.members;
        const n = existingPrices === null || existingPrices === void 0 ? void 0 : existingPrices.length;
        if (!n) {
            let errMsg = { type: "error", err: "internal error on price" };
            socket.send(JSON.stringify(errMsg));
            return;
        }
        if (n && n < 1) {
            let errMsg = { type: "error", err: "internal error on price2" };
            socket.send(JSON.stringify(errMsg));
            return;
        }
        if (existingPrices && price <= existingPrices[n - 1].price) {
            console.log(existingPrices[n - 1].price, price);
            let errMsg = { type: "error", err: "the bidding price is smaller than the current one" };
            socket.send(JSON.stringify(errMsg));
            return;
        }
        if (!existingMembers) {
            return;
        }
        const newPrice = [...existingPrices, { price: price, fullname: fullname, profileUrl: profileUrl, userId: userId }];
        this.auctionStore.set(auctionId, { members: existingMembers, price: newPrice });
        const priceList = (_c = this.auctionStore.get(auctionId)) === null || _c === void 0 ? void 0 : _c.price;
        const priceData = { type: 'price', priceList: priceList };
        socket.send(JSON.stringify(priceData));
    }
}
exports.roomManager = roomManager;
