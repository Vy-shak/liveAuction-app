import express from "express"
import { userRouter } from "./routes/userRouter"
import { auctionRouter } from "./routes/auctionRouter";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/auctions', auctionRouter)


app.listen(process.env.PORT||3001,()=>{
    console.log("server is listening on port"+process.env.PORT)
})