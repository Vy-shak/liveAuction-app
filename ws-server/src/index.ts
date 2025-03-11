import { WebSocketServer } from 'ws';
import { roomManager } from './roomManager';
import { authCheck } from './authCheck';

const wss = new WebSocketServer({ port: 8080 });

const auctionManager = new roomManager();

wss.on('connection', async function connection(socket,req) {
  socket.on('error', console.error);
  if (!req.url) {
    return
  }
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const token = urlParams.get('token');
  let auctioncode = urlParams.get('auctionCode');
  console.log("hyyy",auctioncode)
  const auctionId = Number(auctioncode);
  if (!token) {
    const errMsg = {type:'error',err:"the jwt token not present"}
    socket.send(JSON.stringify(errMsg));
    socket.close()
    return
  }
  const userId = await authCheck(token);
  if (!userId) {
    const errMsg = {type:'error',err:"can not get the userId"}
    socket.send(JSON.stringify(errMsg))
    socket.close();
    return
  }

  if (!auctioncode) {
    const errMsg = {type:'error',err:"the auction Code is not presnt"}
    console.log("youoo")
    socket.send(JSON.stringify(errMsg))
    socket.close()
    return
  }
  const fullAuctionDetails = await auctionManager.checkValidation(auctionId, userId,socket);
  if (!fullAuctionDetails) {
    const errMsg = {type:'error',err:"can not get fullAuctiondetails"}
    socket.send(JSON.stringify(errMsg))
    socket.close();
    return
  }
  if (fullAuctionDetails.auctionId!==auctionId&&fullAuctionDetails.userId!==userId) {
    const errMsg = {type:'error',err:"mismatch in the credentials"}
    socket.send(JSON.stringify(errMsg))
    socket.close();
    return
  }

  const {fullname,profileUrl,price} = fullAuctionDetails
  

  auctionManager.addAuction({userId,socket,fullname,auctionId,profileUrl,price});


  socket.on('message', function message(data) {
    const Message = JSON.parse(data as unknown as string);
    if (Message.type == "price") {
      const {price,profileUrl, userId,auctionId,fullname} = Message
       auctionManager.updatePrice({price,socket, userId, profileUrl,auctionId,fullname})
    } 
  });
})