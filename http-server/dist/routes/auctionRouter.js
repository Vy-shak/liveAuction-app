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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './src/.env', debug: true });
const prisma = new client_1.PrismaClient();
const auctionRouter = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET;
auctionRouter.post("/createAuction", auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { auctionName, brand, discription, price, endDate, kmCovered, mileage, model, ownership, photos, startDate, type, year } = req.body;
    const userId = req.id;
    if (userId) {
        res.status(411).send({
            msg: "unable to find your userId sorry"
        });
    }
    ;
    try {
        const createAuction = yield prisma.auctions.create({
            data: {
                type: type,
                auctionName: auctionName,
                brand: brand,
                discription: discription,
                endDate: endDate,
                startDate: startDate,
                kmCovered: kmCovered,
                mileage: mileage,
                model: model,
                ownership: ownership,
                photos: photos,
                year: year,
                ownerId: userId,
                registerdUsers: [],
                price: price
            }
        });
        if (createAuction) {
            res.status(200).send({
                msg: 'auction creation success'
            });
        }
    }
    catch (error) {
        res.status(411).send({
            err: "unable to create the room",
            details: error
        });
    }
}));
