"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("../lib/zod");
dotenv_1.default.config({ path: './src/.env', debug: true });
const JWT_SECRET = process.env.JWT_SECRET;
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
const prisma = new client_1.PrismaClient();
console.log(process.env.DEFAULT_AVATAR);
userRouter.post('/signup', (req, res) => {
    const { fullname, email, password, profileUrl } = req.body;
    const parsedData = zod_1.signupSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "your credential is not valid"
        });
        return;
    }
    try {
        (function signupUser() {
            return __awaiter(this, void 0, void 0, function* () {
                const hashedPass = yield bcrypt_1.default.hash(password, 5);
                console.log(hashedPass);
                const duplicate = yield prisma.user.findFirst({
                    where: {
                        email: email
                    }
                });
                if (duplicate) {
                    res.status(411).send({
                        msg: "this email already exist"
                    });
                    return;
                }
                const user = yield prisma.user.create({
                    data: {
                        email: email,
                        fullname: fullname,
                        imgUrl: profileUrl || process.env.DEFAULT_AVATAR,
                        password: hashedPass
                    }
                });
                res.status(200).send({
                    msg: "signup done"
                });
            });
        })();
    }
    catch (error) {
        res.send({
            err: "some error updating data to db"
        });
    }
});
userRouter.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const parsedData = zod_1.signinSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.status(411).json({
            message: "your credential is not valid"
        });
        return;
    }
    try {
        (function signinUser() {
            return __awaiter(this, void 0, void 0, function* () {
                const user = yield prisma.user.findFirst({
                    where: {
                        email
                    }
                });
                if (user) {
                    const hashedpass = yield bcrypt_1.default.compare(password, user.password);
                    if (hashedpass && JWT_SECRET) {
                        const token = yield jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET);
                        res.status(200).send({
                            msg: "your jwt token generated successfully",
                            token: token
                        });
                    }
                    else if (!hashedpass) {
                        res.status(411).send({
                            msg: "your password is incorrect"
                        });
                        return;
                    }
                }
                else {
                    res.status(411).send({
                        msg: "sorry no account exist on this email",
                    });
                }
            });
        })();
    }
    catch (error) {
        res.status(401).send({
            err: "some error updating data to db"
        });
        return;
    }
});
userRouter.get('/getData', auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    try {
        console.log("getdata comming", id);
        const userData = yield prisma.user.findFirst({
            where: {
                id: id
            }
        });
        if (userData) {
            res.status(200).send(userData);
        }
    }
    catch (error) {
        res.status(411).send({
            err: "can not get the userdata",
            details: error
        });
    }
}));
userRouter.post('/updateInfo', auth_1.authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const { url, bio } = req.body;
    console.log(id);
    try {
        if (!url) {
            res.send({
                err: "the image url is not valid",
            });
            return;
        }
        ;
        const userData = yield prisma.user.update({
            where: {
                id: id
            },
            data: {
                imgUrl: url,
                bio: bio
            }
        });
        if (!userData) {
            res.send({
                err: "your userData is missing please login",
            });
            return;
        }
        res.send({
            msg: "the data updated successfully",
            details: userData
        });
    }
    catch (error) {
        res.status(411).send({
            err: "can not get the userdata",
            details: error
        });
    }
}));
