var http = require('http');
var express = require('express');

var httpApp = require('./httpApp/main.js');
var socketApp = require('./socketApp/main.js');

// var some globals
var app = express();
var server = http.createServer(app);

httpApp.start( express, app, server )
socketApp.start( server );