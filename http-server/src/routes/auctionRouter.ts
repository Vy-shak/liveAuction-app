import { Router } from "express";
import { Request, Response } from "express";
import { authmiddleware } from "../middleware/auth";
import { PrismaClient } from '@prisma/client';
import { auctionSchema } from "../lib/zod";
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
    const {auctionName,brand,discription, startDate, endDate, price,kmCovered,mileage,model,ownership,photos,type,year} = req.body;
    console.log(startDate,endDate)
    const userId = req.id;
    
    const zodCheck = auctionSchema.safeParse({...req.body,ownerId:userId});

    if (!zodCheck.success) {
        res.status(411).send({
            msg:"Input validation error",
            details:zodCheck.error
        });

        return
    }


    
    if (!userId) {
        res.status(411).send({
            msg:"unable to find your userId sorry",
        });
        return
    };

    try {
        const createAuction = await prisma.auctions.create({
            data:{
                type:type,
                auctionName:auctionName,
                brand:brand,
                discription:discription,
                endDate:endDate ,
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
            });
            return
        }
    } catch (error) {
        res.status(411).send({
            err:"unable to create the room",
            details:error
        });
        return
    }
});

auctionRouter.post("/registerAuctions",authmiddleware,async(req:Request,res:Response)=>{
    const {auctionId} = req.body;
    const userId = req.id;

    const checkAuction = await prisma.auctions.findFirst({
        where:{
            id:auctionId
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
                auctionId:auctionId
            }
        });


        if(userExist) {
            res.status(411).send({
                msg:"user already exist"
            });
            return
        };

        const register = await prisma.auctionRegistration.create({
            data:{
                userId:userId,
                auctionId:auctionId
            }
        });

        if (!register) {
            res.status(4111).send({
                msg:"unable to register user"
            })
        }
        else {
            res.status(200).send({
                msg:"user registered successfully",
            })
        }
    } catch (error) {
        res.status(411).send({
            err:"some issues in creating the user",
            details:error
        })
    }
});

auctionRouter.get("/getAll",authmiddleware,async (req:Request,res:Response)=>{
    const userId = req.id;
    if (!userId) {
        res.status(411).send({
            msg:"unable to find your userId sorry"
        })
    };

    try {
        const currentDate = new Date()
        const getCars = await prisma.auctions.findMany({
            where:{
                endDate:{
                    gte:currentDate
                }
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

auctionRouter.get("/getCars",authmiddleware,async (req:Request,res:Response)=>{
    const userId = req.id;
    if (!userId) {
        res.status(411).send({
            msg:"unable to find your userId sorry"
        })
    };

    try {
        const currentDate = new Date();
        const getCars = await prisma.auctions.findMany({
            where:{
                type:types.car,
                endDate:{
                    gte:currentDate
                }
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
    if (!userId) {
        res.status(411).send({
            msg:"unable to find your userId sorry"
        })
    };

    try {
        const currentDate = new Date();
        const getBike = await prisma.auctions.findMany({
            where:{
                type:types.bike,
                endDate:{
                    gte:currentDate
                }
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


auctionRouter.get("/getRegistrations",authmiddleware,async (req:Request,res:Response)=>{
    const userId = req.id;

    try {
        const registration = await prisma.auctionRegistration.findMany({
            where:{
                userId:userId
            },
            include:{
                auction:true
            }
        });

        res.status(200).send({
            msg:"registarions",
            details:registration
        });

    } catch (error) {
        res.status(411).send({
            msg:"could not find your registrations",
        });
        return
    }

})

auctionRouter.get("/getMyauctions",authmiddleware,async (req:Request,res:Response)=>{
    const userId = req.id;

    try {
        const myAuctions = await prisma.auctions.findMany({
            where:{
                ownerId:userId
            }
        });

        res.status(200).send({
            msg:"your auctions",
            details:myAuctions
        })
    } catch (error) {
        res.status(411).send({
            msg:"could not find your registrations",
        });
        return
    }

});

auctionRouter.post("/checkRegistration",authmiddleware,async (req:Request,res:Response)=>{
    const userId = req.id;
    const {auctionId} = req.body
    try {
        const myAuctions = await prisma.auctionRegistration.findFirst({
            where:{
                userId:userId,
                auctionId:auctionId
            },
            include:{
                auction:true
            }
        });

        res.status(200).send({
            msg:"your auctions",
            details:myAuctions
        });

    } catch (error) {
        res.status(411).send({
            msg:"could not find your registrations",
        });
        return
    }

});


export {auctionRouter}
