// modules
var io = require('socket.io');
var events = require('events');

// custom modules
var socketHandler = require('./socketHandler');

// global vars
var vent = new events.EventEmitter();
var clientSockets = [];

// init socket server
function start( server ){

  io = io.listen(server);

  io.sockets.on('connection', function (socket) {
    socketHandler(socket, vent, clientSockets);
  });

}

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

exports.start = start;