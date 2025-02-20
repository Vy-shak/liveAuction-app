import { Express } from "express"
import { Request,Response } from "express"


const express = require('express')
const app = express()

app.get('/', function (req:Request, res:Response) {
  res.send('Hello World')
})

app.listen(3000)