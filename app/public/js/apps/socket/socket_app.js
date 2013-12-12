define(function(require){

  var App = require('app');
  var io = require('socketio');

  return App.module('Socket', function(Socket){

    var initialize = function(){
      var socket = io.connect('/');

      socket.on('hello', function (data) {
        console.log(data);
        App.trigger('hello', data);
      });

      socket.on('newComment', function (data) {
        console.log('new comment event from socket fired');
        App.trigger('socket:newComment', data);
      });
    }

    App.on('initialize:before', initialize);

  });

});