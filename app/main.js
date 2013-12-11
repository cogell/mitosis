// require modules
var fs = require('fs');
var http = require('http');
var express = require('express');
var io = require('socket.io');
var events = require('events');

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


var socks = [];

// socket api
io.sockets.on('connection', function (socket) {

  vent.emit('newBrowser', socket);

  socket.emit('hello', { hello: 'world' });

  vent.on('newComment', function(data){
    console.log('new comment fired on server');
    socks.forEach(function(s){
      s.emit('newComment', data);
    });
  })

});

vent.on('newBrowser', function(socket){
  socks.push(socket);
});



function newComment(req, res){
  console.log('new comment handler fired \n');

  var data = {
    "id": randomString(32),
    "body": req.body.body
  }

  res.json(data);

  // eventually return this new comment to everyone on the socket!!!
  vent.emit('newComment', data);
}

// api hanlder
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
