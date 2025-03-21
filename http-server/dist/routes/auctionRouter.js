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
exports.auctionRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const client_1 = require("@prisma/client");
const zod_1 = require("../lib/zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './src/.env', debug: true });
const prisma = new client_1.PrismaClient();
const auctionRouter = (0, express_1.Router)();
exports.auctionRouter = auctionRouter;
const JWT_SECRET = process.env.JWT_SECRET;
var types;
(function (types) {
    types["bike"] = "BIKE";
    types["car"] = "CAR";
})(types || (types = {}));
auctionRouter.get("/render", (req, res) => {
    res.status(200).send({
        msg: "we got you"
    });
});
auctionRouter.post("/createAuction", auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { auctionName, brand, discription, startDate, endDate, price, kmCovered, mileage, model, ownership, photos, type, year } = req.body;
    console.log(startDate, endDate);
    const userId = req.id;
    const zodCheck = zod_1.auctionSchema.safeParse(Object.assign(Object.assign({}, req.body), { ownerId: userId }));
    if (!zodCheck.success) {
        res.status(411).send({
            msg: "Input validation error",
            details: zodCheck.error
        });
        return;
    }
    if (!userId) {
        res.status(411).send({
            msg: "unable to find your userId sorry",
        });
        return;
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
                price: price
            }
        });
        if (createAuction) {
            res.status(200).send({
                msg: 'auction creation success'
            });
            return;
        }
    }
    catch (error) {
        res.status(411).send({
            err: "unable to create the room",
            details: error
        });
        return;
    }
}));
auctionRouter.post("/registerAuctions", auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { auctionId } = req.body;
    const userId = req.id;
    const checkAuction = yield prisma.auctions.findFirst({
        where: {
            id: auctionId
        }
    });
    if (!checkAuction) {
        res.status(411).send({
            err: "auction does not exist"
        });
        return;
    }
    ;
    if ((checkAuction === null || checkAuction === void 0 ? void 0 : checkAuction.endDate) && checkAuction.startDate) {
        const currentDate = new Date();
        if (currentDate > checkAuction.endDate) {
            res.status(411).send({
                err: "auction expired"
            });
            return;
        }
        ;
    }
    ;
    try {
        const userExist = yield prisma.auctionRegistration.findFirst({
            where: {
                userId: userId,
                auctionId: auctionId
            }
        });
        if (userExist) {
            res.status(411).send({
                msg: "user already exist"
            });
            return;
        }
        ;
        const register = yield prisma.auctionRegistration.create({
            data: {
                userId: userId,
                auctionId: auctionId
            }
        });
        if (!register) {
            res.status(4111).send({
                msg: "unable to register user"
            });
        }
        else {
            res.status(200).send({
                msg: "user registered successfully",
            });
        }
    }
    catch (error) {
        res.status(411).send({
            err: "some issues in creating the user",
            details: error
        });
    }
}));
auctionRouter.get("/getAll", auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    if (!userId) {
        res.status(411).send({
            msg: "unable to find your userId sorry"
        });
    }
    ;
    try {
        const currentDate = new Date();
        const getCars = yield prisma.auctions.findMany({
            where: {
                endDate: {
                    gte: currentDate
                }
            }
        });
        if (getCars) {
            res.status(200).send({
                msg: getCars
            });
        }
    }
    catch (error) {
        res.status(411).send({
            err: "unable to get cars",
            details: error
        });
    }
}));
auctionRouter.get("/getCars", auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    if (!userId) {
        res.status(411).send({
            msg: "unable to find your userId sorry"
        });
    }
    ;
    try {
        const currentDate = new Date();
        const getCars = yield prisma.auctions.findMany({
            where: {
                type: types.car,
                endDate: {
                    gte: currentDate
                }
            }
        });
        if (getCars) {
            res.status(200).send({
                msg: getCars
            });
        }
    }
    catch (error) {
        res.status(411).send({
            err: "unable to get cars",
            details: error
        });
    }
}));
auctionRouter.get("/getbikes", auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    if (!userId) {
        res.status(411).send({
            msg: "unable to find your userId sorry"
        });
    }
    ;
    try {
        const currentDate = new Date();
        const getBike = yield prisma.auctions.findMany({
            where: {
                type: types.bike,
                endDate: {
                    gte: currentDate
                }
            }
        });
        if (getBike) {
            res.status(200).send({
                msg: getBike
            });
        }
    }
    catch (error) {
        res.status(411).send({
            err: "unable to get bikes",
            details: error
        });
    }
}));
auctionRouter.get("/getRegistrations", auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    try {
        const registration = yield prisma.auctionRegistration.findMany({
            where: {
                userId: userId
            },
            include: {
                auction: true
            }
        });
        res.status(200).send({
            msg: "registarions",
            details: registration
        });
    }
    catch (error) {
        res.status(411).send({
            msg: "could not find your registrations",
        });
        return;
    }
}));
auctionRouter.get("/getMyauctions", auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    try {
        const myAuctions = yield prisma.auctions.findMany({
            where: {
                ownerId: userId
            }
        });
        res.status(200).send({
            msg: "your auctions",
            details: myAuctions
        });
    }
    catch (error) {
        res.status(411).send({
            msg: "could not find your registrations",
        });
        return;
    }
}));
auctionRouter.post("/checkRegistration", auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    const { auctionId } = req.body;
    try {
        const myAuctions = yield prisma.auctionRegistration.findFirst({
            where: {
                userId: userId,
                auctionId: auctionId
            },
            include: {
                auction: true
            }
        });
        res.status(200).send({
            msg: "your auctions",
            details: myAuctions
        });
    }
    catch (error) {
        res.status(411).send({
            msg: "could not find your registrations",
        });
        return;
    }
}));
