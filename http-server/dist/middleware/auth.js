"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authmiddleware = authmiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authmiddleware(req, res, next) {
    const authtoken = req.headers["authtoken"];
    console.log('the token', authtoken);
    console.log(typeof authtoken);
    const JWT_SECRET = process.env.JWT_SECRET;
    if (authtoken && typeof authtoken === 'string') {
        if (JWT_SECRET) {
            const decoded = jsonwebtoken_1.default.verify(authtoken, JWT_SECRET);
            console.log('decoded', decoded);
            if (decoded) {
                req.id = decoded.id;
                next();
            }
            ;
        }
        else {
            res.status(401).send({
                msg: "sorry some internal error",
            });
            return;
        }
    }
    else if (!authtoken) {
        res.status(401).send({
            err: "your token is not valid"
        });
        return;
    }
}
;
