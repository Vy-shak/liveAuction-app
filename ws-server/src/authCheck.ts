import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken";

function authCheck(token: string) {

    if (token && typeof token === 'string') {
        const JWT_SECRET = process.env.JWT_SECRET
        if (JWT_SECRET) {
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
            console.log('decoded', decoded)
            if (decoded) {
                return decoded.id
            }
            else {
                return null
            }
        }
        else {
            return null
        }

    }
};

export { authCheck }