// require modules
var fs = require('fs');
var http = require('http');
var express = require('express');
var io = require('socket.io');
var events = require('events');
var _ = require('underscore');

// var some our app, server, and io
var app = express();
var server = http.createServer(app);
var port = 5000;
var vent = new events.EventEmitter();

server.listen(port);
var io = io.listen(server);
console.log('Server started on port ' + port);

// config
app.use(express.bodyParser());

// static
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/static'));
// app.use(express.logger()); // after static files

// api
app.get("/api/posts/1", apiGET);

app.get("/api/comments/for/1", apiGET);
app.post("/api/comments", newComment);

app.get("/api/messages/for/1", apiGET);
app.post("/api/messages", newMessage);


var clientSockets = [];

// socket api
io.sockets.on('connection', function (socket) {

  socket.emit('hello', { hello: 'world' });

  socket.on('clientId', function(data){
    console.log('>>>>>>>>>>>>>>> clientID data:', data);
    vent.emit('newClient', socket, data.clientId);
  });

  socket.on('openChat', function(clientId, chatId){
    vent.emit('openChat', clientId, chatId);
  });

  socket.on('disconnect', function(socket){
    vent.emit('removeClient', socket);
  });

  vent.on('newComment', function(data){
    clientSockets.forEach(function(cs){
      cs.socket.emit('newComment', data);
    });
  });

  vent.on('newMessage', function(data, chatId){
    clientSockets.forEach(function(cs){
      // check to see what chats each client has open
      cs.socket.emit('newMessage', data, chatId);
    });
  });

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

function newMessage(req, res){
  console.log('new message handler fired \n');

  var chatId = req.body.chatId

  var data = {
    "id": randomString(32),
    "body": req.body.body,
    'chatId': chatId,
    "user": req.body.user
  }

  res.json(data);

  vent.emit('newMessage', data, chatId);
}

function newComment(req, res){
  console.log('new comment handler fired \n');

  var data = {
    "id": randomString(32),
    "body": req.body.body
  }

  res.json(data);

  vent.emit('newComment', data);
}

function apiGET(req, res){

  fs.readFile( __dirname + req.url + '.json', 'utf8', function (err, data) {
      if (err) {
        console.log('Error: ' + err);
        res.send('error');
      }
      else {
        res.send( JSON.parse(data) );
      }
    });

}

function randomString(length){
  var result = '';
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = length; i > 0 ; --i){
    result += chars[Math.round( Math.random() * (chars.length-1) )];
  }
  return result;
}
