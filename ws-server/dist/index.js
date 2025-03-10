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
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const roomManager_1 = require("./roomManager");
const authCheck_1 = require("./authCheck");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const auctionManager = new roomManager_1.roomManager();
wss.on('connection', function connection(socket, req) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.on('error', console.error);
        if (!req.url) {
            return;
        }
        const urlParams = new URLSearchParams(req.url.split('?')[1]);
        const token = urlParams.get('token');
        let auctioncode = urlParams.get('auctionCode');
        const auctionId = Number(auctioncode);
        if (!token) {
            const errMsg = { type: 'error', err: "the jwt token not present" };
            socket.send(JSON.stringify(errMsg));
            return;
        }
        if (!auctioncode) {
            const errMsg = { type: 'error', err: "the auction Code is not presnt" };
            socket.send(JSON.stringify(errMsg));
            return;
        }
        const userId = yield (0, authCheck_1.authCheck)(token);
        if (!userId) {
            const errMsg = { type: 'error', err: "can not get the userId" };
            socket.send(JSON.stringify(errMsg));
            return;
        }
        const fullAuctionDetails = yield auctionManager.checkValidation(auctionId, userId, socket);
        if (!fullAuctionDetails) {
            const errMsg = { type: 'error', err: "can not get fullAuctiondetails" };
            socket.send(JSON.stringify(errMsg));
            return;
        }
        if (fullAuctionDetails.auctionId !== auctionId && fullAuctionDetails.userId !== userId) {
            const errMsg = { type: 'error', err: "mismatch in the credentials" };
            socket.send(JSON.stringify(errMsg));
            return;
        }
        const { fullname, profileUrl, price } = fullAuctionDetails;
        auctionManager.addAuction({ userId, socket, fullname, auctionId, profileUrl, price });
        socket.on('message', function message(data) {
            socket.send(JSON.stringify(data));
        });
        socket.send('server connected');
    });
});
