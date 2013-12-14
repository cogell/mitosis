// modules
var io = require('socket.io');
var events = require('events');
var _ = require('underscore');

// custom modules
var socketHandler = require('./socketHandler');

// global vars
var vent = new events.EventEmitter();
var clientSockets = {};
var chatMap = {};

// init socket server
function start( server ){
  io = io.listen(server);
  io.sockets.on('connection', function (socket) {
    socketHandler(socket, vent, clientSockets, chatMap, _);
  });
}

vent.on('newClient', function(socket, clientId){
  clientSockets[clientId] = socket;
});

vent.on('openChat', function(clientId, chatId){

  if ( chatMap[chatId] ){
    chatMap[chatId].push(clientId);
  } else {
    chatMap[chatId] = [clientId];
  }

  // calling uniq to remove any duplicates
  console.log('chatMap[clientID]: ', chatMap[chatId] );
  chatMap[chatId] = _.uniq( chatMap[chatId] );

  console.log('current chat map: ', chatMap );

});

vent.on('removeClient', function(socket){

  var client = _.filter(clientSockets, function(v){
    return v == socket;
  });
  console.log('found this client to remove: ', client);

});

exports.start = start;