import { Router } from "express";
import { Request, Response } from "express";
import { authmiddleware } from "../middleware/auth";
import { PrismaClient } from '@prisma/client';
import dotenv, { config } from "dotenv"

dotenv.config({path:'./src/.env',debug:true});

const prisma = new PrismaClient();
const auctionRouter: Router = Router();
const JWT_SECRET = process.env.JWT_SECRET

enum types {
    bike = "BIKE",
    car = "CAR"
  }


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
});

auctionRouter.post("/registerAuctions",authmiddleware,async(req:Request,res:Response)=>{
    const {auctionid} = req.body;
    const userId = req.id;

    const checkAuction = await prisma.auctions.findFirst({
        where:{
            id:auctionid
        }
    });

    if (!checkAuction) {
        res.status(411).send({
            err:"auction does not exist"
        })
        return
    };

    if (checkAuction?.endDate&&checkAuction.startDate) {
        const currentDate = new Date();

        if (currentDate>checkAuction.endDate) {
            res.status(411).send({
                err:"auction expired"
            });
            return
        };
    };
    try {
        const userExist = await prisma.auctionRegistration.findFirst({
            where:{
                userId:userId,
                auctionId:auctionid
            }
        });


        if(userExist) {
            res.status(411).send({
                msg:"user alreadu exist"
            });
            return
        };
        const register = await prisma.auctionRegistration.create({
            data:{
                userId:userId,
                auctionId:auctionid
            }
        });
        if (!register) {
            res.status(4111).send({
                msg:"unable to register user"
            })
        }
    } catch (error) {
        res.status(411).send({
            err:"some issues in creating the user",
            details:error
        })
    }
})

auctionRouter.get("/getCars",authmiddleware,async (req:Request,res:Response)=>{
    const userId = req.id;
    if (userId) {
        res.status(411).send({
            msg:"unable to find your userId sorry"
        })
    };

    try {
        const getCars = await prisma.auctions.findMany({
            where:{
                type:types.car
            }
        });

        if (getCars) {
            res.status(200).send({
                msg:getCars
            })
        }
    } catch (error) {
        res.status(411).send({
            err:"unable to get cars",
            details:error
        })
    }
})

auctionRouter.get("/getbikes",authmiddleware,async (req:Request,res:Response)=>{
    const userId = req.id;
    if (userId) {
        res.status(411).send({
            msg:"unable to find your userId sorry"
        })
    };

    try {
        const getBike = await prisma.auctions.findMany({
            where:{
                type:types.bike
            }
        });

        if (getBike) {
            res.status(200).send({
                msg:getBike
            })
        }
    } catch (error) {
        res.status(411).send({
            err:"unable to get bikes",
            details:error
        })
    }
});
