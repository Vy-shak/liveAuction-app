"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctionSchema = exports.signupSchema = exports.signinSchema = void 0;
const zod_1 = require("zod");
const signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    fullname: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.signupSchema = signupSchema;
const signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.signinSchema = signinSchema;
const auctionSchema = zod_1.z.object({
    type: zod_1.z.string(),
    price: zod_1.z.string(),
    brand: zod_1.z.string(),
    ownerId: zod_1.z.number(),
    auctionName: zod_1.z.string(),
    model: zod_1.z.string(),
    year: zod_1.z.string(),
    kmCovered: zod_1.z.string(),
    mileage: zod_1.z.string(),
    ownership: zod_1.z.string(),
    discription: zod_1.z.string(),
    photos: zod_1.z.array(zod_1.z.string()),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string()
});
exports.auctionSchema = auctionSchema;
