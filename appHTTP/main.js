// require modules
var fs = require('fs');
var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 5000;

server.listen(port);
console.log('Server started on port ' + port);

// config
app.use(express.bodyParser());

// static
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/static'));

// api
app.get("/api/posts/1", apiGET);

app.get("/api/comments/for/1", apiGET);
app.post("/api/comments", newComment);

app.get("/api/messages/for/1", apiGET);
app.post("/api/messages", newMessage);

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
}

function newComment(req, res){
  console.log('new comment handler fired \n');

  var data = {
    "id": randomString(32),
    "body": req.body.body
  }

  res.json(data);
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
