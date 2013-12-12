// vendor modules
var http = require('http');
var express = require('express');
var io = require('socket.io');
var events = require('events');

// require custom modules
var socketHandler = require('./socketHandler');

// var some globals
var app = express();
var server = http.createServer(app);
var port = 5010;
var vent = new events.EventEmitter();

server.listen(port);
var io = io.listen(server);

app.use(express.bodyParser());

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

var clientSockets = [];

// socket api
io.sockets.on('connection', function (socket) {
  socketHandler(socket, vent, clientSockets);
});

vent.on('newClient', function(socket, clientId){
  var clientSocket = {
    clientId: clientId,
    socket: socket,
    chats: []
  }
  clientSockets.push( clientSocket );
});

vent.on('openChat', function(clientId, chatId){
  var clientArray = _.filter(clientSockets, function(v, k, list){
    console.log('v.clientId: ', v.clientId);
    return v.clientId == clientId;
  });

  if (clientArray.length > 0){
    clientArray[0].chats.push(chatId);
    console.log('>>>>>>>>>>>> clientArray[0].chats', clientArray[0].chats);
  }

  _.each(clientSockets, function(v, k, list){
    console.log('v.clientId: ', v.clientId);
    console.log('v.chats: ', v.chats);
    console.log('_______________________________');
  });
});

vent.on('removeClient', function(socket){
  var client = _.filter(clientSockets, function(v, k, list){
    return v.socket == socket;
  });
  console.log('found this client to remove: ', client);
});