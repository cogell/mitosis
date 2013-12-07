var express = require('express');
var app = express();

var port = 5000

// config
app.use(express.logger());
app.use(express.static(__dirname + '/public'));

// socket?

app.listen(port);
console.log('Express app started on port ' + port);