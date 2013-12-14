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
  chatMap[chatId] = _.uniq( chatMap[chatId] );

  console.log('current chat map: ', chatMap );

});

vent.on('removeClient', function(socket){

  var client = _.each(clientSockets, function(v, k, l){
    if ( v.id == socket.id){
      vent.emit('closeChat', k)
    }
  });

});

vent.on('closeChat', function(clientId){

  _.each(chatMap, function(v, k, l){
    // v is array of listening clientIds
    chatMap[k] = filterOut(v, clientId);
  });

  console.log('current chat map is: ', chatMap);

});

function filterOut(array, string){

  var x;
  var i;
  var len;
  var results = [];

  for( i=0, len = array.length; i < len; i++){
    x = array[i];
    if (x !== string){
      results.push(x);
    }
  }

  return results;
}


exports.start = start;