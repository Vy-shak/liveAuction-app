"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.signinSchema = void 0;
const zod_1 = require("zod");
const signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    fullname: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.signupSchema = signupSchema;
const signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.signinSchema = signinSchema;
