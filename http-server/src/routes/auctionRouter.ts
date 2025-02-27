import { Router } from "express";
import { Request, Response } from "express";
import { authmiddleware } from "../middleware/auth";
import { PrismaClient } from '@prisma/client';
import dotenv, { config } from "dotenv"

dotenv.config({path:'./src/.env',debug:true});

const prisma = new PrismaClient();
const auctionRouter: Router = Router();
const JWT_SECRET = process.env.JWT_SECRET



auctionRouter.post("/createAuction",authmiddleware,async (req:Request,res:Response)=>{
    const {auctionName,brand,discription, price,endDate,kmCovered,mileage,model,ownership,photos,startDate,type,year} = req.body;
    const userId = req.id;

    if (userId) {
        res.status(411).send({
            msg:"unable to find your userId sorry"
        })
    };

    try {
        const createAuction = await prisma.auctions.create({
            data:{
                type:type,
                auctionName:auctionName,
                brand:brand,
                discription:discription,
                endDate:endDate,
                startDate:startDate,
                kmCovered:kmCovered,
                mileage:mileage,
                model:model,
                ownership:ownership,
                photos:photos,
                year:year,
                ownerId:userId,
                registerdUsers:[],
                price:price
            }
        });

        if (createAuction) {
            res.status(200).send({
                msg:'auction creation success'    
            })
        }
    } catch (error) {
        res.status(411).send({
            err:"unable to create the room",
            details:error
        })
    }
})