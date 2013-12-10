var fs = require('fs');
var express = require('express');
var app = express();

var port = 5000

// config
// app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/static'));

// api
app.get("/api/posts/1", apiGET);
app.get("/api/comments/for/1", apiGET);

// socket?

app.listen(port);
console.log('Express app started on port ' + port);



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
