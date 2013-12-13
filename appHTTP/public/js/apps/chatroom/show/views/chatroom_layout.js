define(function(require){

  var App = require('app');
  require('Handlebars');
  var _chatroomLayout = require('text!apps/chatroom/show/templates/chatroom_layout.html');

  return App.module('Chatroom.Show', function(Show){
    Show.Chatroom = Marionette.Layout.extend({
      template: Handlebars.compile( _chatroomLayout ),
      regions: {
        messages: '.messages',
        newMessage: '.new-message'
      }
    })
  });

});