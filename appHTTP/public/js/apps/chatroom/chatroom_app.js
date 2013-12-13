define(function(require){

  var App = require('app');
  require('apps/chatroom/show/show_controller');

  return App.module('Chatroom', function(Chatroom){

    var API = {
      joinChat: function(id){
        Chatroom.Show.Controller.joinChat(id);
      }
    }

    App.on('chatroom:joinChat', function(id){
      API.joinChat(id);
    });

  });

});