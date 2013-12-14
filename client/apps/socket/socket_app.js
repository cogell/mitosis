define(function(require){

  var App = require('app');
  var io = require('socketio');

  return App.module('Socket', function(Socket){

    var initialize = function(){
      var socket = io.connect('/');
      // var socket = io.connect('http://localhost:5010/');

      Socket.clientId = randomString(32);

      socket.on('handshake', function (data) {
        console.log(data);
        console.log('clientId is ', Socket.clientId);
        socket.emit('clientId', {
          clientId: Socket.clientId
        });
      });

      // console.log('clientId is ', Socket.clientId);
      // socket.emit('clientId', {
      //   clientId: Socket.clientId
      // });

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

      App.on('comments:newComment', function(comment){
        console.log('socket app recieving new comment event');
        socket.emit('client:newComment', comment);
      });

      App.on('chatroom:newMessage', function(message){
        socket.emit('client:newMessage', message);
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