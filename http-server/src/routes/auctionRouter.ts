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
    const {auctionName,brand,discription,endDate,kmCovered,mileage,model,ownership,photos,startDate,type,year} = req.body;
    const userId = req.id;

    if (userId) {
        res.status(411).send({
            msg:"unable to find your userId sorry"
        })
    };

    try {

    } catch (error) {
        
    }
})