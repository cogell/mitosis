var fs = require('fs');
var express = require('express');
var app = express();

var port = 5000

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

// socket?

app.listen(port);
console.log('Express app started on port ' + port);

function newComment(req, res){
  console.log('new comment handler fired >>>>>>>>>>>>>>>>');
  console.log( req );
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
