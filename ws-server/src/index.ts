import { WebSocketServer } from 'ws';
import { roomManager } from './roomManager';

const wss = new WebSocketServer({ port: 8080 });

const auctionManager = new roomManager()

wss.on('connection', function connection(socket) {
  socket.on('error', console.error);

  auctionManager.addAuction({userId:9,roomId:9,fullName:"yshak",profileUrl:"string",socket:socket});

  socket.on('message', function message(data) {
    console.log('received: %s', data);
  });

  socket.send('something');
})