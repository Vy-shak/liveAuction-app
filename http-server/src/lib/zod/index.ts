import { z } from 'zod';

const signupSchema = z.object({
    email: z.string().email(),
    fullname: z.string(),
    password: z.string()
});


const signinSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const auctionSchema = z.object({
    type: z.string(),
    price:z.string(),
    brand: z.string(),
    ownerId: z.number(),
    auctionName: z.string(),
    model: z.string(),
    year: z.string(),
    kmCovered: z.string(),
    mileage: z.string(),
    ownership: z.string(),
    discription: z.string(),
    photos: z.array(z.string()),
    startDate: z.string(),
    endDate: z.string()
})


export { signinSchema, signupSchema,auctionSchema }