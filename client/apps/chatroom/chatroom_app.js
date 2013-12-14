define(function(require){

  var App = require('app');
  require('apps/chatroom/show/show_controller');

  return App.module('Chatroom', function(Chatroom){

    var API = {
      showChat: function(id){
        return Chatroom.Show.Controller.showChat(id);
      }
    }

    // App.reqres.setHandler('chatroom:joinChat', function(id){
    //   return API.joinChat(id);
    // });

    App.reqres.setHandler('chatroom:show', function(id){
      return API.showChat(id);
    });

  });

});