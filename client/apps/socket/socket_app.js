define(function(require){

  var App = require('app');
  var io = require('socketio');

  return App.module('Socket', function(Socket){

    var initialize = function(){
      var socket = io.connect('/');

      Socket.clientId = randomString(32);

      socket.on('hello', function (data) {
        console.log(data);
      });

      console.log('clientId is ', Socket.clientId);
      socket.emit('clientId', {
        clientId: Socket.clientId
      });

      socket.on('newComment', function (data) {
        console.log('new comment event from socket fired');
        App.trigger('socket:newComment', data);
      });

      socket.on('newMessage', function (data, chatId) {
        console.log('new message event from socket fired');
        App.trigger('socket:newMessage', data, chatId);
      });

      App.on('socket:openChat', function(clientId, chatId){
        socket.emit('openChat', clientId, chatId);
      });
    }

    App.on('initialize:before', initialize);

    function randomString(length){
      console.log('Setting a new client Id...');
      var result = '';
      var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (var i = length; i > 0 ; --i){
        result += chars[Math.round( Math.random() * (chars.length-1) )];
      }
      return result;
    }

  });

});