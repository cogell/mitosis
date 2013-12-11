// require modules
var fs = require('fs');
var http = require('http');
var express = require('express');
var io = require('socket.io');

// var some our app, server, and io
var app = express();
var server = http.createServer(app);
var port = 5000

server.listen(port);
var io = io.listen(server);
console.log('Server started on port ' + port);

// config
app.use(express.bodyParser());

// static
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/static'));
app.use(express.logger()); // after static files

// api
app.get("/api/posts/1", apiGET);
app.get("/api/comments/for/1", apiGET);
app.post("/api/comments", newComment);

// socket api
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

function newComment(req, res){
  console.log('new comment handler fired >>>>>>>>>>>>>>>>');
  // console.log( req );
  res.json({
    "id": randomString(32),
    "body": req.body.body
  });

  // eventually return this new comment to everyone on the socket!!!
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
