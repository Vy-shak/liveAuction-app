import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import dotenv from "dotenv"
dotenv.config()

function authmiddleware(req: Request, res: Response, next: NextFunction) {
    const authtoken = req.headers["authtoken"];
    console.log('the token', authtoken)
    console.log(typeof authtoken)
    const  JWT_SECRET = process.env.JWT_SECRET
    if (authtoken && typeof authtoken === 'string') {

        if (JWT_SECRET) {
            const decoded = jwt.verify(authtoken, JWT_SECRET) as JwtPayload
            console.log('decoded', decoded)
            if (decoded) {
                req.id = decoded.id;
                next()
            };
        }
        else {
            res.status(401).send({
                msg: "sorry some internal error",

            });
            return
        }

    }
    else if (!authtoken) {
        res.status(401).send({
            err: "your token is not valid"

        });
        return
    }

};

export { authmiddleware }

