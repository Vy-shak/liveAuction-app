"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = authCheck;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authCheck(token) {
    if (token && typeof token === 'string') {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (JWT_SECRET) {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            console.log('decoded', decoded);
            if (decoded) {
                return decoded.id;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
}
;
