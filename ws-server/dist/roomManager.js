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
            const { fullname } = checkRegistration.user;
            const profileUrl = "dummy url";
            const { price } = checkRegistration.auction;
            return { auctionId, fullname, profileUrl, price, userId };
        });
    }
    ;
    addAuction({ userId, socket, fullname, profileUrl, auctionId, price }) {
        var _a, _b;
        const priceInt = Number(price);
        if (!this.auctionStore.has(auctionId)) {
            const creator = [{ userId, socket, fullname, profileUrl }];
            this.auctionStore.set(auctionId, { members: creator, price: [{ price: priceInt, userId }] });
        }
        else {
            const existingAuction = this.auctionStore.get(auctionId);
            const newMember = { userId, socket, fullname, profileUrl };
            if (!(existingAuction === null || existingAuction === void 0 ? void 0 : existingAuction.members)) {
                return;
            }
            ;
            const updatedMembers = [...existingAuction === null || existingAuction === void 0 ? void 0 : existingAuction.members, newMember];
            this.auctionStore.set(auctionId, { members: updatedMembers, price: existingAuction.price });
        }
        ;
        console.log(this.auctionStore);
        console.log((_a = this.auctionStore.get(auctionId)) === null || _a === void 0 ? void 0 : _a.members);
        console.log((_b = this.auctionStore.get(auctionId)) === null || _b === void 0 ? void 0 : _b.price);
    }
}
exports.roomManager = roomManager;
