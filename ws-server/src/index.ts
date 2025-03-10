import { WebSocketServer } from 'ws';
import { roomManager } from './roomManager';
import { authCheck } from './authCheck';

const wss = new WebSocketServer({ port: 8080 });

const auctionManager = new roomManager()

wss.on('connection', async function connection(socket,req) {
  socket.on('error', console.error);
  if (!req.url) {
    return
  }
  const urlParams = new URLSearchParams(req.url.split('?')[1]);
  const token = urlParams.get('token');
  let auctioncode = urlParams.get('auctionCode');
  const auctionId = Number(auctioncode);
  if (!token) {
     return
  }
  if (auctioncode) {
     return
  }

  const userId = await authCheck(token);

  const fullAuctionDetails = await auctionManager.checkValidation(auctionId, userId,socket);

  console.log(fullAuctionDetails)

  if (!userId) {
    return
  }

  socket.on('message', function message(data) {
    console.log('received: %s', data);
  });

  socket.send('something');
})