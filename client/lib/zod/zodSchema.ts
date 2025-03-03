import {string, z} from "zod"

enum types {
    bike = "BIKE",
    car = "CAR"
}


const vehicleSchema1 = z.object({
    type:z.nativeEnum(types),
    auctionName:z.string().min(4),
});


const vehicleSchema2 = z.object({
    brand:z.string().min(2),
    model:z.string().min(1),
    year:z.coerce.number().min(1600),
    kmCovered:z.coerce.number().min(5),
    mileage:z.coerce.number().min(0),
    ownership:z.coerce.number().min(1),
    discription:z.string().min(5),
});

const vehicleSchema3 = z.object({
    photos:z.array(z.string()),
    startDate:z.string(),
    endDate:z.string(),
    price:z.coerce.number()
})



export{vehicleSchema1,vehicleSchema2,vehicleSchema3}